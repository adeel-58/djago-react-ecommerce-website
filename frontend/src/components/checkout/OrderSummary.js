import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const OrderSummary = () => {
  // Get cart items from Redux store
  const cartItems = useSelector((state) => state.cart.cartItems);

  // Calculate total quantity and price
  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2);

  return (
    <Card>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <h4>Order Summary</h4>
        </ListGroup.Item>
        <ListGroup.Item>Items: {totalItems}</ListGroup.Item>
        <ListGroup.Item>Total Price: ${totalPrice}</ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default OrderSummary;
