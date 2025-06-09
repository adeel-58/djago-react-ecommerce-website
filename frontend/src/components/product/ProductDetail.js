import React from 'react';
import { Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap';
import { getProductImage, getProductDescription } from '../../utils/productAssets';

const ProductDetail = ({ product }) => {
  const productImage = getProductImage(product.name);
  const description = getProductDescription(product.name);

  return (
    <Row>
      <Col md={6}>
        <Image
          src={productImage}
          alt={product.name || 'Product'}
          fluid
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = getProductImage(); // fallback default image
          }}
        />
      </Col>

      <Col md={3}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h3>{product.name}</h3>
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Price:</strong> ${parseFloat(product.price || 0).toFixed(2)}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Description:</strong> {description}
          </ListGroup.Item>
        </ListGroup>
      </Col>

      <Col md={3}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>Price:</strong> ${parseFloat(product.price || 0).toFixed(2)}
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
