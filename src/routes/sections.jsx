import { lazy, useContext } from "react";
import { useRoutes, Navigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

import AdminLayout from "../layout/Admin/AdminLayout"
import StoreLayout from "../layout/StoreLayout";

export const CartView = lazy(() => import('../views/Cart/CartView'));
export const LoginView = lazy(() => import('../views/Auth/Login/LoginView'));
export const RegisterView = lazy(() => import('../views/Auth/Register/RegisterView'));
export const ProductDetailView = lazy(() => import('../views/Product/ProductDetailView'));
export const ProductListView = lazy(() => import('../views/Product/ProductListView'));

export const UserView = lazy(() => import('../views/Admin/Users'));

export default function AppRoutes() {
    const { role } = useContext(AuthContext);

    const routes = useRoutes([
        // PUBLIC
        { path: '/register', element: <RegisterView /> },
        { path: '/login', element: <LoginView /> },
        {
            element: <StoreLayout />,
            children: [
                { index: true, element: <ProductListView /> },
                { path: 'product/:productId', element: <ProductDetailView /> },
                { path: 'category/:categoryId', element: <ProductListView /> },
                {
                    path: 'cart',
                    element:
                        role === 'user' ? <CartView /> : <Navigate to="/login" replace />
                },
                { path: '*', element: <h1>Error: 404</h1> },
            ],
        },
        {
            path: '/admin',
            element: role === 'admin' ? <AdminLayout /> : <Navigate to="/login" replace />,
            children: [
                { index: true, element: <Navigate to="users" replace /> },
                { path: 'users', element: <UserView /> },
                { path: 'products', element: <ProductDetailView /> },
                { path: 'orders', element: <ProductDetailView /> },
                { path: '*', element: <Navigate to="/admin/users" replace /> },
            ],
        },
    ]);

    return routes;
};