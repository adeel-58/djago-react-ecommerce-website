import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { getProductImage, getProductDescription } from '../../utils/productAssets';
import defaultImage from '../../assets/images/default.jpg';
import '../../styles/ProductCard.css';
const ProductCard = ({ product }) => {
  // Ensure product.name is defined before passing to utility functions
  const productName = product.name || 'Unknown Product';
  const image = getProductImage(productName);
  const description = getProductDescription(productName);

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        {/* Make the image itself clickable */}
        <Link to={`/product/${product.id}`}>
          <img
            src={image || defaultImage} // Fallback to defaultImage if getProductImage returns nothing
            alt={productName}
            className="product-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = defaultImage;
            }}
          />
        </Link>
      </div>
      {/* Group product info for better layout control */}
      <div className="product-info">
          <h3 className="product-name">{productName}</h3>
          {/* Display description if available, otherwise a default message */}
          <p className="product-description">
            {description || 'No description available.'}
          </p>
          {/* Ensure price is a number and formatted correctly */}
          <p className="product-price">${parseFloat(product.price || 0).toFixed(2)}</p>
      </div>


      {/* Add the View Product Button */}
      {product.id && ( // Only show button if product has an ID for navigation
        <div className="product-actions">
          <Link to={`/product/${product.id}`} className="btn btn-primary product-view-button">
            View Product
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProductCard;