/* eslint-disable react/prop-types */

import './CartView.css'

import { Card, Button, Box, Typography } from '@mui/material';

import { fCurrency } from '../../../utils/format-number';

import { useCartContext } from '../../../context/CartContext';
import ProductCartCard from '../../../components/ProductCartCard';
import { useNavigate } from 'react-router';

import Swal from 'sweetalert2';

export default function CartView() {
  const { items, clearCart, buy, total } = useCartContext();
  const navigate = useNavigate();

  const handleBuyBtn = async () => {
    try {
      await buy();
      Swal.fire({
        icon: 'success',
        title: '¡Tu pedido ha sido confirmado!',
        text: 'En breve recibirás tu enlace de pago de Kueski vía WhatsApp o, si lo prefieres, puedes consultarlo en "Mis pedidos".',
        heightAuto: false,
        background: '#1e1e1e',
        color: '#f1f1f1',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ver ordenes',
        showCancelButton: false,
        allowEscapeKey: false,
        allowOutsideClick: false
      }).then((res) => {
        if (res.isConfirmed) navigate('/my-orders');
      });

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: '¡Ooops!',
        text: 'Ocurrio un erro al intentar procesar tu orden. Vuelve a intentarlo.',
        heightAuto: false,
        background: '#1e1e1e',
        color: '#f1f1f1',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ver ordenes',
        showCancelButton: false,
        allowOutsideClick: false
      });
    }
  };

  return (
    <div className="item-list-container">
      <Typography variant="h4" gutterBottom component={"div"} sx={{ mt: 5 }}>
        Carrito
      </Typography>

      {items.length > 0 ? (
        <Box>
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
                  Vaciar Carrito
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