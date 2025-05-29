// src/components/checkout/ShippingInfo.js
import React from 'react';
// Removed Form from react-bootstrap
import '../../styles/CheckoutPage.css'; // Styles will be in CheckoutPage.css

const ShippingInfo = ({ formData, onChange }) => {
  return (
    <div className="shipping-info-section">
      <h2 className="section-subtitle">Shipping Information</h2>
      
      <div className="form-group">
        <label htmlFor="address" className="form-label">Address</label>
        <input
          type="text"
          className="form-control"
          id="address"
          placeholder="e.g., 123 Pet Lane"
          name="address"
          value={formData.address}
          onChange={onChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="city" className="form-label">City</label>
        <input
          type="text"
          className="form-control"
          id="city"
          placeholder="e.g., Pawtown"
          name="city"
          value={formData.city}
          onChange={onChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="postalCode" className="form-label">Postal Code</label>
        <input
          type="text"
          className="form-control"
          id="postalCode"
          placeholder="e.g., 12345"
          name="postalCode"
          value={formData.postalCode}
          onChange={onChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="country" className="form-label">Country</label>
        <input
          type="text"
          className="form-control"
          id="country"
          placeholder="e.g., United Petdom"
          name="country"
          value={formData.country}
          onChange={onChange}
          required
        />
      </div>
      {/* You can add more fields like Apartment, Suite, etc. here */}
    </div>
  );
};

export default ShippingInfo;
