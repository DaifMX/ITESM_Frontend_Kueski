import { lazy } from "react";
import { useRoutes, Navigate, Route, Outlet } from "react-router-dom";

import AdminLayout from "../layout/Admin/AdminLayout";
import StoreLayout from "../layout/StoreLayout";

import RequireAuth from "./components/RequieresAuth";
import PersistLogin from "./components/PersistLogin";

export const ProductView = lazy(() => import('../views/Admin/Products'));
export const UserView = lazy(() => import('../views/Admin/Users'));
export const OrderView = lazy(() => import('../views/Admin/Orders'));

export const CartView = lazy(() => import('../views/Cart/CartView'));
export const LoginView = lazy(() => import('../views/Auth/Login/LoginView'));
export const RegisterView = lazy(() => import('../views/Auth/Register/RegisterView'));
export const ProductDetailView = lazy(() => import('../views/Product/ProductDetailView'));
export const ProductListView = lazy(() => import('../views/Product/ProductListView'));

export default function AppRoutes() {
    const routes = useRoutes([
        { path: '/register', element: <RegisterView /> },
        { path: '/login', element: <LoginView /> },
        {
            element: <StoreLayout />,
            children: [
                { index: true, element: <ProductListView /> },
                { path: 'product/:productId', element: <ProductDetailView /> },
                { path: 'category/:categoryId', element: <ProductListView /> },
                {
                    element: <PersistLogin />,
                    children: [
                        {
                            element: <RequireAuth allowedRoles={['USER', 'ADMIN']} />,
                            children: [
                                {
                                    path: 'cart',
                                    element: <CartView />
                                }
                            ]
                        },
                    ],
                },
                { path: '*', element: <h1>Error: 404</h1> },
            ],
        },

        // Admin section:
        {
            
            element: <PersistLogin />,
            children: [
                {
                    path: '/admin',
                    element: <AdminLayout />,
                    children: [
                        // Users route (protected)
                        {
                            element: <RequireAuth allowedRoles={['ADMIN']} />,
                            children: [
                                {
                                    path: 'users',
                                    element: <UserView />

                                }
                            ],
                        },
                        // Products route (protected)
                        {
                            element: <RequireAuth allowedRoles={['ADMIN']} />,
                            children: [
                                {
                                    path: 'products',
                                    element: <ProductView />

                                }
                            ],
                        },
                        // Orders route (protected)
                        {
                            element: <RequireAuth allowedRoles={['ADMIN']} />,
                            children: [
                                {
                                    path: 'orders',
                                    element: <OrderView />

                                }
                            ],
                        },
                        // Admin fallback route (protected)
                        {
                            element: <RequireAuth allowedRoles={['ADMIN']} />,
                            children: [
                                {
                                    path: '*',
                                    element: <Navigate to="/admin/users" replace />
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