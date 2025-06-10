import { useEffect } from 'react';
import useOrder from '../../../api/hooks/useOrder';

import { fCurrency } from '../../../utils/format-number';

import {
    Container,
    Grid2,
    Typography
} from "@mui/material"

import useAuth from '../../../context/AuthContext'
import WidgetSummary from './WidgetSummary';

export default function HomeView() {
    const { user } = useAuth();

    const { response, getAdminDashboardInfo } = useOrder();

    useEffect(() => {
        getAdminDashboardInfo();
        console.log(response);
        console.log('test', fCurrency('0'))
    }, [])

    return (
        <Container maxWidth="xl" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h4" sx={{ mb: 4 }}>
                {`Bienvenido, ${user.name}`}
            </Typography>

            <Grid2 container spacing={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Grid2 item xs={12} sm={6} md={3} sx={{ width: '180px' }}>
                    <WidgetSummary
                        title="Ordenes pendientes"
                        total={response?.pendingOrders}
                        color="success"
                    />
                </Grid2>
                <Grid2 item xs={12} sm={6} md={3} sx={{ width: '180px' }}>
                    <WidgetSummary
                        title="Ventas semanales"
                        total={fCurrency(response?.soldLast7Days) || fCurrency('0')}
                        color="success"
                    />
                </Grid2>
                <Grid2 item xs={12} sm={6} md={3} sx={{ width: '180px' }}>
                    <WidgetSummary
                        title="Ventas totales"
                        total={fCurrency(response?.totalSold) || fCurrency('0')}
                        color="success"
                    />
                </Grid2>
            </Grid2>
        </Container>
    )
}