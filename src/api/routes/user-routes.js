import axiosInstance from "../axios";

const userRoutes = {
    create: (entry) => axiosInstance.post(`user/create`, entry),
};

export default userRoutes;