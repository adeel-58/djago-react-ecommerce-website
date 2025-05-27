import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Orders.css';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const accessToken = localStorage.getItem('access_token');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/orders/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setOrders(response.data);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to load orders. Please make sure you are logged in.');
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) {
      fetchOrders();
    } else {
      setError('Access token not found. Please login again.');
      setLoading(false);
    }
  }, [accessToken]);

  if (loading) return <div className="loading">Loading orders...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="orders-page">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p className="no-orders">No orders found.</p>
      ) : (
        <ul className="orders-list">
          {orders.map((order) => (
            <li key={order.id} className="order-card">
              <h3>Order #{order.id}</h3>

              {order.items && order.items.length > 0 && (
                <ul className="order-items">
                  {order.items.map((item, index) => (
                    <li key={index} className="order-item">
                      <span className="product-name">
                        {item.product?.name || 'Unnamed Product'}
                      </span>
                      <span className="quantity">x {item.quantity}</span>
                      <span className="price">${item.price}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="total-amount">
                <strong>Total: ${order.total_price}</strong>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrdersPage;
