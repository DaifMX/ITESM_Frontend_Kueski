import { useState } from 'react';

import userRoutes from '../routes/user-routes';
import useAuth from '../../context/AuthContext';

export default function useUser() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState('');

    const [users, setUsers] = useState([]);

    const { user } = useAuth();

    const create = async (entry) => {
        setLoading(true);
        try {
            const res = await userRoutes.create(entry);
            setResponse(res);

            return res;
        } catch (error) {
            setError(error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const getAll = async () => {
        if (user.role !== 'ADMIN') throw new Error('Forbidden');
        setLoading(true);

        try {
            const res = await userRoutes.getAll();
            setUsers(res.data.payload);

            return res;
        } catch (error) {
            setError(error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const getById = async (id) => {
        setLoading(true);
        try {
            const res = await userRoutes.getById(id);
            setResponse(res.data.payload);

            return res;
        } catch (error) {
            setError(error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const remove = async (id) => {
        if (user.role !== 'ADMIN') throw new Error('Forbidden');

        setLoading(true);
        try {
            const res = await userRoutes.remove(id);
            setResponse(res.data.payload);

            return res;
        } catch (error) {
            setError(error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, response, users, create, getAll, getById, remove };
};