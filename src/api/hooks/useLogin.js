import { useState, useEffect } from 'react';

import useAuth from '../../context/AuthContext';
import authRoutes from '../routes/auth-routes';

import getToken from '../../utils/getToken';

import { AxiosError } from 'axios';

export default function useLogin() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState('');

    const { setUser, user } = useAuth();

    useEffect(()=>{
        console.log('use login,', user)
    }, [user])

    const login = async (phoneNumber, password) => {
        setLoading(true);
        try {
            const res = await authRoutes.login({ phoneNumber, password });
            setResponse(res.data.payload); 

            const refTkn = getToken('refreshToken');
            const propsTkn = getToken('propsToken')
            
            if (refTkn && refTkn.role) setUser({ id: refTkn.id, name: propsTkn.fullName, role: refTkn.role, status: res.status});

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