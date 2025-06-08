import axiosInstance from "../axios";

const orderRoutes = {
    getAll: async (userId) => axiosInstance.get(`/order/getAll?userId=${userId}`),
    getByUuid: async (uuid) => axiosInstance.get(`/order/getByUuid/${uuid}`),
    getAdminDashboardInfo: async () => axiosInstance.get(`/order/getAdminDashboardInfo`),
    create: async (entry) => axiosInstance.post('/order/create', entry),
};

export default orderRoutes;