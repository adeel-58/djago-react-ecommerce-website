import React from 'react';
import { Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap';

const ProductDetail = ({ product }) => {
  return (
    <Row>
      <Col md={6}>
        <Image src={product.image} alt={product.name} fluid />
      </Col>

      <Col md={3}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h3>{product.name}</h3>
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Price:</strong> ${product.price}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Description:</strong> {product.description}
          </ListGroup.Item>
        </ListGroup>
      </Col>

      <Col md={3}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>Price:</strong> ${product.price}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Status:</strong> {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                className="w-100"
                type="button"
                disabled={product.countInStock === 0}
              >
                Add to Cart
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default ProductDetail;
