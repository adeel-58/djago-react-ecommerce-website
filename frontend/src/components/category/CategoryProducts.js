import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ProductCard from '../product/ProductCard';

const CategoryProducts = ({ products }) => {
  return (
    <>
      <h3 className="mb-4">Category Products</h3>
      <Row>
        {products.length > 0 ? (
          products.map((product) => (
            <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
              <ProductCard product={product} />
            </Col>
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </Row>
    </>
  );
};

export default CategoryProducts;
