// src/components/cart/CartItemCard.js
import React from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios'; // Keep for direct delete if not using thunk for delete
import {
  removeFromCart, // This should be the action for Redux state
  updateCartItemQuantity, // This is your thunk for backend + Redux
} from '../../redux/slices/cartSlice';
import '../../styles/CartItemCard.css'; // Import the CSS file
import { getProductImage } from '../../utils/productAssets';
const backendBaseURL = 'https://nailova-django-react-website-erfwf0csd9hjaafv.southeastasia-01.azurewebsites.net';

const CartItemCard = ({ item }) => {
  const dispatch = useDispatch();

  // Token should ideally be retrieved from Redux store if user is authenticated
  const token = localStorage.getItem('access_token');

  const config = { // Define config once if token is available
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const handleRemove = async () => {
    if (!token) { // Or check authentication status from Redux
      console.warn("No token found, cannot remove item from backend.");
      // Optionally dispatch removeFromCart(item.id) to remove from local Redux state anyway for guests
      // dispatch(removeFromCart(item.id)); 
      return;
    }

    try {
      await axios.delete(`${backendBaseURL}/api/cart/remove/${item.id}/`, config);
      dispatch(removeFromCart(item.id)); // Update Redux state after successful backend removal
    } catch (error) {
      console.error('Error removing item from backend:', error.response?.data || error.message);
      // Optionally, still remove from local Redux state or show an error to the user
      // dispatch(removeFromCart(item.id)); 
    }
  };

  const handleQuantityChange = (newQty) => {
    if (newQty < 1) return; // Prevent quantity from going below 1

    // If user is not authenticated, you might want to update only local Redux state
    // without trying to call the backend.
    // For now, assuming `updateCartItemQuantity` thunk handles auth check or token presence.
    if (!token) {
      console.warn("No token, attempting local quantity update (if your thunk/slice supports it)");
      // Example for local-only update (you'd need a different action or logic in slice)
      // dispatch(localUpdateCartItemQuantity({ id: item.id, qty: newQty }));
      // For now, the thunk will likely fail or do nothing if no token.
    }

    dispatch(updateCartItemQuantity({ id: item.id, qty: newQty }));
  };



  const productImage = getProductImage(item.name);


  return (
    <div className="cart-item">
      <img
        src={productImage}
        alt={item.name || 'Product'}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = getProductImage(); // fallback to default image
        }}
      />

      <div className="cart-item-details-container">
        <h4>{item.name || 'Product Name'}</h4>
        <p className="item-price">Price: ${parseFloat(item.price || 0).toFixed(2)}</p>
        <div className="cart-item-quantity-controls">
          <button onClick={() => handleQuantityChange(item.qty - 1)} disabled={item.qty <= 1}>-</button>
          <span>{item.qty || 0}</span>
          <button onClick={() => handleQuantityChange(item.qty + 1)}>+</button>
        </div>
        <button onClick={handleRemove} className="cart-item-remove-action">
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItemCard;
