import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart, addToCart } from '../redux/slices/cartSlice';
const backendBaseURL = 'http://localhost:8000';

const CartPage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem('access_token');

      if (!token) {
        dispatch(clearCart());  // If not logged in, clear cart
        setLoading(false);
        return;
      }

      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get('http://127.0.0.1:8000/api/cart/', config);

        // Clear existing cart and add fetched items
        dispatch(clearCart());
        response.data.forEach(item => {
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
        console.error('Error fetching cart:', error);
        dispatch(clearCart());  // Optional: clear cart on error
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [dispatch]);

  // Optional: show cart items from Redux
  const cartItems = useSelector((state) => state.cart.cartItems);

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
            <div key={item.id} className="cart-item">
              <img src={`${backendBaseURL}${item.image}`} alt={item.name} width="80" />
              <div>
                <h4>{item.name}</h4>
                <p>Qty: {item.qty}</p>
                <p>Price: ${item.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartPage;
