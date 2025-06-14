import { useEffect, useState, forwardRef, useCallback, memo } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router';

import { fCurrency } from '../../../utils/format-number';
import {
    Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, Paper, IconButton, MenuItem, Popover, Dialog, DialogTitle,
    DialogContent, TextField, Box, Typography, Button, DialogActions,
    Snackbar, Alert, Stack
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
    MoreVert,
    ArrowBack,
    Add,
} from '@mui/icons-material';

import DeleteConfirmationDialog from '../../../components/DeleteConfirmationDialog';

import Iconify from '../../../utils/Iconify';

import { joiFormikAdapter } from 'joi-formik-adapter';
import ProductFormSchema from './ProductSchema';
import useProduct from '../../../api/hooks/useProduct';

const validationSchema = new ProductFormSchema().getSchema();

const initialValues = {
    name: '',
    description: '',
    stock: '',
    price: '',
    category: '',
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
    '& .MuiSelect-select': { color: '#fff' }
};

const CustomAlert = forwardRef((props, ref) => (
    <Alert elevation={6} ref={ref} variant="filled" {...props} />
));

const PopoverModal = memo(({
    anchorEl,
    handleClose,
    handleUploadImage,
    setDeleteDialogOpen,
    setAnchorEl

}) => {
    return (
        <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
            <MenuItem
                component="label"
                sx={{ cursor: 'pointer' }}
            >
                <Iconify icon="mdi:image-plus" sx={{ mr: 2 }} />
                Subir Imagen
                <input
                    type="file"
                    accept="image/webp"
                    hidden
                    onChange={handleUploadImage}
                />
            </MenuItem>
            <MenuItem onClick={() => {
                setDeleteDialogOpen(true)
                setAnchorEl(null)
            }} sx={{ color: 'error.main' }}>
                <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
                Eliminar
            </MenuItem>
        </Popover>
    );
});


