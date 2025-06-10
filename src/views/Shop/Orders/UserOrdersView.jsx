import { useEffect } from 'react';

import {
    Box,
    Grid2,
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

// const orders = [
//     { id: 'ORD-1001', total: '$1,250.00', status: 'Entregado', productCount: 8 },
//     { id: 'ORD-1002', total: '$540.00', status: 'Pendiente', productCount: 3 },
//     { id: 'ORD-1003', total: '$330.00', status: 'Cancelado', productCount: 5 },
//     { id: 'ORD-1004', total: '$2,400.00', status: 'Entregado', productCount: 12 },
//     { id: 'ORD-1005', total: '$150.00', status: 'Pendiente', productCount: 1 },
//     { id: 'ORD-1006', total: '$870.00', status: 'Cancelado', productCount: 4 }
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
    const { orders, getAll } = useOrder();

    useEffect(() => {
        getAll();
        console.log(orders);
    }, [])

    return (
        <Box sx={{ bgcolor: '#121212', minHeight: '100vh', p: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ color: '#fff' }}>
                Órdenes del Usuario
            </Typography>
            <Grid2 container spacing={4}>
                {orders.map((order, index) => {
                    return (
                        <Grid2 item xs={12} sm={6} md={4} key={index}>
                            <Paper
                                elevation={4}
                                sx={{
                                    p: 2,
                                    bgcolor: '#1e1e1e',
                                    color: '#fff',
                                    borderRadius: 3,
                                    height: 200,
                                    width: 130,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <Stack spacing={1} textAlign="center">
                                    <Typography variant="subtitle1" fontWeight="bold">
                                        Orden #{order.uuid}
                                    </Typography>
                                    <Typography variant="body2">
                                        Monto total: <strong>{order.total}</strong>
                                    </Typography>
                                    <Typography variant="body2">
                                        Productos: {order.products.length}
                                    </Typography>
                                    <Box mt={1}>{statusChip(order.status)}</Box>
                                </Stack>
                            </Paper>
                        </Grid2>
                    );
                })}
            </Grid2>
        </Box>
    );
};