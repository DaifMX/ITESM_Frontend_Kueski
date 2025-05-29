import { useState } from 'react';

import userRoutes from '../routes/user-routes';

export default function useUser() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState('');

    const login = async (phoneNumber, password, firstName, lastName) => {
        setLoading(true);
        try {
            const res = await userRoutes.create({ phoneNumber, password, firstName, lastName });
            setResponse(res);

            return res;
        } catch (error) {
            setError(error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, response, login }
};