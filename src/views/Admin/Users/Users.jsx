import { useEffect, useState, forwardRef } from 'react';
import { useFormik } from 'formik';
import { joiFormikAdapter } from 'joi-formik-adapter';
import { useNavigate } from 'react-router';

import {
    Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, Paper, IconButton, MenuItem, Popover, Dialog, DialogTitle,
    DialogContent, TextField, Box, Typography, Button, DialogActions,
    Snackbar, Alert, FormControl, InputLabel, OutlinedInput, InputAdornment,
    FormHelperText, Stack
} from '@mui/material';

import { styled } from '@mui/material/styles';

import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import DeleteConfirmationDialog from '../../../components/DeleteConfirmationDialog';

import UserFormSchema from './UserSchema';
import useUser from '../../../api/hooks/useUser';
import Iconify from '../../../utils/Iconify';

const validationSchema = new UserFormSchema().getSchema();

const initialValues = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    password: '',
    role: '',
};

const HeaderCell = styled(TableCell)(() => ({
    color: '#fff',
    backgroundColor: '#333',
    fontWeight: 'bold',
    borderBottom: '1px solid #555'
}));

const fieldStyles = {
    input: { color: '#fff' },
    label: { color: '#ccc' },
    '& .MuiFormHelperText-root': { color: '#f44336' },
    '& .MuiSelect-select': { color: '#fff' },
};

const CustomAlert = forwardRef((props, ref) => (
    <Alert elevation={6} ref={ref} variant="filled" {...props} />
));

