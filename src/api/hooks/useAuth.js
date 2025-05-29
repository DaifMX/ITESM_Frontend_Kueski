import { useState } from 'react';

import authRoutes from '../routes/auth-routes';

import { AxiosError } from 'axios';

export default function useAuth() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState('');

    const login = async (phoneNumber, password) => {
        setLoading(true);
        try {
            const res = await authRoutes.login({ phoneNumber, password });
            setResponse(res);

            return res; // SE NECESITA TODA LA RESPUESTA NO CAMBIAR

        } catch (err) {
            let errMsg;
            if (err.code === 'ERR_NETWORK') errMsg = 'Sin conexión con el servidor.';
            else if (err instanceof AxiosError) errMsg = err.response?.data.reason;
            else if (err.response) errMsg = err.response.data.ms;
            else errMsg = 'Error desconocido.';

            setError(errMsg);
            throw err;

        } finally {
            setLoading(false);
        }
    };
    return { loading, error, response, login };
};