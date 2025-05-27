// src/components/cart/CartItemCard.js
import React from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import {
  removeFromCart,
  updateCartItemQuantity,
} from '../../redux/slices/cartSlice';

const backendBaseURL = 'http://localhost:8000';

const CartItemCard = ({ item }) => {
  const dispatch = useDispatch();

  const token = localStorage.getItem('access_token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const handleRemove = async () => {
    if (!token) return;

    try {
      await axios.delete(`${backendBaseURL}/api/cart/remove/${item.id}/`, config);
      dispatch(removeFromCart(item.id));
    } catch (error) {
      console.error('Error removing item:', error.response?.data || error.message);
    }
  };

  const handleQuantityChange = (newQty) => {
  if (newQty < 1 || !token) return;

  // Use the thunk instead of axios
    dispatch(updateCartItemQuantity({ id: item.id, qty: newQty }));
    };

  return (
    <div className="cart-item" style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
      <img src={`${backendBaseURL}${item.image}`} alt={item.name} width="80" />
      <div style={{ marginLeft: '20px' }}>
        <h4>{item.name}</h4>
        <p>Price: ${item.price}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button onClick={() => handleQuantityChange(item.qty - 1)}>-</button>
          <span>{item.qty}</span>
          <button onClick={() => handleQuantityChange(item.qty + 1)}>+</button>
        </div>
        <button onClick={handleRemove} style={{ marginTop: '10px', color: 'red' }}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItemCard;
