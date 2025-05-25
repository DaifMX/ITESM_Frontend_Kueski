import axiosInstance from "../axios"

const productRoutes = {
    getAll: (category) => axiosInstance.get(`product/getAll${category ? `?category=${category}` : ''}`),
};

export default productRoutes;