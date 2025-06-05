import axiosInstance from "../axios";

const userRoutes = {
    getAll: () => axiosInstance.get('user/getAll'),
    create: (entry = {}) => axiosInstance.post(`user/create`, entry),
    remove: async (id) => axiosInstance.delete(`user/remove/${id}`)
};

export default userRoutes;