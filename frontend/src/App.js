import React, { useState, useEffect } from 'react';
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
import NotFoundPage from './pages/NotFoundPage';
import Dashboard from './components/account/Dashboard';
import Orders from './components/account/Orders';
import Addresses from './components/account/Addresses';
import AccountDetails from './components/account/AccountDetails';
import ProductDetailPage from './pages/ProductPage';

// Import the new FlowerLoader component
import FlowerLoader from './components/common/FlowerLoader'; 

const App = () => {
  const [showFlowerLoader, setShowFlowerLoader] = useState(false);

  useEffect(() => {
    // Function to handle clicks on any button
    const handleButtonClick = (event) => {
      // Check if the clicked element or any of its parents is a button
      // You might need to adjust this condition based on your specific button elements
      const isButton = event.target.closest('button') || event.target.closest('a.btn');
      
      if (isButton) {
        setShowFlowerLoader(true);

        // Hide the flower loader after 1.4 seconds
        const timer = setTimeout(() => {
          setShowFlowerLoader(false);
        }, 1400); // 1400 milliseconds = 1.4 seconds

        // Clear the timeout if the component unmounts or the effect re-runs
        return () => clearTimeout(timer);
      }
    };

    // Add event listener to the document body
    document.body.addEventListener('click', handleButtonClick);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      document.body.removeEventListener('click', handleButtonClick);
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

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
      {/* Render the FlowerLoader component */}
      <FlowerLoader isVisible={showFlowerLoader} />
    </Router>
  );
};

export default App;
