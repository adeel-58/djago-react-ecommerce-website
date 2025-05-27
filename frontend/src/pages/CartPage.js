// src/pages/CartPage.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  clearCart,
} from '../redux/slices/cartSlice';
import CartItemCard from '../components/cart/CartItemCard';

const backendBaseURL = 'http://localhost:8000';

const CartPage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        dispatch(clearCart());
        setLoading(false);
        return;
      }

      try {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.get(`${backendBaseURL}/api/cart/`, config);
        dispatch(clearCart());
        response.data.forEach((item) => {
          dispatch(
            addToCart({
              id: item.product.id,
              name: item.product.name,
              image: item.product.image,
              price: item.product.price,
              qty: item.quantity,
            })
          );
        });
      } catch (error) {
        console.error('Error fetching cart:', error.response?.data || error.message);
        dispatch(clearCart());
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [dispatch]);

  const getTotalAmount = () =>
    cartItems.reduce((total, item) => total + item.price * item.qty, 0).toFixed(2);

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      {loading ? (
        <p>Loading...</p>
      ) : cartItems.length === 0 ? (
        <p>Your cart is empty. <Link to="/shop">Go Shopping</Link></p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <CartItemCard key={item.id} item={item} />
          ))}

          <div className="cart-summary" style={{ marginTop: '30px', borderTop: '1px solid #ccc', paddingTop: '20px' }}>
            <h3>Total: ${getTotalAmount()}</h3>
            <Link to="/checkout">
              <button style={{ padding: '10px 20px', backgroundColor: '#333', color: '#fff' }}>
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
