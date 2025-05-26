import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import ShippingInfo from '../components/checkout/ShippingInfo';
import OrderSummary from '../components/checkout/OrderSummary';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const cartItems = [
    { id: '1', name: 'Nail Polish', price: 12.99, qty: 2 },
    { id: '2', name: 'Stickers', price: 7.49, qty: 1 },
  ];

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('Order Placed:', formData);
    navigate('/'); // In real app, proceed to payment or confirmation
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
        <OrderSummary items={cartItems} />
      </Col>
    </Row>
  );
};

export default CheckoutPage;