export default function UsersView() {
    const { users, getAll, response, create, error, remove } = useUser();

    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const [selected, setSelected] = useState({});

    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const [openNewUserDialog, setOpenNewUserDialog] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    useEffect(() => {
        getAll();
    }, [response]);

    const formik = useFormik({
        initialValues,
        validationSchema: joiFormikAdapter(validationSchema),
        enableReinitialize: true,
        validateOnBlur: true,
        validateOnChange: true,
    });

    const handleOpenMenu = (event, row) => {
        setAnchorEl(event.currentTarget);
        setSelected(row);
        console.log(row);
    };

    const handleClose = () => {
        formik.resetForm();
        setAnchorEl(null);
        setSelected(null);
    };

    const handleCreate = () => {
        formik.handleSubmit();
        setOpenNewUserDialog(false);

        try {
            create(formik.values).then((res) => {
                if (res || !error) setSnackbar({ open: true, message: 'Usuario creado correctamente.', severity: 'success' });
                setOpenNewUserDialog(false);
            }).catch((err) => {
                setSnackbar({ open: true, message: err.response.data.reason, severity: 'error' });
            });

        } catch (err) {
            console.error(err);
            setSnackbar({ open: true, message: 'Error desconocido.', severity: 'error' });
        };
        setData((prev) => [...prev, values]);
    };
    
    const handleDeleteDialogConfirmBtn = async () => {
        try {
            const res = await remove(selected.id);
            if (res || !error) {
                setSnackbar({ open: true, message: `Usuario ${selected.phoneNumber} removido correctamente`, severity: 'success' });
                setDeleteDialogOpen(false);
            }
        } catch (err) {
            console.error(err);
            setSnackbar({ open: true, message: err.response.data.reason || 'Error desconocido', severity: 'error' });
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', bgcolor: '#121212', color: '#fff', px: { xs: 1, lg: 6 } }}>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <CustomAlert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
                    {snackbar.message}
                </CustomAlert>
            </Snackbar>

            <Typography variant="h6" gutterBottom>
                Lista de Usuarios
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Button startIcon={<ArrowBackIcon />} variant="contained" sx={{ bgcolor: '#fff' }} onClick={() => navigate('./home')}>
                    Volver
                </Button>
                <Button startIcon={<AddIcon />} variant="contained" sx={{ bgcolor: '#1976d2' }} onClick={() => setOpenNewUserDialog(true)}>
                    Nuevo
                </Button>
            </Box>

            <TableContainer component={Paper} sx={{ bgcolor: '#1e1e1e' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <HeaderCell>Nombre</HeaderCell>
                            <HeaderCell>Apellido</HeaderCell>
                            <HeaderCell>No. Telefono</HeaderCell>
                            <HeaderCell>Rol</HeaderCell>
                            <HeaderCell align="right">Opciones</HeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users?.map((row, i) => (
                            <TableRow key={i}>
                                <TableCell sx={{ color: '#fff' }}>{row.firstName}</TableCell>
                                <TableCell sx={{ color: '#fff' }}>{row.lastName}</TableCell>
                                <TableCell sx={{ color: '#fff' }}>{row.phoneNumber}</TableCell>
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
                    anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <MenuItem onClick={() => setDeleteDialogOpen(true)} sx={{ color: 'error.main' }}>
                        <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
                        Eliminar
                    </MenuItem>
                </Popover>

            </TableContainer>

            <Dialog open={openNewUserDialog} onClose={() => setOpenNewUserDialog(false)}>
                <DialogTitle sx={{ color: '#fff', bgcolor: '#1e1e1e' }}>Nuevo usuario</DialogTitle>
                <DialogContent sx={{ bgcolor: '#1e1e1e' }}>
                    <Typography variant="body2" sx={{ mb: 2, color: '#ccc' }}>
                        Todos los campos son obligatorios.
                    </Typography>
                    <form onSubmit={formik.handleSubmit}>
                        <Stack spacing={2}>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Nombre"
                                name="firstName"
                                type={'text'}
                                value={formik.values.firstName}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                error={Boolean(formik.errors.firstName && formik.touched.firstName)}
                                helperText={formik.touched.firstName && formik.errors.firstName}
                                required
                                sx={fieldStyles}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Apellido"
                                name="lastName"
                                value={formik.values.lastName}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                error={Boolean(formik.errors.lastName && formik.touched.lastName)}
                                helperText={formik.touched.lastName && formik.errors.lastName}
                                required
                                sx={fieldStyles}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="No. Telefóno"
                                name="phoneNumber"
                                value={formik.values.phoneNumber}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                error={Boolean(formik.errors.phoneNumber && formik.touched.phoneNumber)}
                                helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                                required
                                sx={fieldStyles}
                            />
                            <FormControl
                                fullWidth
                                variant="outlined"
                                sx={fieldStyles}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                            >
                                <InputLabel required htmlFor="password-field">Contraseña</InputLabel>
                                <OutlinedInput
                                    fullWidth
                                    id="password-field"
                                    name="password"
                                    label="Contraseña"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formik.values.password || ''}
                                    onBlur={formik.handleBlur}
                                    sx={fieldStyles}
                                    required
                                    onChange={(e) => formik.setFieldValue('password', e.target.value)}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                                <FormHelperText>
                                    {formik.touched.password && formik.errors.password}
                                </FormHelperText>
                            </FormControl>
                            <TextField
                                fullWidth
                                margin="normal"
                                select
                                label="Rol"
                                name="role"
                                value={formik.values.role}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                error={Boolean(formik.errors.role && formik.touched.role)}
                                helperText={formik.touched.role && formik.errors.role}
                                required
                                sx={fieldStyles}
                            >
                                <MenuItem value="ADMIN">Admin</MenuItem>
                                <MenuItem value="USER">Usuario</MenuItem>
                            </TextField>
                        </Stack>

                        <DialogActions>
                            <Button onClick={() => setOpenNewUserDialog(false)} variant="outlined" sx={{ color: '#fff', borderColor: '#555', flex: 0.25, mr: 0, py: 1, px: 4 }}>Cancelar</Button>
                            <Button type="submit" variant="outlined" disabled={!(formik.isValid && formik.dirty)} onClick={handleCreate} sx={{ flex: 0.25, px: 4, py: 0.95 }}>Guardar</Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
            <DeleteConfirmationDialog
                key={`delete-dialog`}
                open={deleteDialogOpen}
                entryToDelete={selected?.firstName}
                onConfirm={handleDeleteDialogConfirmBtn}
                onCancel={() => setDeleteDialogOpen(false)}
            />
        </Box>
    );
}
