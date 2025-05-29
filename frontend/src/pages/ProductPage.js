// src/pages/ProductDetailPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Added useNavigate
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { updateCart } from '../redux/slices/cartSlice';
import '../styles/ProductDetailPage.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// Helper function to check if a URL is absolute
function isAbsoluteURL(url) {
  if (typeof url !== 'string') return false;
  return /^(?:[a-z]+:)?\/\//i.test(url);
}

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate
  const [product, setProduct] = useState(null);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const { access_token, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoadingProduct(true);
      setMessage({ text: '', type: '' });
      try {
        const res = await axios.get(`${API_URL}/api/products/${id}/`);
        setProduct(res.data);
      } catch (error) {
        console.error('Failed to load product:', error);
        setMessage({ text: 'Failed to load product details. Please try again.', type: 'error' });
      } finally {
        setLoadingProduct(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;
    
    const userToken = access_token || localStorage.getItem('access_token');

    if (!isAuthenticated || !userToken) {
      setMessage({ text: 'Please log in to add items to your cart.', type: 'error' });
      setTimeout(() => {
        setMessage({ text: '', type: '' }); // Clear message before navigating
        navigate('/login'); // Redirect to login page
      }, 2000);
      return;
    }

    setAddingToCart(true);
    setMessage({ text: '', type: '' });

    try {
      const config = {
        headers: { Authorization: `Bearer ${userToken}` },
      };
      const response = await axios.post(
        `${API_URL}/api/cart/add/`,
        {
          product_id: product.id,
          quantity: 1,
        },
        config
      );

      dispatch(updateCart(response.data.cart || response.data));
      
      setMessage({ text: `${product.name} added to cart!`, type: 'success' });
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);

    } catch (error) {
      console.error('Add to cart failed:', error.response?.data || error.message);
      const errorMessage = error.response?.data?.detail || error.response?.data?.message || 'Failed to add item to cart. Please try again.';
      setMessage({ text: errorMessage, type: 'error' });
      setTimeout(() => setMessage({ text: '', type: '' }), 5000);
    } finally {
      setAddingToCart(false);
    }
  };
  
  let productImage = 'https://placehold.co/600x600/FF6B6B/FFFFFF?text=Pet+Product'; // Default placeholder
  if (product?.image) {
    if (isAbsoluteURL(product.image)) {
      productImage = product.image;
    } else {
      // Ensure no double slashes if product.image starts with '/' and API_URL ends without one
      const baseUrl = API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL;
      const imagePath = product.image.startsWith('/') ? product.image : `/${product.image}`;
      productImage = `${baseUrl}${imagePath}`;
    }
  }
  // For debugging image URLs:
  // if (product) {
  //   console.log("Original product.image:", product.image);
  //   console.log("Constructed productImage URL:", productImage);
  // }


  if (loadingProduct) {
    return (
        <div className="product-detail-page-container loading-container"> {/* Changed class to match CSS */}
            <p>Loading product details...</p>
        </div>
    );
  }

  if (!product && !loadingProduct) {
    return (
        <div className="product-detail-page-container error-container"> {/* Changed class to match CSS */}
            <p>Sorry, we couldn't find the product you're looking for.</p>
        </div>
    );
  }
  
  if (!product) return null; 


  return (
    <div className="product-detail-page-container">
      <div className="product-detail-card">
        <div className="product-detail-image-column">
          <img 
            src={productImage} 
            alt={product.name} 
            className="product-main-image"
            onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x600/CCCCCC/FFFFFF?text=Image+Not+Found'; }}
          />
        </div>

        <div className="product-detail-info-column">
          <h1 className="product-title">{product.name}</h1>
          {product.category?.name && (
            <p className="product-category">
              Category: <span>{product.category.name}</span>
            </p>
          )}
          <p className="product-price">${parseFloat(product.price || 0).toFixed(2)}</p>
          
          {message.text && (
            <div className={`product-message message-${message.type} ${message.text ? 'visible' : ''}`}>
              {message.text}
            </div>
          )}

          <button 
            className="btn btn-primary add-to-cart-button" 
            onClick={handleAddToCart}
            disabled={addingToCart || !isAuthenticated} // Also disable if not authenticated initially
          >
            {addingToCart ? 'Adding...' : 'Add to Cart'}
          </button>
          
          <div className="product-description-section">
            <h3 className="description-title">Product Details</h3>
            <p className="description-text">{product.description || 'No description available for this product.'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
