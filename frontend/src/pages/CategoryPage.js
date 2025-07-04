// src/pages/CategoryProductsPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/product/ProductCard';
import '../styles/CategoryProductsPage.css';
const CategoryProductsPage = () => {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/products/?category__slug=${slug}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching category products:', error);
      }
    };

    fetchCategoryProducts();
  }, [slug]);

  return (
    <div>
      <h2 className="my-4">Products in "{slug.replaceAll('-', ' ')}"</h2>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryProductsPage;
