// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import Navbar from './Components/Navbar';
import HomePage from './Components/HomePage';
import Footer from './Components/Footer';
import About from './Components/About';
import ProductDetail from './Components/ProductDetail';
import { CartProvider } from './Components/CartContext';
import ProductPage from './Components/ProductPage';
import Contact from './Components/Contact';
import CartPage from './Components/Cart';
import AddMango from './admin/AddNewMango';
import AdminDashboard from './admin/AdminDashboard';
import ViewMangoes from './admin/ViewMangoes';
import ViewContacts from './admin/ViewContacts';
import ViewOrders from './admin/ViewOrders';
import MyLoginForm from './admin/Login';
import CheckoutPage from './OrderCheckout';
import WhatsAppButton from './Components/WhatsAppButton';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute';


const LayoutWrapper = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {/* Only show Navbar and Footer if not on admin routes */}
      {!isAdminRoute && <Navbar />}
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/admin/login" element={<MyLoginForm />} />
        <Route path="/user/order" element={<CheckoutPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        
        {/* Protected Admin Routes */}
        <Route path="/admin/add-mango" element={
          <ProtectedRoute>
            <AddMango />
          </ProtectedRoute>
        } />
        <Route path="/admin/mangoes" element={
          <ProtectedRoute>
            <ViewMangoes />
          </ProtectedRoute>
        } />
        <Route path="/admin/contacts" element={
          <ProtectedRoute>
            <ViewContacts />
          </ProtectedRoute>
        } />
        <Route path="/admin/orders" element={
          <ProtectedRoute>
            <ViewOrders />
          </ProtectedRoute>
        } />
        <Route path="/admin/dashboard" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />
      </Routes>

      {!isAdminRoute && <Footer />}
      
      {/* WhatsApp Button - only show on non-admin routes */}
      {!isAdminRoute && <WhatsAppButton />}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <LayoutWrapper />
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#10B981',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 4000,
                iconTheme: {
                  primary: '#EF4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
