import axiosInstance from "../axios";

const orderRoutes = {
    getAll: async () => axiosInstance.get('/order/getAll'),
    getAllByUser: async (userId) => axiosInstance.get(`/order/getAllByUser/${userId}`),
    create: async (entry) => axiosInstance.post('/order/create', entry),
};

export default orderRoutes;