import axiosInstance from "../axios";

const productRoutes = {
    create: (entry) => axiosInstance.post(`product/create`, entry),
    getAll: (category) => axiosInstance.get(`product/getAll${category ? `?category=${category}` : ''}`),
    getById: (id) => axiosInstance.get(`product/getById/${id}`),
    uploadImg: (id, img) => axiosInstance.patch(`product/uploadImg/${id}`, img, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
    }),
    updateStock: (id, stock) => axiosInstance.patch(`/product/updateStock/${id}`, stock),
    remove: (id) => axiosInstance.delete(`product/remove/${id}`),
};

export default productRoutes;