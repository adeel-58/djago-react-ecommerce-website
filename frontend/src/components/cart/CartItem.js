import React from 'react';
import { Row, Col, Image, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CartItem = ({ item, onQtyChange, onRemove }) => {
  return (
    <Row className="align-items-center mb-3 border-bottom pb-3">
      <Col md={2}>
        <Image src={item.image} alt={item.name} fluid rounded />
      </Col>

      <Col md={4}>
        <Link to={`/product/${item.id}`} className="text-decoration-none">
          {item.name}
        </Link>
      </Col>

      <Col md={2}>${item.price}</Col>

      <Col md={2}>
        <Form.Control
          as="select"
          value={item.qty}
          onChange={(e) => onQtyChange(item.id, Number(e.target.value))}
        >
          {[...Array(item.countInStock).keys()].map((x) => (
            <option key={x + 1} value={x + 1}>
              {x + 1}
            </option>
          ))}
        </Form.Control>
      </Col>

      <Col md={2}>
        <Button
          type="button"
          variant="light"
          onClick={() => onRemove(item.id)}
        >
          <i className="fas fa-trash text-danger"></i>
        </Button>
      </Col>
    </Row>
  );
};

export default CartItem;
