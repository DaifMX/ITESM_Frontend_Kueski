import { useState } from 'react';

import authRoutes from '../routes/auth-routes';
import useAuth from '../../context/AuthContext';
import getToken from '../../utils/get-token';

export default function useRefresh() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('');
    const [response, setResponse] = useState('');

    const { setUser, user } = useAuth()

    const refresh = async () => {
        setLoading(true);

        try {
            const res = await authRoutes.refresh();
            setResponse(res);
            console.log('prev', user);
            const refTkn = getToken('refreshToken');
            console.log('rT', refTkn);
            setUser(prev => {console.log('prev', prev); const final = { ...prev, fullName: getToken('propsToken').fullName, status: res.status }; return final;})

            return res;

        } catch (err) {
            setError(err);
            return '';

        } finally {
            setLoading(false);
        }
    }

    return { loading, error, response, refresh };
};