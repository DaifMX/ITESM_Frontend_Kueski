import axiosInstance from "../axios";

const authRoutes = {
    login: (entry) => axiosInstance.post(`auth/login`, entry),
};

export default authRoutes;