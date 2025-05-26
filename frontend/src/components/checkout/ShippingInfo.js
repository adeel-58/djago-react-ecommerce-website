import React from 'react';
import { Form } from 'react-bootstrap';

const ShippingInfo = ({ formData, onChange }) => {
  return (
    <>
      <h4>Shipping Information</h4>
      <Form.Group className="mb-3" controlId="address">
        <Form.Label>Address</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter address"
          name="address"
          value={formData.address}
          onChange={onChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="city">
        <Form.Label>City</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter city"
          name="city"
          value={formData.city}
          onChange={onChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="postalCode">
        <Form.Label>Postal Code</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter postal code"
          name="postalCode"
          value={formData.postalCode}
          onChange={onChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="country">
        <Form.Label>Country</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter country"
          name="country"
          value={formData.country}
          onChange={onChange}
          required
        />
      </Form.Group>
    </>
  );
};

export default ShippingInfo;
