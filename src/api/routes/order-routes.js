import axiosInstance from "../axios";

const orderRoutes = {
    getAll: async (userId) => axiosInstance.get(`/order/getAll?userId=${userId}`),
    getById: async (id) => axiosInstance.get(`/order/getById/${id}`),
    create: async (entry) => axiosInstance.post('/order/create', entry),
};

export default orderRoutes;