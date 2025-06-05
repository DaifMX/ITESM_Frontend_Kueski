import { useState } from "react";

import orderRoutes from "../routes/order-routes";

export default function useOrder() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState({});

    const create = async (entry) => {
        setLoading(true);
        try {
            const res = await orderRoutes.create(entry);
            setResponse(res.data.payload);

            return res;
        } catch (error) {
            setError(error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const getAll = async () => {
        setLoading(true);
        try {
            const res = await orderRoutes.getAll();
            setResponse(res.data.payload);
            return res;
        } catch (error) {
            setError(error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const getAllFromUser = async (userId) => {
        setLoading(true);
        try {
            const res = await orderRoutes.getAllFromUser(userId);
            setResponse(res.data.payload);
            return res;
        } catch (error) {
            setError(error);
            throw error;
        } finally {
            setLoading(false);
        }
    };


    return { loading, error, response, create, getAll, getAllFromUser };
};