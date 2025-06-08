import { lazy } from "react";
import { useRoutes, Navigate } from "react-router";

import AdminLayout from "../layout/Admin/AdminLayout";
import StoreLayout from "../layout/StoreLayout";

import RequireAuth from "./components/RequieresAuth";
import PersistLogin from "./components/PersistLogin";

export const HomeView = lazy(() => import('../views/Admin/Home/Home'));
export const ProductView = lazy(() => import('../views/Admin/Products/Products'));
export const UserView = lazy(() => import('../views/Admin/Users/Users'));
export const OrderView = lazy(() => import('../views/Admin/Orders/Orders'));

export const CartView = lazy(() => import('../views/Shop/Cart/CartView'));
export const LoginView = lazy(() => import('../views/Auth/Login/LoginView'));
export const RegisterView = lazy(() => import('../views/Auth/Register/RegisterView'));
export const ProductDetailView = lazy(() => import('../views/Shop/Product/ProductDetailView'));
export const ProductListView = lazy(() => import('../views/Shop/Product/ProductListView'));
export const ProductCartView = lazy(() => import('../views/Shop/Product/ProductCartView'));



export default function AppRoutes() {
    const routes = useRoutes([
        { path: '/register', element: <RegisterView /> },
        { path: '/login', element: <LoginView /> },
        { path: '/test', element: <ProductCartView /> },
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
                        
                        // Home route (protected)
                        {
                            element: <RequireAuth allowedRoles={['ADMIN']} />,
                            children: [
                                {
                                    path: 'home',
                                    element: <HomeView />

                                }
                            ],
                        },
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