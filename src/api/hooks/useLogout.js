import { useState } from 'react';

import AuthService from 'src/api/auth/auth-service';
import useAuthContext from 'src/context/AuthContext';

export default function useLogout() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('');
    const [response, setResponse] = useState('')

    const { setAuthStatus } = useAuthContext();

    const logout = async () => {
        setLoading(true);

        try {
            const res = await AuthService.logout();
            const { status, data } = res;

            setResponse(data.payload);
            if (status === 200) setAuthStatus({});

            return data.payload;

        } catch (err) {
            setError(err);
            return '';

        } finally {
            setLoading(false);
        }
    }

    return { loading, error, response, logout }
};