import { useEffect, useState } from 'react';

import {
    Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, Paper, IconButton, MenuItem, Popover,
    Box, Typography, Button
} from '@mui/material';
import { styled } from '@mui/material/styles';

import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import Iconify from '../../utils/Iconify';
import useUser from '../../api/hooks/useUser';

const HeaderCell = styled(TableCell)(() => ({
    color: '#fff',
    backgroundColor: '#333',
    fontWeight: 'bold',
    borderBottom: '1px solid #555'
}));

export default function UsersView() {
    const { users, getAll, response } = useUser();

    const [anchorEl, setAnchorEl] = useState(null);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        getAll();
    }, [response]);

    const handleOpenMenu = (event, row) => {
        setAnchorEl(event.currentTarget);
        setSelected(row);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setSelected(null);
    };

    const handleEditButton = () => {
        alert(`Editar: ${selected.firstName} ${selected.lastName}`);
        handleClose();
    };

    const handleDeleteButton = () => {
        alert(`Eliminar: ${selected.firstName} ${selected.lastName}`);
        handleClose();
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', bgcolor: '#121212', color: '#fff', px: 8 }}>
            <Typography variant="h6" gutterBottom>
                Lista de Usuarios
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
                <Table sx={{ minWidth: 600 }}>
                    <TableHead>
                        <TableRow>
                            <HeaderCell>Nombre</HeaderCell>
                            <HeaderCell>Apellido</HeaderCell>
                            <HeaderCell>Rol</HeaderCell>
                            <HeaderCell align="right">Opciones</HeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users?.map((row, i) => (
                            <TableRow key={i}>
                                <TableCell sx={{ color: '#fff' }}>{row.firstName}</TableCell>
                                <TableCell sx={{ color: '#fff' }}>{row.lastName}</TableCell>
                                <TableCell sx={{ color: '#fff' }}>{row.role}</TableCell>
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