const TableRowComponent = ({
    handleStockBlur,
    handleOpenMenu,
    row
}) => {
    const [prodStock, setProdStock] = useState(0)

    useEffect(()=>{
        setProdStock(parseInt(row.stock))
    }, [row])

    useEffect(() => {
        console.log(prodStock)
    }, [prodStock])
    return (
        <TableRow >
            <TableCell sx={{ color: '#fff' }}>{row.name}</TableCell>
            <TableCell sx={{ color: '#fff', textAlign: 'center' }}>{fCurrency(row.price)}</TableCell>
            <TableCell sx={{ color: '#fff', textAlign: 'center' }}>{row.category}</TableCell>
            <TableCell sx={{ color: '#fff' }}>{row.description}</TableCell>
            <TableCell sx={{ color: '#fff' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                        type='number'
                        value={prodStock}
                        onBlur={() => handleStockBlur(row.id, prodStock)}
                        onChange={(e) => setProdStock(e.target.value)}
                    >
                    </TextField>
                </Box>
            </TableCell>
            <TableCell sx={{ color: '#fff', textAlign: 'center' }}>{row.stockCommitted}</TableCell>
            <TableCell align="center">
                <IconButton onClick={(e) => handleOpenMenu(e, row)}>
                    <MoreVert sx={{ color: '#fff' }} />
                </IconButton>
            </TableCell>
        </TableRow>
    )
}


export default function Products() {
    const navigate = useNavigate();
    const { products, getAll, response, create, uploadImg, remove, updateStock } = useProduct();

    const [anchorEl, setAnchorEl] = useState(null);
    const [selected, setSelected] = useState(null);

    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const [openNewProductDialog, setOpenNewProductDialog] = useState(false);

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

    const handleOpenMenu = useCallback((event, row) => {
        setAnchorEl(event.currentTarget);
        setSelected(row);
    }, []);

    const handleClose = () => {
        setAnchorEl(null);
        setSelected(null);
    };

    const handleCreate = () => {
        formik.handleSubmit();
        setOpenNewProductDialog(false);

        try {
            console.log(formik.values);
            create(formik.values).then((res) => {
                if (res || !error) setSnackbar({ open: true, message: 'Producto creado correctamente.', severity: 'success' });
                setOpenNewProductDialog(false);
                formik.handleReset();
            }).catch((err) => {
                setSnackbar({ open: true, message: err.response.data.reason, severity: 'error' });
            });

        } catch (err) {
            console.error(err);
            setSnackbar({ open: true, message: 'Error desconocido.', severity: 'error' });
        };
        setData((prev) => [...prev, values]);
    };

    const handleUploadImage = async (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // regex double-check
        if (!/\.(?:jpe?g|webp)$/i.test(file.name)) {
            setSnackbar({ open: true, message: 'Extensión de archivo invalido. Solo se acepta jpeg, jpg ó png', severity: 'error' });
            event.target.value = '';
            return;
        }

        const formData = new FormData();
        formData.append('image', file);
        const res = await uploadImg(selected.id, formData);

        if (res.status == 200) setSnackbar({ open: true, message: 'Imagen subida correctamente al servidor.', severity: 'success' });

        handleClose();
    };

    const handleDeleteConfirmBtn = async () => {
        handleClose();
        try {
            const res = await remove(selected.id);
            if (res || !error) {
                setSnackbar({ open: true, message: `Producto ${selected.name} removido correctamente`, severity: 'success' });
                setDeleteDialogOpen(false);
            }
        } catch (err) {
            console.error(err);
            setSnackbar({ open: true, message: err.response.data.reason || 'Error desconocido', severity: 'error' });
        }
    };

    const handleStockBlur = (id, newStock) => {
        updateStock(id, { stock: newStock });
    };

    return (
        <Box sx={{ bgcolor: '#121212', color: '#fff', minHeight: '100vh', px: { xs: 1, lg: 6 } }}>
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
                Lista de Productos
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Button startIcon={<ArrowBack />} variant="contained" sx={{ bgcolor: '#fff' }} onClick={() => navigate('./home')}>
                    Volver
                </Button>
                <Button startIcon={<Add />} variant="contained" sx={{ bgcolor: '#1976d2' }} onClick={() => setOpenNewProductDialog(true)}>
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
                            <HeaderCell sx={{ textAlign: 'center' }}>Stock</HeaderCell>
                            <HeaderCell sx={{ textAlign: 'center' }}>Stock Comprometido</HeaderCell>
                            <HeaderCell align="center">Opciones</HeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products?.map((row, i) => (
                            <TableRowComponent
                                key={i}
                                handleStockBlur={handleStockBlur}
                                handleOpenMenu={handleOpenMenu}
                                row={row}
                            />
                        ))}
                    </TableBody>
                </Table>
                <PopoverModal
                    anchorEl={anchorEl}
                    handleClose={handleClose}
                    handleUploadImage={handleUploadImage}
                    setDeleteDialogOpen={setDeleteDialogOpen}
                    setAnchorEl={setAnchorEl}
                />
            </TableContainer>

            <Dialog lg={1200} open={openNewProductDialog} onClose={() => setOpenNewProductDialog(false)}>
                <DialogTitle sx={{ color: '#fff', bgcolor: '#1e1e1e' }}>Nuevo producto</DialogTitle>
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
                                name="name"
                                value={formik.values.name}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                error={Boolean(formik.errors.name && formik.touched.name)}
                                helperText={formik.touched.name && formik.errors.name}
                                required
                                sx={fieldStyles}
                            />

                            <TextField
                                fullWidth
                                margin="normal"
                                label="Stock inicial"
                                type='number'
                                name="stock"
                                value={formik.values.stock}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                error={Boolean(formik.errors.stock && formik.touched.stock)}
                                helperText={formik.touched.stock && formik.errors.stock}
                                required
                                sx={fieldStyles}
                            />

                            <TextField
                                fullWidth
                                margin="normal"
                                label="Precio"
                                type='number'
                                name="price"
                                value={formik.values.price}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                error={Boolean(formik.errors.price && formik.touched.price)}
                                helperText={formik.touched.price && formik.errors.price}
                                required
                                sx={fieldStyles}
                            />

                            <TextField
                                fullWidth
                                margin="normal"
                                label="Descripción"
                                name="description"
                                value={formik.values.description}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                error={Boolean(formik.errors.description && formik.touched.description)}
                                helperText={formik.touched.description && formik.errors.description}
                                required
                                multiline
                                sx={{ ...fieldStyles, '& .MuiInputBase-root': { minHeight: 140 } }}
                            />
                            <TextField
                                fullWidth
                                select
                                margin="normal"
                                label="Categoria"
                                name="category"
                                value={formik.values.category}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                error={Boolean(formik.errors.category && formik.touched.category)}
                                helperText={formik.touched.category && formik.errors.category}
                                required
                                sx={{
                                    width: '100%',
                                    maxWidth: '100%',
                                    '& .MuiSelect-select': {
                                        width: '100% !important',
                                        minWidth: '0 !important',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        width: '100%',
                                        maxWidth: '100%'
                                    }
                                }}
                                SelectProps={{
                                    MenuProps: {
                                        PaperProps: {
                                            sx: {
                                                minWidth: 'fit-content !important',
                                                maxWidth: 'calc(100% - 32px) !important'
                                            }
                                        }
                                    }
                                }}

                            >
                                <MenuItem value="frenos">Frenos</MenuItem>
                                <MenuItem value="suspesion">Suspensión</MenuItem>
                                <MenuItem value="interiores">Interiores</MenuItem>
                                <MenuItem value="filtros">Filtros</MenuItem>
                                <MenuItem value="exteriores">Exteriores</MenuItem>
                                <MenuItem value="rines">Rines</MenuItem>
                                <MenuItem value="cargadores">Cargadores</MenuItem>
                                <MenuItem value="escapes">Escapes</MenuItem>
                            </TextField>
                        </Stack>
                        <DialogActions>
                            <Button onClick={() => setOpenNewProductDialog(false)} variant="outlined" sx={{ color: '#fff', borderColor: '#555', flex: 0.25, mr: 0, py: 1, px: 4 }}>Cancelar</Button>
                            <Button type="submit" variant="outlined" onClick={handleCreate} disabled={!(formik.isValid && formik.dirty)} sx={{ flex: 0.25, px: 4, py: 0.95 }}>Guardar</Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
            <DeleteConfirmationDialog
                key={`delete-dialog`}
                open={deleteDialogOpen}
                entryToDelete={selected?.name}
                onConfirm={handleDeleteConfirmBtn}
                onCancel={() => setDeleteDialogOpen(false)}
            />
        </Box >
    );
}
