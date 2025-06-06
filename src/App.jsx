import './App.css'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { BrowserRouter } from "react-router-dom";

import { CartProvider } from './context/CartContext';

import AppRoutes from './routes/sections';

import { CssBaseline } from '@mui/material';
import darkTheme from './themes/darkTheme';
import { ThemeProvider } from '@emotion/react';

function App() {
  return (
    <AuthContextProvider>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <CartProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </CartProvider>
      </ThemeProvider>
    </AuthContextProvider >

  );
};

export default App;