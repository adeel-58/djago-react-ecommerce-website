// src/components/product/ProductCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/ProductCard.css'; // Styles for ProductCard

const ProductCard = ({ product }) => {
  // Fallback image if product.image is missing
  const productImage = product.image || 'https://placehold.co/600x400/FF6B6B/FFFFFF?text=Pet+Product';

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-card-link">
        <div className="product-image-container">
          <img 
            src={productImage} 
            alt={product.name || 'Product image'} 
            className="product-image"
            onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/CCCCCC/FFFFFF?text=Image+Not+Found'; }}
          />
        </div>
        <div className="product-info">
          <h4 className="product-name">{product.name || 'Unnamed Product'}</h4>
          <p className="product-price">${product.price ? parseFloat(product.price).toFixed(2) : '0.00'}</p>
        </div>
      </Link>
      <div className="product-actions">
        <Link to={`/product/${product.id}`} className="btn btn-outline product-view-button">
          View Product
        </Link>
        {/* You could add an "Add to Cart" button here later */}
        {/* <button className="btn btn-primary product-cart-button">Add to Cart</button> */}
      </div>
    </div>
  );
};

export default ProductCard;
