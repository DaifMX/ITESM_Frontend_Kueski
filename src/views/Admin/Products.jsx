import { useEffect, useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, Paper, IconButton, MenuItem, Popover,
    Box, Typography, Button
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import Iconify from '../../utils/Iconify';

import useProduct from '../../api/hooks/useProduct';

const HeaderCell = styled(TableCell)(() => ({
    color: '#fff',
    backgroundColor: '#333',
    fontWeight: 'bold',
    borderBottom: '1px solid #555'
}));

export default function Products() {
    const { products, getAll, response } = useProduct();

    const [anchorEl, setAnchorEl] = useState(null);
    const [selected, setSelected] = useState(null);

    // const data = [
    //     { name: 'Ángulo de Acero', price: '$45.00', category: 'Acero', description: 'Perfil estructural en L', stock: 20 },
    //     { name: 'Tubería Galvanizada', price: '$30.00', category: 'Tubería', description: 'Tubo de 2 pulgadas', stock: 50 },
    // ];

    const handleOpenMenu = (event, row) => {
        setAnchorEl(event.currentTarget);
        setSelected(row);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setSelected(null);
    };

    const handleUploadImage = () => {
        alert(`Subir imagen de: ${selected.name}`);
        handleClose();
    };

    const handleEditButton = () => {
        alert(`Editar: ${selected.name}`);
        handleClose();
    };

    const handleDeleteButton = () => {
        alert(`Eliminar: ${selected.name}`);
        handleClose();
    };

    useEffect(() => {
        getAll();
    }, [response]);

    return (
        <Box sx={{ bgcolor: '#121212', color: '#fff', minHeight: '100vh', px: 12 }}>
            <Typography variant="h6" gutterBottom>
                Lista de Productos
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Button startIcon={<ArrowBackIcon />} variant="contained" sx={{ bgcolor: '#fff' }}>
                    Volver
                </Button>
                <Button startIcon={<AddIcon />} variant="contained" sx={{ bgcolor: '#1976d2' }}>
                    Nuevo
                </Button>
            </Box>

            <TableContainer component={Paper} sx={{ bgcolor: '#1e1e1e' }}>
                <Table sx={{ minWidth: 800 }}>
                    <TableHead>
                        <TableRow>
                            <HeaderCell>Nombre</HeaderCell>
                            <HeaderCell>Precio</HeaderCell>
                            <HeaderCell>Categoria</HeaderCell>
                            <HeaderCell>Descripción</HeaderCell>
                            <HeaderCell>Stock</HeaderCell>
                            <HeaderCell align="right">Opciones</HeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products?.map((row, i) => (
                            <TableRow key={i}>
                                <TableCell sx={{ color: '#fff' }}>{row.name}</TableCell>
                                <TableCell sx={{ color: '#fff' }}>{row.price}</TableCell>
                                <TableCell sx={{ color: '#fff' }}>{row.category}</TableCell>
                                <TableCell sx={{ color: '#fff' }}>{row.description}</TableCell>
                                <TableCell sx={{ color: '#fff' }}>{row.stock}</TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={(e) => handleOpenMenu(e, row)}>
                                        <MoreVertIcon sx={{ color: '#fff' }} />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <Popover
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    PaperProps={{ sx: { bgcolor: '#2a2a2a', color: '#fff' } }}
                >
                    <MenuItem onClick={handleUploadImage}>
                        <Iconify icon="mdi:image-plus" sx={{ mr: 2 }} />
                        Subir Imagen
                    </MenuItem>
                    <MenuItem onClick={handleEditButton}>
                        <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
                        Editar
                    </MenuItem>
                    <MenuItem onClick={handleDeleteButton} sx={{ color: 'error.main' }}>
                        <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
                        Eliminar
                    </MenuItem>
                </Popover>
            </TableContainer>
        </Box>
    );
}
