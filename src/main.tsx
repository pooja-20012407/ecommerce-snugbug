// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';  // <-- Import Tailwind's CSS here
import { SearchProvider } from './components/context/SearchContext';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './components/context/CartContext';




ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <SearchProvider>
        <CartProvider>
        <App />
        </CartProvider>
      </SearchProvider>
    </BrowserRouter>
  </React.StrictMode>
);

