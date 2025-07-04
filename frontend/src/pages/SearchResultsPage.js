import React from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/product/ProductCard';
import { Row, Col } from 'react-bootstrap';
import './SearchResultsPage.css';
const useQuery = () => new URLSearchParams(useLocation().search);

const SearchResultsPage = () => {
  const query = useQuery();
  const searchTerm = query.get('q');

  const dummyProducts = [
    { id: '1', name: 'Gel Polish', image: '/images/polish.jpg', price: 10.99 },
    { id: '2', name: 'Top Coat Matte', image: '/images/topcoat.jpg', price: 8.5 },
    { id: '3', name: 'Nail File', image: '/images/file.jpg', price: 3.99 },
  ];

  const results = dummyProducts.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h3>Search Results for "{searchTerm}"</h3>
      <Row>
        {results.length > 0 ? (
          results.map((product) => (
            <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
              <ProductCard product={product} />
            </Col>
          ))
        ) : (
          <p>No matching products found.</p>
        )}
      </Row>
    </div>
  );
};

export default SearchResultsPage;
