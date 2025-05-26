import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addToCart } from '../redux/slices/cartSlice'; // adjust path based on your structure
import { updateCart } from '../redux/slices/cartSlice'; 
import './ProductPage.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  //const dispatch = useDispatch();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/products/${id}/`);
        setProduct(res.data);
      } catch (error) {
        console.error('Failed to load product:', error);
      }
    };

    fetchProduct();
  }, [id]);
  const dispatch = useDispatch();

const handleAddToCart = async () => {
  try {
    const token = localStorage.getItem('access_token');
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.post(
      'http://localhost:8000/api/cart/add/',
      {
        product_id: product.id,
        quantity: 1,
      },
      config
    );

    dispatch(updateCart(response.data));
  } catch (error) {
    console.error('Add to cart failed:', error.response?.data || error.message);
  }
};


  
  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-detail-container">
      <div className="product-detail-image">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="product-detail-info">
        <h2>{product.name}</h2>
        <p className="category">Category: {product.category?.name}</p>
        <p className="price">${product.price}</p>
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
        <hr />
        <div className="description">
          <h4>Description</h4>
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
