import { lazy } from "react";
import { useRoutes, Navigate } from "react-router";

import AdminLayout from "../layout/Admin/AdminLayout";
import StoreLayout from "../layout/StoreLayout";

import RequireAuth from "./components/RequieresAuth";
import PersistLogin from "./components/PersistLogin";
import UserOrdersView from "../views/Shop/Orders/UserOrdersView";


export const HomeView = lazy(() => import('../views/Admin/Home/Home'));
export const ProductView = lazy(() => import('../views/Admin/Products/Products'));
export const UserView = lazy(() => import('../views/Admin/Users/Users'));
export const OrderView = lazy(() => import('../views/Admin/Orders/Orders'));

export const OrderCanceledView = lazy(() => import("../views/OrderStauts/Canceled"));
export const OrderFailedView = lazy(() => import("../views/OrderStauts/Failed"));
export const OrderRejectView = lazy(() => import("../views/OrderStauts/Reject"));
export const OrderSuccessView = lazy(() => import("../views/OrderStauts/Success"));

export const CartView = lazy(() => import('../views/Shop/Cart/CartView'));
export const LoginView = lazy(() => import('../views/Auth/Login/LoginView'));
export const RegisterView = lazy(() => import('../views/Auth/Register/RegisterView'));
export const ProductDetailView = lazy(() => import('../views/Shop/Product/ProductDetailView'));
export const ProductListView = lazy(() => import('../views/Shop/Product/ProductListView'));

export default function AppRoutes() {
    const routes = useRoutes([
        { path: '/register', element: <RegisterView /> },
        { path: '/login', element: <LoginView /> },
        {
            element: <PersistLogin />,
            children: [
                {
                    element: <StoreLayout />,
                    children: [
                        { index: true, element: <ProductListView /> },
                        { path: 'product/:productId', element: <ProductDetailView /> },
                        { path: 'category/:categoryId', element: <ProductListView /> },
                        { path: '*', element: <h1>Error: 404</h1> },
                        {
                            element: <RequireAuth allowedRoles={['USER', 'ADMIN']} />,
                            children: [
                                { path: 'my-orders', element: <UserOrdersView /> },
                                { path: 'cart', element: <CartView /> },
                            ]
                        },
                    ],
                },
                {
                    element: <RequireAuth allowedRoles={['USER', 'ADMIN']} />,
                    children: [
                        { path: '/canceled/:orderId', element: <OrderCanceledView /> },
                        { path: '/failed/:orderId', element: <OrderFailedView /> },
                        { path: '/success/:orderId', element: <OrderSuccessView /> },
                        { path: '/reject/:orderId', element: <OrderRejectView /> },
                    ]
                },
            ],
        },
        {
            element: <PersistLogin />,
            children: [
                {
                    element: <RequireAuth allowedRoles={['ADMIN']} />,
                    children: [
                        // Home route (protected)
                        {
                            path: '/admin/',
                            element: <AdminLayout />,
                            children: [
                                {
                                    index: true,
                                    element: <Navigate to='home' replace />
                                },
                                {
                                    path: 'home',
                                    element: <HomeView />
                                },
                                {
                                    path: 'users',
                                    element: <UserView />
                                },
                                {
                                    path: 'products',
                                    element: <ProductView />
                                },
                                {
                                    path: 'orders',
                                    element: <OrderView />
                                },
                                {
                                    path: '*',
                                    element: <Navigate to="/admin/home" replace />
                                }
                            ],
                        },
                    ],
                },
            ],
        },
        { path: '*', element: <Navigate to="/" replace /> },
    ]);

    return routes;
}