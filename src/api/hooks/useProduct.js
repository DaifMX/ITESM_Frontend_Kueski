import { useState } from "react";

import productRoutes from "../routes/product-routes";

export default function useProduct() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getAll = async (category) => {
        setLoading(true);
        try {
            const res = await productRoutes.getAll(category);
            setProducts(res.data.payload);
            return res;

        } catch (error) {
            setError(error);
            return error;

        } finally {
            setLoading(false);
        }
    };

    return { products, loading, error, getAll };
};