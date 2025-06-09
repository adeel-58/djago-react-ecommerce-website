import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { updateCart } from '../redux/slices/cartSlice';
import { getProductImage, getProductDescription } from '../utils/productAssets';
import '../styles/ProductDetailPage.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
        setMessage({ text: '', type: '' });
        navigate('/login');
      }, 2000);
      return;
    }

    setAddingToCart(true);
    setMessage({ text: '', type: '' });

    try {
      const config = { headers: { Authorization: `Bearer ${userToken}` } };
      const response = await axios.post(
        `${API_URL}/api/cart/add/`,
        { product_id: product.id, quantity: 1 },
        config
      );

      dispatch(updateCart(response.data.cart || response.data));
      setMessage({ text: `${product.name} added to cart!`, type: 'success' });
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    } catch (error) {
      const errorMessage =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        'Failed to add item to cart. Please try again.';
      console.error('Add to cart failed:', errorMessage);
      setMessage({ text: errorMessage, type: 'error' });
      setTimeout(() => setMessage({ text: '', type: '' }), 5000);
    } finally {
      setAddingToCart(false);
    }
  };

  const productImage = getProductImage(product?.name);
  const description = getProductDescription(product?.name);

  if (loadingProduct) {
    return (
      <div className="product-detail-page-container loading-container">
        <p>Loading product details...</p>
      </div>
    );
  }

  if (!product && !loadingProduct) {
    return (
      <div className="product-detail-page-container error-container">
        <p>Sorry, we couldn't find the product you're looking for.</p>
      </div>
    );
  }

  return (
    <div className="product-detail-page-container">
      <div className="product-detail-card">
        <div className="product-detail-image-column">
          <img
            src={productImage}
            alt={product?.name || 'Product'}
            className="product-main-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = getProductImage(); // fallback default image
            }}
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
            <div
              className={`product-message message-${message.type} ${
                message.text ? 'visible' : ''
              }`}
            >
              {message.text}
            </div>
          )}

          <button
            className="btn btn-primary add-to-cart-button"
            onClick={handleAddToCart}
            disabled={addingToCart || !isAuthenticated}
          >
            {addingToCart ? 'Adding...' : 'Add to Cart'}
          </button>

          <div className="product-description-section">
            <h3 className="description-title">Product Details</h3>
            <p className="description-text">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
