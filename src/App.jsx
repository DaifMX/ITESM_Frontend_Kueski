import './App.css'

import { BrowserRouter } from "react-router-dom";

import { CartProvider } from './context/CartContext';

import AppRoutes from './routes/sections';

import { CssBaseline } from '@mui/material';
import darkTheme from './themes/darkTheme';
import { ThemeProvider } from '@emotion/react';

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <CartProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </CartProvider>
    </ThemeProvider>
  );
};

export default App;