import { useState } from "react";

import orderRoutes from "../routes/order-routes";
import useAuth from "../../context/AuthContext";

export default function useOrder() {
    const [orders, setOrders] = useState([]);
    const [response, setResponse] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { user } = useAuth();

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

    const getAll = async (userId) => {
        setLoading(true);
        try {
            if (!userId && user.role !== 'ADMIN') throw new Error('Forbidden');

            const res = await orderRoutes.getAll(userId);
            setOrders(res.data.payload);
            return res;
        } catch (error) {
            setError(error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const getAdminDashboardInfo = async () => {
        setLoading(true);
        try {
            if (user.role !== 'ADMIN') throw new Error('Forbidden');
            const res = await orderRoutes.getAdminDashboardInfo();

            setResponse(res.data.payload);
            return res;
        } catch (error) {
            setError(error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { orders, loading, error, response, create, getAll, getAdminDashboardInfo };
};