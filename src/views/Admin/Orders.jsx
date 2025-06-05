import React, { useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, Paper, Box, Typography, Button, Collapse, IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';

import useOrder from '../../api/hooks/useOrder';


const HeaderCell = styled(TableCell)(() => ({
    color: '#fff',
    backgroundColor: '#333',
    fontWeight: 'bold',
    borderBottom: '1px solid #555'
}));

const DarkTableRow = styled(TableRow)(() => ({
    '&:nth-of-type(odd)': {
        backgroundColor: '#1e1e1e',
    },
    '&:hover': {
        backgroundColor: '#333',
    }
}));

export default function Orders() {
    const { orders, getAll, response } = useOrder();

    const [openRow, setOpenRow] = useState(null);

    const data = [
        {
            phoneNumber: '3324945924',
            total: '$1,200',
            status: 'Entregado',
            created: '2024-06-01',
            cancelled: '-',
            products: ['Producto A', 'Producto B', 'Producto C']
        },
        {
            phoneNumber: '3321234567',
            total: '$300',
            status: 'Cancelado',
            created: '2024-06-02',
            cancelled: '2024-06-03',
            products: ['Producto X']
        }
    ];

    const toggleOpen = (index) => {
        setOpenRow(openRow === index ? null : index);
    };

    return (
        <Box sx={{ bgcolor: '#121212', color: '#fff', minHeight: '100vh', p: 3 }}>
            <Typography variant="h6" gutterBottom>
                Administración del Sistema &gt; Órdenes
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Button startIcon={<ArrowBackIcon />} variant="contained" sx={{ bgcolor: '#1e1e1e' }}>
                    Volver
                </Button>
                <Button startIcon={<AddIcon />} variant="contained" sx={{ bgcolor: '#1976d2' }}>
                    Nuevo
                </Button>
            </Box>

            <TableContainer component={Paper} sx={{ bgcolor: '#1e1e1e' }}>
                <Table sx={{ minWidth: 700 }}>
                    <TableHead>
                        <TableRow>
                            <HeaderCell>No. Teléfono de Comprador</HeaderCell>
                            <HeaderCell>Total</HeaderCell>
                            <HeaderCell>Status</HeaderCell>
                            <HeaderCell>Fecha de Creación</HeaderCell>
                            <HeaderCell>Fecha de Cancelación</HeaderCell>
                            <HeaderCell>Productos</HeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((row, index) => (
                            <React.Fragment key={index}>
                                <DarkTableRow>
                                    <TableCell sx={{ color: '#fff' }}>{row.phoneNumber}</TableCell>
                                    <TableCell sx={{ color: '#fff' }}>{row.total}</TableCell>
                                    <TableCell sx={{ color: '#fff' }}>{row.status}</TableCell>
                                    <TableCell sx={{ color: '#fff' }}>{row.created}</TableCell>
                                    <TableCell sx={{ color: '#fff' }}>{row.cancelled}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => toggleOpen(index)}>
                                            {openRow === index ? <ExpandLessIcon sx={{ color: '#fff' }} /> : <ExpandMoreIcon sx={{ color: '#fff' }} />}
                                        </IconButton>
                                    </TableCell>
                                </DarkTableRow>
                                <TableRow>
                                    <TableCell colSpan={6} sx={{ p: 0, bgcolor: '#1e1e1e' }}>
                                        <Collapse in={openRow === index} timeout="auto" unmountOnExit>
                                            <Box sx={{ p: 2, pl: 4, color: '#ccc' }}>
                                                <Typography variant="subtitle2">Productos pedidos:</Typography>
                                                <ul>
                                                    {row.products.map((p, i) => (
                                                        <li key={i}>{p}</li>
                                                    ))}
                                                </ul>
                                            </Box>
                                        </Collapse>
                                    </TableCell>
                                </TableRow>
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
