/* eslint-disable react/prop-types */

import './CartView.css'

import { useEffect, useState } from 'react'

import { Card, Button, Box, Typography, Dialog, DialogActions, DialogTitle, DialogContent } from '@mui/material';

import { fCurrency } from '../../../utils/format-number';

import { useCartContext } from '../../../context/CartContext';
import ProductCartCard from '../../../components/ProductCartCard';

export default function CartView() {
  const { items, clearCart, buy, total } = useCartContext();

  const [purchaseConfirmed, setPurhcasedConfirmed] = useState(false);

  const handleBuyBtn = async () => {
    await buy();
    setPurhcasedConfirmed(true);
  };

  const handleConfirmedDiagBtn = async () => {

    setPurhcasedConfirmed(false);
  };

  useEffect(() => {
    console.log('items', items);
    // console.log(total);
  }, [items]);
  return (
    <div className="item-list-container">
      <Typography variant="h4" gutterBottom component={"div"} sx={{ mt: 5 }}>
        Carrito
      </Typography>

      {items.length > 0 ? (
        <Box>
          <Dialog open={purchaseConfirmed}>
            <DialogTitle>Orden recibida</DialogTitle>
            <DialogContent>
              <Typography>
                Tu orden fue recibida, pronto recibiras un link a tu WhatsApp con tu link de pago. 
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleConfirmedDiagBtn} color="primary">
                Regresar
              </Button>
            </DialogActions>
          </Dialog>
          <Box sx={{ py: { sm: 3 }, display: 'flex', width: '100%', justifyContent: 'center', alignItems: { xs: 'center', sm: 'initial' }, flexDirection: { xs: 'column', sm: 'row' } }}>
            <Box sx={{ display: "flex", flexDirection: 'column', alignItems: 'center' }}>
              {items.map((item) => {
                const payload = { amount: item.amount, ...item.product }
                return (
                  <>
                    <ProductCartCard key={item.product.id} payload={payload} />
                  </>
                )
              })}
            </Box>
            <Card sx={{
              width: '286px',
              height: '150px',
              borderRadius: 0,
              display: 'flex',
              alignContent: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              ml: { sm: '5px' }
            }}>
              <Typography variant='bold'>
                Resumen de Compra
              </Typography>
              <Typography sx={{ marginTop: '8px' }}>
                {`Total: ${fCurrency(total)}`}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', alignContent: 'center' }}>
                <Button
                  onClick={() => handleBuyBtn()}
                  sx={{
                    marginTop: '8px',
                    color: 'white',
                    width: '45%',
                    minWidth: 60,
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    '&:hover': { backgroundColor: '#e6d225' },
                    background: 'linear-gradient(135deg,rgb(20, 170, 35) 0%,rgb(23, 204, 26) 50%,rgb(25, 247, 0) 100%)',

                    // animated gradient
                    animation: 'gradientShift 8s ease infinite',

                    // glass-morphism highlight
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'rgba(255, 255, 255, 0.1)',
                    },

                    '&:hover': {
                      transform: 'scale(1.02)',
                      boxShadow: '0 12px 32px rgba(0, 0, 0, 0.2)',
                    },

                    // keyframes for background animation
                    '@keyframes gradientShift': {
                      '0%': { backgroundPosition: '0% 50%' },
                      '50%': { backgroundPosition: '100% 50%' },
                      '100%': { backgroundPosition: '0% 50%' },
                    },
                  }}
                >
                  Pagar con Kueski
                </Button>
                <Button
                  onClick={() => clearCart()}
                  sx={{
                    marginTop: '8px',
                    color: 'white',
                    backgroundColor: '#121212',
                    width: '40%',
                    minWidth: 60,
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    '&:hover': { backgroundColor: 'rgba(255, 0, 0, 0.812)' }
                  }}
                >
                  Borrar
                </Button>
              </Box>
            </Card>
          </Box>
        </Box>
      ) : (
        <Typography variant="h5" gutterBottom component={"div"}>
          No hay productos en el carrito
        </Typography>
      )
      }
    </div>
  );
};