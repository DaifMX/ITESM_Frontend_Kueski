import axiosInstance from "../axios";

const productRoutes = {
    getAll: (category) => axiosInstance.get(`product/getAll${category ? `?category=${category}` : ''}`),
    getById: (id) => axiosInstance.get(`product/getById/${id}`),
};

export default productRoutes;