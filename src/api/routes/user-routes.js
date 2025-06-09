import axiosInstance from "../axios";

const userRoutes = {
    create: (entry = {}) => axiosInstance.post(`user/create`, entry),
    getAll: () => axiosInstance.get('user/getAll'),
    remove: async (id) => axiosInstance.delete(`user/remove/${id}`)
};

export default userRoutes;