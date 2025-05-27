import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import ShippingInfo from '../components/checkout/ShippingInfo';
import OrderSummary from '../components/checkout/OrderSummary';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const cartItems = useSelector((state) => state.cart.cartItems); // get cart items from Redux store
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      // Construct payload for order creation API
      const payload = {
        total_price: cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2),
        shipping_address: `${formData.address}, ${formData.city}, ${formData.postalCode}, ${formData.country}`,
        items: cartItems.map(item => ({
          product: item.id,      // Make sure your cartItems have product id
          quantity: item.qty,
          price: item.price,
        })),
      };

      // Send POST request to backend order API
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`, // or your auth header logic
        },
      };

      const { data } = await axios.post(`${API_URL}/api/orders/`, payload, config);

      console.log('Order placed:', data);
      navigate('/order-confirmation'); // or homepage

    } catch (error) {
      console.error('Failed to place order', error.response?.data || error.message);
      alert('Failed to place order. Please try again.');
    }
  };

  return (
    <Row>
      <Col md={8}>
        <Form onSubmit={submitHandler}>
          <ShippingInfo formData={formData} onChange={handleInputChange} />
          <Button type="submit" className="mt-3">
            Continue
          </Button>
        </Form>
      </Col>

      <Col md={4}>
        <OrderSummary />
      </Col>
    </Row>
  );
};

export default CheckoutPage;
