import './App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from './components/Layout/Layout'
import CartView from './components/Navbar/Cart/CartView'
import ProductListView from './components/Product/ProductListView';
import ProductDetailView from './components/Product/ProductDetailView'

import LoginView from './components/Auth/Login/LoginView'
import RegisterView from './components/Auth/Register/RegisterView'

import { CssBaseline } from '@mui/material';
import darkTheme from './themes/darkTheme';
import { ThemeProvider } from '@emotion/react';
import { CartProvider } from './context/CartContext';


function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="register" element={<RegisterView />} />
            <Route path="login" element={<LoginView />} />
            <Route element={<MainLayout />}>
              <Route index element={<ProductListView />} />
              <Route path="product/:productId" element={<ProductDetailView />} />
              <Route path="category/:categoryId" element={<ProductListView />} />
              <Route path="cart" element={<CartView />} />
              <Route path="*" element={<h1>Error: 404</h1>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </ThemeProvider>
  );
};

export default App;