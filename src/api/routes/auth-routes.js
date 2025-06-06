import axiosInstance from "../axios";

const authRoutes = {
    login: (credentials = {}) => axiosInstance.post(`auth/login`, credentials),
    logout: () => axiosInstance.get(`auth/logout`),
    refresh: () => axiosInstance.get('auth/isLoggedIn'),
};

export default authRoutes;