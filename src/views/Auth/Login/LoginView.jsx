import { useState } from 'react';
import { useNavigate } from 'react-router';

import {
    Box,
    Button,
    Typography,
    Card,
    Stack,
    Divider,
    TextField,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton
} from '@mui/material'

import Swal from 'sweetalert2';

import Iconify from '../../../utils/Iconify';
import useLogin from '../../../api/hooks/useLogin';

// ----------------------------------------------------------------------
export default function LoginView() {
    const navigate = useNavigate();
    const { login } = useLogin();

    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLoginButton = async (e) => {
        e.preventDefault();

        try {
            const res = await login(phoneNumber, password);

            setPhoneNumber('');
            setPassword('');
            navigate(location.state?.from || '../', { replace: true });

        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.response?.data?.reason || err.message,
                heightAuto: false,
                background: '#1e1e1e',
                color: '#f1f1f1',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
            });
        }
    };

    const renderForm = (
        <>
            <Stack spacing={3}>
                <TextField
                    name="phoneNumber"
                    type='tel'
                    label="Número telefónico"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />

                <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="password">Contraseña</InputLabel>
                    <OutlinedInput
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Contraseña"
                    />
                </FormControl>
            </Stack>
        </>
    );

    return (
        <Box sx={{ marginTop: 8, height: 1, }}>
            <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
                <Card sx={{ p: 4, width: 1, maxWidth: 420 }}>
                    <Typography variant="h4">Bienvenido</Typography>
                    <Divider sx={{ my: 2 }} />
                    {renderForm}
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                        <Button sx={{ marginTop: 0 }} onClick={handleLoginButton} variant='outlined' disabled={!phoneNumber || !password}>
                            Iniciar Sesión
                        </Button>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        ¿No estás registrado?
                        <a style={{ marginLeft: '8px' }} href="/register">Click aquí</a>
                    </Box>
                </Card>
            </Stack>
        </Box>
    );
};