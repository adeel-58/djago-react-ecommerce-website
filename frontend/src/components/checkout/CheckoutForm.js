// src/components/checkout/CheckoutForm.js
import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const CheckoutForm = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  return (
    <Form>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Full Name</Form.Label>
            <Form.Control name="name" value={formData.name} onChange={handleChange} required />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control name="phone" value={formData.phone} onChange={handleChange} required />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Address</Form.Label>
        <Form.Control name="address" value={formData.address} onChange={handleChange} required />
      </Form.Group>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>City</Form.Label>
            <Form.Control name="city" value={formData.city} onChange={handleChange} required />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Zip Code</Form.Label>
            <Form.Control name="zip" value={formData.zip} onChange={handleChange} required />
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};

export default CheckoutForm;
