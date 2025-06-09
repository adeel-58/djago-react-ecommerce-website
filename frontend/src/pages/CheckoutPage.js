// src/pages/CheckoutPage.js
import React, { useState } from 'react';
// Removed Row, Col, Form, Button from react-bootstrap to use custom styles
import ShippingInfo from '../components/checkout/ShippingInfo';
import OrderSummary from '../components/checkout/OrderSummary';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'; // Added useDispatch
import { clearCart } from '../redux/slices/cartSlice'; // To clear cart after order
import '../styles/CheckoutPage.css'; // Styles for CheckoutPage

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);


  const cartItems = useSelector((state) => state.cart.cartItems);
  const { access_token } = useSelector((state) => state.auth); // Get token from auth state
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize dispatch

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (cartItems.length === 0) {
      alert('Your cart is empty. Please add items before checking out.');
      setIsSubmitting(false);
      navigate('/products'); // Redirect to products page
      return;
    }
    
    const token = access_token || localStorage.getItem('access_token'); // Prefer token from Redux

    if (!token) {
        alert('You must be logged in to place an order.');
        setIsSubmitting(false);
        navigate('/login'); // Redirect to login
        return;
    }


    try {
      const payload = {
        total_price: cartItems.reduce((acc, item) => acc + parseFloat(item.price || 0) * parseInt(item.qty || 0), 0).toFixed(2),
        shipping_address: `${formData.address}, ${formData.city}, ${formData.postalCode}, ${formData.country}`,
        items: cartItems.map(item => ({
          product: item.id,
          quantity: item.qty,
          price: parseFloat(item.price || 0).toFixed(2),
        })),
      };

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(`${API_URL}/api/orders/`, payload, config);

      console.log('Order placed:', data);
      dispatch(clearCart()); // Clear the cart from Redux state
      // Optionally, clear cart from backend if your API requires it separately
      navigate(`/order-confirmation/${data.id || ''}`); // Navigate to order confirmation with order ID

    } catch (err) {
      console.error('Failed to place order', err.response?.data || err.message);
      setError(err.response?.data?.detail || 'Failed to place order. Please check your details and try again.');
      // alert('Failed to place order. Please try again.'); // Replaced by error message display
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="checkout-page-container">
      <h1 className="page-title">Checkout</h1>
      <form onSubmit={submitHandler} className="checkout-form-layout">
        <div className="shipping-info-column">
          <ShippingInfo formData={formData} onChange={handleInputChange} />
           {error && <p className="error-message">{error}</p>}
          <button type="submit" className="btn btn-primary btn-submit-order" disabled={isSubmitting}>
            {isSubmitting ? 'Placing Order...' : 'Place Order & Pay'}
          </button>
        </div>
        <div className="order-summary-column">
          <OrderSummary />
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
