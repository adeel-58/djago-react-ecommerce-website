// src/components/checkout/OrderSummary.js
import React from 'react';
// Removed Card, ListGroup from react-bootstrap
import { useSelector } from 'react-redux';
import '../../styles/CheckoutPage.css'; // Styles will be in CheckoutPage.css

const OrderSummary = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  const totalItems = cartItems.reduce((acc, item) => acc + parseInt(item.qty || 0), 0);
  const subtotalPrice = cartItems
    .reduce((acc, item) => acc + parseFloat(item.price || 0) * parseInt(item.qty || 0), 0)
    .toFixed(2);
  
  // Example: Add shipping cost (this could be dynamic later)
  const shippingCost = cartItems.length > 0 ? 5.00 : 0.00; 
  const taxes = (parseFloat(subtotalPrice) * 0.08).toFixed(2); // Example 8% tax
  const totalPrice = (parseFloat(subtotalPrice) + shippingCost + parseFloat(taxes)).toFixed(2);


  return (
    <div className="order-summary-card">
      <h2 className="section-subtitle">Order Summary</h2>
      
      <div className="summary-items-preview">
        {cartItems.length > 0 ? (
            cartItems.map(item => (
                <div key={item.id} className="summary-item">
                    <img 
                        src={item.image ? `${process.env.REACT_APP_API_URL || 'https://nailova-django-react-website-erfwf0csd9hjaafv.southeastasia-01.azurewebsites.net'}${item.image}` : 'https://placehold.co/60x60/FF6B6B/FFFFFF?text=Item'} 
                        alt={item.name} 
                        className="summary-item-image"
                        onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/60x60/CCCCCC/FFFFFF?text=No+Img'; }}
                    />
                    <div className="summary-item-details">
                        <span className="summary-item-name">{item.name} (x{item.qty})</span>
                        <span className="summary-item-price">${(parseFloat(item.price || 0) * parseInt(item.qty || 0)).toFixed(2)}</span>
                    </div>
                </div>
            ))
        ) : (
            <p className="empty-summary-message">Your cart is empty.</p>
        )}
      </div>

      <div className="summary-calculation">
        <div className="summary-line">
          <span>Subtotal ({totalItems} items)</span>
          <span>${subtotalPrice}</span>
        </div>
        <div className="summary-line">
          <span>Shipping</span>
          <span>${shippingCost.toFixed(2)}</span>
        </div>
        <div className="summary-line">
          <span>Estimated Taxes</span>
          <span>${taxes}</span>
        </div>
        <hr className="summary-divider" />
        <div className="summary-line total-line">
          <span>Order Total</span>
          <span>${totalPrice}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
