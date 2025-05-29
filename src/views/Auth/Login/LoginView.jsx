import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useAuth from '../../../api/hooks/useAuth';

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

import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------
export default function LoginView() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLoginButton = async (e) => {
        e.preventDefault();

        try {
            const res = await login(phoneNumber, password);

            setPhoneNumber('');
            setPassword('');

            navigate('../');

        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.response.data.reason,
                heightAuto: false
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
        <Box sx={{ marginTop: 20, height: 1, }}>
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