import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import {
    Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, Paper, Box, Typography, Button, Collapse, IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText, Stack,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import useOrder from '../../../api/hooks/useOrder';

const HeaderCell = styled(TableCell)(() => ({
    color: '#fff',
    backgroundColor: '#333',
    fontWeight: 'bold',
    borderBottom: '1px solid #555'
}));

export default function Orders() {
    const navigate = useNavigate();
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
    }, [response]);

    return (
        <Box sx={{ bgcolor: '#121212', color: '#fff', minHeight: '100vh', px: { xs: 1, lg: 6 } }}>
            <Typography variant="h6" gutterBottom>
                Lista de órdenes
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Button startIcon={<ArrowBackIcon />} variant="contained" sx={{ bgcolor: '#fff' }} onClick={() => navigate('./home')}>
                    Volver
                </Button>
            </Box>
            <TableContainer component={Paper} sx={{ bgcolor: '#1e1e1e' }}>
                <Table sx={{ minWidth: 700 }}>
                    <TableHead>
                        <TableRow>
                            <HeaderCell>Fecha de Creación</HeaderCell>
                            <HeaderCell>Total</HeaderCell>
                            <HeaderCell>Status</HeaderCell>
                            <HeaderCell>Cliente</HeaderCell>
                            <HeaderCell>Productos</HeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders?.map((row, index) => (
                            <>
                                <TableRow key={index}>
                                    <TableCell sx={{ color: '#fff' }}>{row.createdAt}</TableCell>
                                    <TableCell sx={{ color: '#fff', textAlign: 'center' }}>{row.total}</TableCell>
                                    <TableCell sx={{ color: '#fff', textAlign: 'center' }}>{row.status}</TableCell>
                                    <TableCell align='center'>
                                        <IconButton onClick={() => toggleClient(index)}>
                                            {openClientRow === index ? <ExpandLessIcon sx={{ color: '#fff' }} /> : <ExpandMoreIcon sx={{ color: '#fff' }} />}
                                        </IconButton>
                                    </TableCell>
                                    <TableCell align='center'>
                                        <IconButton onClick={() => toggleProducts(index)}>
                                            {openProductRow === index ? <ExpandLessIcon sx={{ color: '#fff' }} /> : <ExpandMoreIcon sx={{ color: '#fff' }} />}
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align='center' colSpan={6} sx={{ p: 0 }}>
                                        <Collapse in={openClientRow === index} timeout="auto" unmountOnExit>
                                            <Box
                                                sx={{
                                                    p: 2,
                                                    pl: 4,
                                                    bgcolor: 'background.paper',
                                                    borderRadius: 1,
                                                    boxShadow: 1,
                                                }}
                                            >
                                                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                                                    <Typography variant="subtitle2" color="text.secondary">
                                                        Información del Cliente
                                                    </Typography>
                                                    <Divider flexItem orientation="horizontal" sx={{ mx: 1 }} />
                                                </Stack>

                                                <List dense disablePadding>
                                                    <ListItem sx={{ py: 0.5 }}>
                                                        <ListItemIcon sx={{ minWidth: 32 }}>
                                                            <PersonIcon fontSize="small" color="action" />
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            primary={`${row.user.firstName} ${row.user.lastName}`}
                                                            secondary="Nombre completo"
                                                        />
                                                    </ListItem>

                                                    <ListItem sx={{ py: 0.5 }}>
                                                        <ListItemIcon sx={{ minWidth: 32 }}>
                                                            <PhoneIcon fontSize="small" color="action" />
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            primary={row.user.phoneNumber}
                                                            secondary="Número telefónico"
                                                        />
                                                    </ListItem>
                                                </List>
                                            </Box>
                                        </Collapse>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align='center' colSpan={6} sx={{ p: 0, bgcolor: '#1e1e1e' }}>
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
