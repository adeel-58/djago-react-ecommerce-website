// src/pages/CartPage.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart, // Assuming this action updates quantity or adds new if not present
  clearCart,
  // You'll likely need removeFromCart and updateQuantity actions here too
} from '../redux/slices/cartSlice';
import CartItemCard from '../components/cart/CartItemCard'; // Assuming this path
import '../styles/CartPage.css'; // Styles for CartPage

const backendBaseURL = 'http://127.0.0.1:8000';

const CartPage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { isAuthenticated, access_token } = useSelector((state) => state.auth); // Assuming auth state has token

  useEffect(() => {
    const fetchCart = async () => {
      // Use token from Redux store if available, otherwise try localStorage (though store is better)
      const token = access_token || localStorage.getItem('access_token'); 
      
      if (!isAuthenticated || !token) { // Check for authentication status
        // If not authenticated, rely on local Redux cart state.
        // Optionally, you could clear the Redux cart if it's meant to be synced only for logged-in users.
        // For now, we assume the local Redux cart is the source of truth for guests.
        setLoading(false);
        return;
      }

      try {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.get(`${backendBaseURL}/api/cart/`, config);
        
        // Clear local cart and repopulate with fetched cart from backend
        dispatch(clearCart()); 
        response.data.forEach((item) => {
          dispatch(
            addToCart({ // This should ideally be a 'setCart' or 'initializeCart' action
              id: item.product.id,
              name: item.product.name,
              image: item.product.image,
              price: item.product.price,
              qty: item.quantity,
              // Ensure your addToCart can handle setting an item with a specific quantity
              // or you might need a different action like 'loadCartItem'
            })
          );
        });
      } catch (error) {
        console.error('Error fetching cart:', error.response?.data || error.message);
        // If fetching fails for an authenticated user, decide on behavior:
        // - Show an error and rely on local Redux cart (if any)?
        // - Clear local Redux cart to signify sync failure?
        // For now, we'll just log the error and the existing local cart (if any) will be shown.
        // dispatch(clearCart()); // Optionally clear if backend sync is mandatory
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [dispatch, isAuthenticated, access_token]);

  const getTotalAmount = () =>
    cartItems.reduce((total, item) => total + parseFloat(item.price || 0) * parseInt(item.qty || 0), 0).toFixed(2);

  return (
    <div className="cart-page-container">
      <h1 className="page-title">Your Shopping Cart</h1>

      {loading ? (
        <div className="loading-spinner-container">
          <p>Loading your cart...</p> {/* Replace with actual spinner component if you have one */}
        </div>
      ) : cartItems.length === 0 ? (
        <div className="empty-cart-message">
          <p>Your cart is currently empty. Time to find some pet-tastic goodies!</p>
          <Link to="/products" className="btn btn-primary">Start Shopping</Link> {/* Use consistent button class */}
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items-list">
            {cartItems.map((item) => (
              <CartItemCard key={item.id} item={item} />
            ))}
          </div>

          <div className="cart-summary-section">
            <h2 className="summary-title">Order Summary</h2>
            <div className="summary-details">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${getTotalAmount()}</span>
              </div>
              {/* You can add rows for Shipping, Taxes etc. here later */}
              <div className="summary-row total-row">
                <span>Total</span>
                <span>${getTotalAmount()}</span>
              </div>
            </div>
            <Link to="/checkout" className="btn btn-primary btn-checkout w-100">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
