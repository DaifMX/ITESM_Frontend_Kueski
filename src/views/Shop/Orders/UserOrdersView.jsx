import { useEffect } from 'react';

import {
  Button,
  Box,
  Paper,
  Typography,
  Chip,
  Stack
} from '@mui/material';
import {
  LocalShipping,
  Cancel,
  HourglassTop,
} from '@mui/icons-material';

import useOrder from '../../../api/hooks/useOrder';
import { fCurrency } from '../../../utils/format-number';

// const orders = [
//   { uuid: 'asda-asdasd4-gggb54-1s001', total: 8000, status: 'paid', products: [2, 3, 4, 5, 5] },
//   { uuid: 'asda-asdasd4-gggb54-1s002', total: 8000, status: 'pending', products: [1] },
//   { uuid: 'asda-asdasd4-gggb54-1s003', total: 8000, status: 'cancelled', products: [1, 2, 3] },
//   { uuid: 'asda-asdasd4-gggb54-1s004', total: 8000, status: 'paid', products: [1, 2, 3] },
//   { uuid: 'asda-asdasd4-gggb54-1s005', total: 8000, status: 'pending', products: [1, 2, 3] },
//   { uuid: 'asda-asdasd4-gggb54-1s006', total: 8000, status: 'expired', products: [1, 2, 3] }
// ];

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

  useEffect(() => {
      getAll();
      console.log(orders);
  }, [])

  const handleCancelOrder = (orderUuid) => {
    console.log(orderUuid);
  };

  return (
    <Box sx={{ bgcolor: '#121212', minHeight: '100vh', p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <Typography variant={'h4'} gutterBottom sx={{ color: '#fff' }}>
        Órdenes
      </Typography>
      <Box container sx={{ display: { xs: 'inline-flex' }, flexWrap: 'wrap'}}>
        {orders.map((order, index) => {
          return (
            <Box key={index}>
              <Paper
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
                      <Button onClick={() => handleCancelOrder(order.uuid)} variant='text' sx={{ width: '45%', marginTop: '8px', height: '32px', borderColor: 'red', color: 'red', '&:hover': { bgColor: 'black' } }}>
                        Cancelar
                      </Button>
                    </Box> :
                    undefined
                  }
                </Stack>
              </Paper>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};