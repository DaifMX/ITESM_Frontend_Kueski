/* eslint-disable react/prop-types */

import './CartView.css'

import { useEffect } from 'react'

import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';

import ProductDetailContainer from '../../Product/ProductDetailView';
import { useCartContext } from '../../../context/CartContext';


export default function CartView({ greeting = "No hay elementos seleccionados." }) {

  const { items, clearCart } = useCartContext()

  useEffect(() => {
    console.log('items', items)
  }, [items])

  return (
    <div className="item-list-container">
      <Typography variant="h4" gutterBottom component={"div"} sx={{ mt: 5 }}>
        Carrito
      </Typography>

      {items.length > 0 ? (
          <Box>
            <Box align='center'>
              <Button 
              onClick={() => clearCart()} 
              sx={{
                color: 'black',
                backgroundColor: '#cebd22',
                height: 60,
                minWidth: 60,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '&:hover': { backgroundColor: '#e6d225' }
              }}>Comprar</Button>
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", margin: "0 auto" }}>
              {
                items.map((item) => {
                  return <ProductDetailContainer context={{ type: "CART", payload: item.product }} />
                })
              }
            </Box>
          </Box>
        ) : (
          <Typography variant="h5" gutterBottom component={"div"}>
            No hay productos en el carrito
          </Typography>
        )
      }

    </div>
  )
}
