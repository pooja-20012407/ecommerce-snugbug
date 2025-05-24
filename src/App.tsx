import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from './components/Login/LoginPage';
import RegisterPage from './components/Login/RegisterPage';
import Home from './components/Home/Home';
import CategoryPage from './components/Home/CategoryPage'; 
import SearchResults from './components/Home/SearchResults';
import ProtectedRoute from './components/ProtectedRoute';
import { Toaster } from 'react-hot-toast';
import CartPage from './components/Home/CartPage';
import PlaceOrderPage from './components/Home/PlaceOrderPage';
import MyOrders from './components/Home/MyOrders';




function App() {
  return (
    <>
    <Toaster position="top-center" reverseOrder={false} />

    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/MyOrders" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
      <Route path="/products/:category" element={<ProtectedRoute><CategoryPage /></ProtectedRoute>} />
      <Route path="/search" element={<ProtectedRoute><SearchResults /></ProtectedRoute>} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/placeorder" element={ <ProtectedRoute blockSellerOnPaths={['/placeorder']}><PlaceOrderPage /></ProtectedRoute>} />
      <Route path="/not-allowed" element={<h2 className="text-center text-red-500 mt-10">Access Denied: Sellers cannot place orders.</h2>} />
    </Routes>
    </>
  );

 
  
}

export default App;
