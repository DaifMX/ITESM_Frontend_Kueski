import { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import Swal from 'sweetalert2';

import Iconify from '../../iconify';

// ----------------------------------------------------------------------
export default function LoginView() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [showPassword, setShowPassword] = useState(false);

    const handleLoginButton = async (e) => {
        e.preventDefault();

        try {

            await login({ email, password });
            setEmail('')
            setPassword('')

            Swal.close()

        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.message,
                heightAuto: false
            });
        }
    };

    const renderForm = (
        <>
            <Stack spacing={3}>
                <TextField name="email" type='email' label="Correo electronico" value={email} onChange={(e) => setEmail(e.target.value)} />

                <TextField
                    name="password"
                    label="Contraseña"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    slotProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Stack>
            <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                <Button sx={{ marginTop: 4 }} variant='outlined'>
                    Iniciar Sesión
                </Button>
            </Box>
        </>
    );

    return (
        <Box
            sx={{
                marginTop: 20,
                height: 1,
            }}
        >
            <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
                <Card
                    sx={{
                        p: 5,
                        width: 1,
                        maxWidth: 420,
                    }}
                >
                    <Typography variant="h4">Bienvenido</Typography>

                    <Divider sx={{ my: 3 }} />

                    {renderForm}
                </Card>
            </Stack>
        </Box>
    );
}
