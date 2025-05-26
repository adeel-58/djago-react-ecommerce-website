// src/components/product/SearchResults.js
import React from 'react';
import ProductCard from './ProductCard';
import { Row, Col } from 'react-bootstrap';

const SearchResults = ({ products }) => {
  return (
    <div>
      <h3 className="mb-4">Search Results</h3>
      {products?.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product.id} sm={12} md={6} lg={4}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default SearchResults;
