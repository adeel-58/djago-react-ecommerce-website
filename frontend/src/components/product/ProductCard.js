import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/ProductCard.css';
import { getProductImage, getProductDescription } from '../../utils/productAssets';

const ProductCard = ({ product }) => {
  const productImage = getProductImage(product.name);
  const description = getProductDescription(product.name);

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-card-link">
        <div className="product-image-container">
          <img
            src={productImage}
            alt={product.name || 'Product image'}
            className="product-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = getProductImage(); // fallback to default image
            }}
          />
        </div>
        <div className="product-info">
          <h4 className="product-name">{product.name || 'Unnamed Product'}</h4>
          <p className="product-description">{description}</p>
          <p className="product-price">
            ${product.price ? parseFloat(product.price).toFixed(2) : '0.00'}
          </p>
        </div>
      </Link>
      <div className="product-actions">
        <Link to={`/product/${product.id}`} className="btn btn-outline product-view-button">
          View Product
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
