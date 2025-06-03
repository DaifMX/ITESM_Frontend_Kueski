import { lazy } from "react";
import { useRoutes } from "react-router-dom";

import StoreLayout from "../components/Layout/StoreLayout";

export const CartView = lazy(() => import('../views/Cart/CartView'));
export const LoginView = lazy(() => import('../views/Auth/Login/LoginView'));
export const RegisterView = lazy(() => import('../views/Auth/Register/RegisterView'));
export const ProductDetailView = lazy(() => import('../views/Product/ProductDetailView'));
export const ProductListView = lazy(() => import('../views/Product/ProductListView'));

export default function AppRoutes() {
    const routes = useRoutes([
        { path: "register", element: <RegisterView /> },
        { path: "login", element: <LoginView /> },
        {
            element: <StoreLayout/>,
            children: [
                { index: true, element: <ProductListView /> },
                { path: "product/:productId", element: <ProductDetailView /> },
                { path: "category/:categoryId", element: <ProductListView /> },
                { path: "cart", element: <CartView /> },
                { path: "*", element: <h1>Error: 404</h1> },
            ],
        },
    ]);

    return routes;
};