import { useRef, useState } from 'react';

import {
    CircularProgress,
    Box,
    Button,
    Typography,
    Card,
    Stack,
    Divider,
} from '@mui/material'

import Swal from 'sweetalert2';

import RegisterForm from './Form/RegisterForm';
import { useNavigate } from 'react-router';

// ----------------------------------------------------------------------
export default function RegisterView() {
    const formRef = useRef(null);
    const navigate = useNavigate();

    const [formStatus, setFormStatus] = useState({ isValid: false, dirty: false });
    const [loading, setLoading] = useState(false);

    const handleRegisterBtn = async () => {
        if (formRef.current) {
            setLoading(true);
            const res = await formRef.current.register();
            setLoading(false);

            if (res) {
                Swal.fire({
                    icon: 'success',
                    title: '¡Exito!',
                    text: res.data.message,
                    heightAuto: false,
                    background: '#1e1e1e',
                    color: '#f1f1f1',
                    confirmButtonColor: '#CEBD22',
                    confirmButtonText: 'Comenzar a comprar',
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    showCancelButton: false,
                }).then((result) => {
                    if (result.isConfirmed || result.isDismissed) navigate('/login');
                });
            }
        };
    }
    return (
        <Box sx={{ marginTop: 8, height: 1 }}>
            <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
                <Box sx={{ position: 'relative', width: 1, maxWidth: 420 }}>
                    <Card
                        sx={{
                            p: 4,
                            width: 1,
                            filter: loading ? 'blur(4px)' : 'none',
                            pointerEvents: loading ? 'none' : 'auto',
                            transition: 'filter 0.3s ease',
                        }}
                    >
                        <Typography variant="h4">Crear cuenta</Typography>
                        <Divider sx={{ my: 2 }} />

                        <RegisterForm
                            ref={formRef}
                            onStatusChange={setFormStatus}
                        />

                        <Divider sx={{ my: 2 }} />
                        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                            <Button sx={{ marginTop: 0 }} onClick={handleRegisterBtn} variant='outlined' disabled={!(formStatus.isValid && formStatus.dirty)}>
                                Registrar
                            </Button>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            ¿Ya tienes cuenta?
                            <a style={{ marginLeft: '8px' }} href="/login">Click aquí</a>
                        </Box>
                    </Card>

                    {/* CircularProgress overlay */}
                    {loading && (
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'rgba(90, 87, 87, 0.4)',
                                borderRadius: 2,
                                zIndex: 1,
                            }}
                        >
                            <CircularProgress />
                        </Box>
                    )}
                </Box>
            </Stack>
        </Box>
    );
};