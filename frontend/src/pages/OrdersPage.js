// src/pages/OrdersPage.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    console.log("Access Token:", accessToken);

    if (!accessToken) {
      setError('You must be logged in to view orders.');
      setLoading(false);
      return;
    }

    axios.get('http://localhost:8000/api/orders/', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
      setOrders(response.data);
      setLoading(false);
    })
    .catch((err) => {
      console.error("API Error:", err);
      setError('Failed to load orders. Check your token or server.');
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id} style={{ marginBottom: '1rem' }}>
              <strong>Order #{order.id}</strong> <br />
              <span>Status: {order.status}</span> <br />
              <span>Total: ${order.total_price}</span> <br />
              <span>Date: {new Date(order.created_at).toLocaleDateString()}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrdersPage;
