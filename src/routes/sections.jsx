import { lazy } from "react";
import { useRoutes, Navigate } from "react-router-dom";

import StoreLayout from "../layout/StoreLayout";
import RequiresLogin from "./components/RequiresLogin";
import RequiresAdmin from './components/RequiresAdmin';

export const CartView = lazy(() => import('../views/Cart/CartView'));
export const LoginView = lazy(() => import('../views/Auth/Login/LoginView'));
export const RegisterView = lazy(() => import('../views/Auth/Register/RegisterView'));
export const ProductDetailView = lazy(() => import('../views/Product/ProductDetailView'));
export const ProductListView = lazy(() => import('../views/Product/ProductListView'));

export const UserView = lazy(() => import('../views/Admin/Users'));

export default function AppRoutes() {
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
                    element: <RequiresLogin />,
                    children: [
                        { path: 'cart', element: <CartView /> }
                    ]
                },
                { path: '*', element: <h1>Error: 404</h1> },
            ],
        },
        {
            path: '/admin',
            element: <RequiresAdmin />,
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