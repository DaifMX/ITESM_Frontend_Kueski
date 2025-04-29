import { createContext, useContext, useEffect, useReducer, useMemo, useCallback } from 'react'

const CartContext = createContext();

const defaultState = {
  items: [],
  total: 0
}

// Reducer para manejar acciones del carrito
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      // Lógica para agregar un item
      // Si existe un producto con ese id
      if (state.items.some((p) => p.product.id === action.payload.product.id)) {
        let newState = state.items.filter((e) => e.product.id !== action.payload.product.id)
        console.log('newstate', newState)
        let updateProduct = state.items.find((p) => p.product.id === action.payload.product.id)
        let acc = updateProduct.count += action.payload.count
        
        return { ...state, items: [...newState, updateProduct] }
      }

      return { total: state.total + 1, items: [...state.items, action.payload] };
    case "REMOVE_ITEM":
      // Lógica para eliminar un item
      console.log('cur id', action.payload)
      return { total: state.total > 0 ? state.total - 1 : state.total, items: state.items.filter(item => item.product.id !== action.payload) };
    case "CLEAR_CART":
      return defaultState;
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, defaultState)

  // Funciones para modificar el carrito
  const addToCart = useCallback((product) => {
    dispatch({ type: "ADD_ITEM", payload: product });
  })

  const removeFromCart = useCallback((itemId) => {
    dispatch({ type: "REMOVE_ITEM", payload: itemId });
  })

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  });

  useEffect(() => {
    console.log('state', state.total)
  }, [state])


  const value = useMemo(() => ({
    items: state.items,
    total: state.total,
    addToCart,
    removeFromCart,
    clearCart,
  }), [state.items, state.total, addToCart, removeFromCart, clearCart]);


  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;

}

export const useCartContext = () => useContext(CartContext)