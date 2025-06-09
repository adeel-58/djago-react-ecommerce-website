// src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
import CategoryList from '../components/home/CategoryList';
import ProductCard from '../components/product/ProductCard';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

// Import your local images
import MainHeroImage from '../assets/images/pic2.jpg'; // Example path
import MotivationalHeroImage from '../assets/images/pic1.jpg'; // Example path
// Fallback placeholder if local images are not found (optional)
const fallbackHeroImage = 'https://placehold.co/1920x1080/EEEEEE/6c757d?text=Hero+Image';
const fallbackMotivationalImage = 'https://placehold.co/1920x800/EEEEEE/6c757d?text=Motivational+Image';


const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/products/?limit=8')
      .then(response => setProducts(response.data.results || response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <div className="homepage">
      {/* Main Hero Section */}
      <section className="hero-section main-hero">
        <img
          src={MainHeroImage}
          alt="Happy pets playing"
          className="hero-background-image"
          onError={(e) => {
            e.target.onerror = null; // Prevent infinite loop if fallback also fails
            e.target.src = fallbackHeroImage;
          }}
        />
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Pawsitively Perfect Products!</h1>
          <p className="hero-subtitle">Everything your furry, scaly, or feathered friend needs, delivered to your door.</p>
          <Link to="/category/dog-supplies" className="btn btn-primary hero-cta">Shop All Products</Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section-container">
        <CategoryList />
      </section>

      {/* Motivational/CTA Section */}
      <section className="hero-section motivational-hero">
        <img
          src={MotivationalHeroImage}
          alt="Pet receiving quality care"
          className="hero-background-image"
          onError={(e) => {
            e.target.onerror = null; // Prevent infinite loop
            e.target.src = fallbackMotivationalImage;
          }}
        />
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h2 className="hero-title">Quality Care, Unbeatable Joy.</h2>
          <p className="hero-subtitle">We're committed to providing the best for your beloved pets. Discover our curated selection of premium supplies.</p>
          <Link to="/about-us" className="btn btn-secondary hero-cta">Learn More About Us</Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products-section">
        <h2 className="section-title">Our Featured Picks</h2>
        <div className="product-grid">
          {products.length > 0 ? (
            products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p>Loading amazing products for your pets...</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
