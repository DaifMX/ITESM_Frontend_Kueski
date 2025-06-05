import { useContext, useState } from "react";

import orderRoutes from "../routes/order-routes";
import { AuthContext } from "../../context/AuthContext";

export default function useOrder() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [orders, setOrders] = useState([]);
    const [response, setResponse] = useState(null);

    const { role } = useContext(AuthContext);

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
            if (!userId && role !== 'ADMIN') throw new Error('Forbidden');
            
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

    return { orders, loading, error, response, create, getAll, getAllByUser };
};