import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppNavbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Register from './components/auth/Register';

import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CheckoutPage from './pages/CheckoutPage';
import CategoryPage from './pages/CategoryPage';
import SearchResultsPage from './pages/SearchResultsPage';
//import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import Dashboard from './components/account/Dashboard';
import Orders from './components/account/Orders';
import Addresses from './components/account/Addresses';
import AccountDetails from './components/account/AccountDetails';
//import CategoryProductsPage from './pages/CategoryPage';
import ProductDetailPage from './pages/ProductPage';
//import OrdersPage from './pages/OrdersPage';


const App = () => {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <AppNavbar />
        <main className="flex-grow-1 py-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/account/dashboard" element={<Dashboard />} />
            <Route path="/account/orders" element={<Orders />} />
            <Route path="/account/addresses" element={<Addresses />} />
            <Route path="/account/details" element={<AccountDetails />} />
            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            
            

            
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
