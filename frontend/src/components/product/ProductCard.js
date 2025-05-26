import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Card className="h-100">
      <Link to={`/product/${product.id}`}>
        <Card.Img variant="top" src={product.image} />
      </Link>
      <Card.Body className="d-flex flex-column">
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>${product.price}</Card.Text>
        <Link to={`/product/${product.id}`} className="mt-auto">
          <Button variant="outline-dark" className="w-100">
            View Product
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
