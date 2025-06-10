import { useEffect } from 'react';

import {
  Button,
  Box,
  Paper,
  Typography,
  Chip,
  Stack,
} from '@mui/material';
import {
  LocalShipping,
  Cancel,
  HourglassTop,
} from '@mui/icons-material';
import Swal from 'sweetalert2';

import useOrder from '../../../api/hooks/useOrder';
import { fCurrency } from '../../../utils/format-number';
import { useNavigate } from 'react-router';

const statusChip = (status) => {
  const baseStyle = { color: '#fff' };

  switch (status) {
    case 'paid':
      return <Chip icon={<LocalShipping />} label="Entregado" sx={{ ...baseStyle, bgcolor: 'green' }} />;
    case 'cancelled':
      return <Chip icon={<Cancel />} label="Cancelado" sx={{ ...baseStyle, bgcolor: 'red' }} />;
    case ('pending' || 'expired'):
    default:
      return <Chip icon={<HourglassTop />} label="Pendiente" sx={{ ...baseStyle, bgcolor: 'orange' }} />;
  }
};

export default function UserOrdersView() {
  const { orders, getAll, cancel } = useOrder();

  const navigate = useNavigate();

  useEffect(() => {
    getAll();
  }, []);

  const handlePay = async (url) => {
      window.location.href = url;
  };

  const handleCancelOrder = async (orderUuid) => {
    let res;
    try {
      res = await cancel(orderUuid);

      if (res) {
        Swal.fire({
          icon: 'success',
          title: 'Orden cancelada',
          text: res.data.message,
          heightAuto: false,
          background: '#1e1e1e',
          color: '#f1f1f1',
          confirmButtonColor: '#CEBD22',
          confirmButtonText: 'Volver a tienda',
          allowEscapeKey: false,
          allowOutsideClick: false,
          showCancelButton: false,
        }).then((res) => {
          if (res.isConfirmed) navigate('../');
        })
      }

    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError)
        Swal.fire({
          icon: 'error',
          title: '¡Oops!',
          text: res.data.message ? res.data.message : 'Ha ocurrido un error inesperado al intentar cancelar tu orden.',
          heightAuto: false,
          background: '#1e1e1e',
          color: '#f1f1f1',
          confirmButtonColor: '#CEBD22',
          confirmButtonText: 'Volver a tienda',
          allowEscapeKey: false,
          allowOutsideClick: false,
          showCancelButton: false,
        });
    }
  };

  return (
    <>
      <Box sx={{ bgcolor: '#121212', minHeight: '100vh', p: 3, flexDirection: 'column' }}>
        <Typography variant={'h4'} gutterBottom sx={{ color: '#fff' }}>
          Órdenes
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, 240px)',
            gap: 2,
            width: {
              xs: 'max-content',
            },
            maxWidth: { lg: '1300px', md: '900px', sm: '700px', xs: '400px' },
            mx: 'auto',
          }}
        >
          {orders.map((order, index) => {
            return (
              <Paper
                key={'cart-card-' + index}
                elevation={4}
                sx={{
                  p: 2,
                  paddingTop: 3,
                  bgcolor: '#1e1e1e',
                  color: '#fff',
                  borderRadius: 3,
                  height: 240,
                  width: 240,
                  display: 'flex',
                  alignItems: 'baseline',

                }}
              >
                <Stack spacing={1} textAlign="center">
                  <Typography variant="subtitle1" fontWeight="bold">
                    Orden #{order.uuid}
                  </Typography>
                  <Typography variant="body2">
                    Monto total: <strong>{fCurrency(order.total)}</strong>
                  </Typography>
                  <Typography variant="body2">
                    Productos: {order.products.length}
                  </Typography>
                  <Box mt={1}>{statusChip(order.status)}</Box>
                  {order.status === 'pending' ?
                    <Box>
                      <Button onClick={() => handlePay(order.kueskiOrderUrl)} variant='text' sx={{
                        textAlign: 'center',
                        width: '40%',
                        marginTop: '8px',
                        height: '32px',
                        borderColor: '#CEBD22',
                        color: '#CEBD22',
                        '&:hover': { backgroundColor: '#re' }
                      }}>
                        Pagar
                      </Button>
                      <Button onClick={() => handleCancelOrder(order.uuid)} variant='text' sx={{
                        textAlign: 'center',
                        width: '40%',
                        marginTop: '8px',
                        height: '32px',
                        borderColor: 'red',
                        color: 'red',
                        '&:hover': { backgroundColor: '#re' }
                      }}>
                        Cancelar
                      </Button>
                    </Box> :
                    undefined
                  }
                </Stack>
              </Paper>
            );
          })}
        </Box>
      </Box >
    </>
  );
};