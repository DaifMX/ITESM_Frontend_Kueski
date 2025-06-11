import { createContext, useContext, useEffect, useReducer, useMemo, useCallback } from 'react'
import useOrder from '../api/hooks/useOrder';

const CartContext = createContext();

const defaultState = {
  items: [],
  length: 0,
  total: 0,
};

// Reducer para manejar acciones del carrito
const cartReducer = (state, action) => {
  console.log(action.type);
  switch (action.type) {
    case "ADD_ITEM":
      // Lógica para agregar un item
      // Si existe un producto con ese id
      if (state.items.some((p) => p.product.id === action.payload.product.id)) {
        // Array sin el item 'duplicado'. Al que se le aumentara su 'cantidad/amount'
        const filteredArray = state.items.filter((e) => e.product.id !== action.payload.product.id);

        const oldProduct = state.items.find((p) => p.product.id === action.payload.product.id);

        const newProduct = { ...oldProduct, amount: action.payload.amount };
        newProduct.subtotal = newProduct.amount * action.payload.product.price;

        // Spreads state and subs old items array
        const result = { ...state, items: [...filteredArray, newProduct] };

        // Calcular total a pagar
        const difference = newProduct.subtotal - oldProduct.subtotal;
        const total = state.total + difference;
        result.total = total;

        return result;
      }
      return { length: state.length + 1, items: [...state.items, action.payload], total: state.total + (action.payload.product.price * action.payload.amount) };
    case "REMOVE_ITEM":
      // Lógica para eliminar un item
      let newLength = null, items;

      const itemToReduce = state.items.find(item => item.product.id === action.payload);
      itemToReduce.amount -= 1;
      itemToReduce.subtotal -= itemToReduce.product.price;

      items = state.items.filter(item => item.product.id !== action.payload);

      if (itemToReduce.amount === 0) {
        newLength = state.length > 0 ? state.length - 1 : state.length;
      } else {
        items.push(itemToReduce);
      }

      if (newLength === 0) {
        localStorage.removeItem('cart');
      };

      const res = {
        total: state.total - itemToReduce.product.price,
        length: newLength === null ? state.length : newLength,
        items
      };

      return res;

    case "CLEAR_CART":
      return defaultState;
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const { create } = useOrder();
  const [state, dispatch] = useReducer(cartReducer, defaultState);

  // Funciones para modificar el carrito
  const addToCart = useCallback((product) => {
    dispatch({ type: "ADD_ITEM", payload: product });
  });

  const removeFromCart = useCallback((itemId) => {
    dispatch({ type: "REMOVE_ITEM", payload: itemId });
  });

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
    localStorage.removeItem('cart');
  });

  const buy = async () => {
    // Builds payload based on endopoint's req.body
    const payload = state.items.map((item) => ({
      productId: item.product.id,
      amount: item.amount,
    }));

    // Sends payload to API
    try {
      const res = await create({ products: payload });
      // Successfull...
      if (res.status === 201) {
        clearCart();
      }
    } catch (error) {
      throw error;
    }
  };

  // Update cart in local storage
  useEffect(() => {
    if (state.items.length === 0) {
      const items = JSON.parse(localStorage.getItem('cart'));
      items?.forEach(item => {
        addToCart(item);
      });
    }
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  const value = useMemo(() => ({
    items: state.items,
    length: state.length,
    total: state.total,
    addToCart,
    removeFromCart,
    clearCart,
    buy
  }), [state.items, state.length, addToCart, removeFromCart, clearCart, buy]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCartContext = () => useContext(CartContext);