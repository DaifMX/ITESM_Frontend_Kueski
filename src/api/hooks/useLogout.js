import { useState } from 'react';

import AuthService from '../routes/auth-routes';
import useAuth from '../../context/AuthContext';

export default function useLogout() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('');
    const [response, setResponse] = useState('')

    const { setUser } = useAuth();

    const logout = async () => {
        setLoading(true);

        try {
            const res = await AuthService.logout();
            const { status, data } = res;

            setResponse(data.payload);
            if (status === 200) setUser({});

            return res;

        } catch (err) {
            setError(err);
            return '';

        } finally {
            setLoading(false);
        }
    }

    return { loading, error, response, logout }
};