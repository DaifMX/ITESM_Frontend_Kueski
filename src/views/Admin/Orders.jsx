import { useState, useEffect } from 'react';
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

export default function Orders() {
    const { orders, getAll, response } = useOrder();

    const [openClientRow, setOpenClientRow] = useState(null);
    const [openProductRow, setOpenProductRow] = useState(null);

    const toggleClient = (idx) =>
        setOpenClientRow(openClientRow === idx ? null : idx);

    const toggleProducts = (idx) =>
        setOpenProductRow(openProductRow === idx ? null : idx);

    useEffect(() => {
        (async function fetch() {
            await getAll();
            console.log(orders);
        })();
    }, [response])

    return (
        <Box sx={{ bgcolor: '#121212', color: '#fff', minHeight: '100vh', px: 12 }}>
            <Typography variant="h6" gutterBottom>
                Administración del Sistema &gt; Órdenes
            </Typography>

            <TableContainer component={Paper} sx={{ bgcolor: '#1e1e1e' }}>
                <Table sx={{ minWidth: 700 }}>
                    <TableHead>
                        <TableRow>
                            <HeaderCell>Cliente</HeaderCell>
                            <HeaderCell>Total</HeaderCell>
                            <HeaderCell>Status</HeaderCell>
                            <HeaderCell>Fecha de Creación</HeaderCell>
                            <HeaderCell>Productos</HeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders?.map((row, index) => (
                            <>
                                <TableRow key={index}>
                                    <TableCell>
                                        <IconButton onClick={() => toggleClient(index)}>
                                            {openClientRow === index ? <ExpandLessIcon sx={{ color: '#fff' }} /> : <ExpandMoreIcon sx={{ color: '#fff' }} />}
                                        </IconButton>
                                    </TableCell>
                                    <TableCell sx={{ color: '#fff' }}>{row.total}</TableCell>
                                    <TableCell sx={{ color: '#fff' }}>{row.status}</TableCell>
                                    <TableCell sx={{ color: '#fff' }}>{row.createdAt}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => toggleProducts(index)}>
                                            {openProductRow === index ? <ExpandLessIcon sx={{ color: '#fff' }} /> : <ExpandMoreIcon sx={{ color: '#fff' }} />}
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={6} sx={{ p: 0, bgcolor: '#1e1e1e' }}>
                                        <Collapse in={openClientRow === index} timeout="auto" unmountOnExit>
                                            <Box sx={{ p: 2, pl: 4, color: '#ccc' }}>
                                                <Typography variant="subtitle2">Información del Cliente:</Typography>
                                                <ul>
                                                    <li key={`${index}-name`}>{`Nombre completo: ${row.user.firstName} ${row.user.lastName}`}</li>
                                                    <li key={`${index}-phoneNumber`}>{`Número telefónico: ${row.user.phoneNumber}`}</li>
                                                </ul>
                                            </Box>
                                        </Collapse>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={6} sx={{ p: 0, bgcolor: '#1e1e1e' }}>
                                        <Collapse in={openProductRow === index} timeout="auto" unmountOnExit>
                                            <Box sx={{ p: 2, pl: 4, color: '#ccc' }}>
                                                <Typography variant="subtitle2">Productos pedidos:</Typography>
                                                <ul>
                                                    {row?.products?.map((p, i) => (
                                                        <li key={i}>{p.name}</li>
                                                    ))}
                                                </ul>
                                            </Box>
                                        </Collapse>
                                    </TableCell>
                                </TableRow>
                            </>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
