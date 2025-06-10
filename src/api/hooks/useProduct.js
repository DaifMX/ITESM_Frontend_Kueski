import { useState } from "react";

import productRoutes from "../routes/product-routes";

export default function useProduct() {
    const [products, setProducts] = useState([]);
    const [response, setResponse] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const create = async (entry) => {
        setLoading(true);
        try {
            const res = await productRoutes.create(entry);
            setResponse(res.data.payload);

            return res;
        } catch (error) {
            setError(error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

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

    const getById = async (id) => {
        setLoading(true);
        try {
            const res = await productRoutes.getById(id);
            setResponse(res.data.payload);
            return res;

        } catch (error) {
            setError(error);
            return error;

        } finally {
            setLoading(false);
        }
    };

    const updateStock = async (id, newStock) => {
        setLoading(true);
        try {
            const res = await productRoutes.updateStock(id, newStock);
            setResponse(res.data.payload);

            return res;
        } catch (error) {
            setError(error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const uploadImg = async (id, img) => {
        setLoading(true);
        try {
            const res = await productRoutes.uploadImg(id, img);
            setResponse(res.data.payload);
            return res;
        } catch (error) {
            setError(error);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const remove = async (id) => {
        setLoading(true);
        try {
            const res = await productRoutes.remove(id);
            setResponse(res.data.payload);

            return res;
        } catch (error) {
            setError(error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { products, loading, error, response, create, getAll, getById, updateStock, uploadImg, remove };
};