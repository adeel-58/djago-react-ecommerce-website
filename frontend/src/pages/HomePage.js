import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import '../styles/HomePage.css'; // CORRECTED PATH
import ProductCard from '../components/product/ProductCard.js'; // Import the dedicated ProductCard component

// --- IMPORT YOUR LOCAL IMAGES ---
import heroBg from '../assets/images/hero-bg.jpg'; // CORRECTED PATH
//import aboutImage from '../assets/images/about-image.jpg'; // CORRECTED PATH
import categoryDipPowder from '../assets/images/dip-powder.jpg'; // CORRECTED PATH
import categoryGelPolish from '../assets/images/gel-polish.jpg'; // CORRECTED PATH
import categoryNailCare from '../assets/images/nail-care.jpg'; // CORRECTED PATH
import categoryNailEssentials from '../assets/images/nail-essentials.jpg'; // CORRECTED PATH
import categoryRemoval from '../assets/images/removal.jpg'; // CORRECTED PATH
import color1 from '../assets/images/color-1.jpg'; // CORRECTED PATH
import color2 from '../assets/images/color-2.jpg'; // CORRECTED PATH
import color3 from '../assets/images/color-3.jpg'; // CORRECTED PATH
import color4 from '../assets/images/color-4.jpg'; // CORRECTED PATH
import color5 from '../assets/images/color-5.jpg'; // CORRECTED PATH
import flowerIcon from '../assets/images/flower.png';
import reviewer1 from '../assets/images/reviewer-1.png'; // Example image name
import reviewer2 from '../assets/images/reviewer-2.png'; // Example image name
import reviewer3 from '../assets/images/reviewer-3.png'; // Example image name


// --- PAGE CONTENT COMPONENTS ---

const Hero = () => (
    <div className="hero-section" style={{ backgroundImage: `url(${heroBg})` }}>
        <div className="hero-overlay"></div>
        <div className="container hero-content">
            <h2 className="hero-title">Welcome To Nailova Nail Shop</h2>
            <div className="hero-cta">
                <Link to="/shop" className="btn btn-primary">Shop Now</Link>
            </div>
        </div>
    </div>
);

const SectionTitle = ({ title, subtitle }) => (
    <div className="section-title-container">
        <img src={flowerIcon} alt="Section Icon" className="section-title-icon" />
        <h2 className="section-title">{title}</h2>
        {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
);
const CategoryCard = ({ imageUrl, title }) => (
    <div className="category-card">
        <div className="category-card-image-wrapper">
            <img src={imageUrl} alt={title} className="category-card-image" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/200x200/EEE/333?text=Img+Error'; }} />
        </div>
        <h3 className="category-card-title">{title}</h3>
    </div>
);

const Categories = ({ onCategoryClick }) => {
    const categories = [
        { title: 'Dip Powder', imageUrl: categoryDipPowder },
        { title: 'Gel Polish', imageUrl: categoryGelPolish },
        { title: 'Nail Care', imageUrl: categoryNailCare },
        { title: 'Nail Essentials', imageUrl: categoryNailEssentials },
        { title: 'Removal', imageUrl: categoryRemoval },
    ];

    const carouselRef = useRef(null); // Create a ref for the carousel div

    const scrollLeft = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: -250, behavior: 'smooth' }); // Scroll left by 250px
        }
    };

    const scrollRight = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: 250, behavior: 'smooth' }); // Scroll right by 250px
        }
    };

    return (
        <section className="categories-section">
            <div className="container">
                <SectionTitle
                    title="Shop By Category"
                    subtitle="Lorem ipsum is simply dummy text of the printing and typesetting industry"
                />
                <div className="category-carousel" ref={carouselRef}> {/* Assign the ref here */}
                    {categories.map(cat => <CategoryCard key={cat.title} {...cat} onClick={onCategoryClick} />)}
                </div>
                <div className="carousel-controls">
                    <button className="carousel-btn" onClick={scrollLeft}><ChevronLeft/></button> {/* Add onClick */}
                    <button className="carousel-btn" onClick={scrollRight}><ChevronRight/></button> {/* Add onClick */}
                </div>
            </div>
        </section>
    );
};

const ShopByColor = () => (
    <section className="shop-by-color-section">
        <div className="container">
            <SectionTitle title="Shop By Color" />
            <div className="color-grid">
                <div className="color-grid-item-large"><img src={color1} alt="Color 1"/></div>
                <div className="color-grid-item-small"><img src={color2} alt="Color 2"/></div>
                <div className="color-grid-item-small"><img src={color3} alt="Color 3"/></div>
                <div className="color-grid-item-small"><img src={color4} alt="Color 4"/></div>
                <div className="color-grid-item-small"><img src={color5} alt="Color 5"/></div>
            </div>
            <div className="view-more-container">
                <button className="btn btn-secondary">View More</button>
            </div>
        </div>
    </section>
);

const StatsBar = () => (
    <section className="stats-bar">
        <div className="container stats-bar-content">
            <div><p className="stat-number">1k+</p><p className="stat-label">Happy Customers</p></div>
            <div><p className="stat-number">20+</p><p className="stat-label">Beauty Brands</p></div>
            <div><p className="stat-number">98%</p><p className="stat-label">Positive Ratings</p></div>
            <div><p className="stat-number">86%</p><p className="stat-label">Natural & Original</p></div>
        </div>
    </section>
);

const About = () => (
    <section className="about-section">
        <div className="container about-content">
            <div className="about-text">
                <h2 className="about-title">About Nailova</h2>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...</p>
                <Link to="/about" className="btn btn-secondary">Read More</Link>
            </div>
        </div>
    </section>
);

// REMOVED THE SIMPLIFIED PRODUCTCARD COMPONENT HERE,
// AS WE ARE IMPORTING THE DEDICATED ONE.

const NewArrivals = ({ products }) => {
    return (
        <section className="new-arrivals-section">
            <div className="container">
                <SectionTitle title="New Arrivals" />
                <div className="product-grid">
                    {products.length > 0 ? (
                        products.map(product => (
                          <ProductCard key={product.id} product={product} />
                        ))
                    ) : (
                        <p>Loading new arrivals...</p>
                    )}
                </div>
                <div className="view-more-container">
                     <Link to="/shop" className="btn btn-secondary">View All</Link>
                </div>
            </div>
        </section>
    );
};

// --- MODIFIED CUSTOMER REVIEW COMPONENT ---
const CustomerReviews = () => {
    const reviews = [
        {
            name: 'Lorem Ipsum',
            image: reviewer1,
            text: "I ordered the nails, really love them, I recomand with pleasure to others!",
            rating: 5,
            time: '5 months ago'
        },
        {
            name: 'Lorem Ipsum',
            image: reviewer2,
            text: "I ordered the nails, really love them, I recomand with pleasure to others!",
            rating: 5,
            time: '5 months ago'
        },
        {
            name: 'Lorem Ipsum',
            image: reviewer3,
            text: "I ordered the nails, really love them, I recomand with pleasure to others!",
            rating: 5,
            time: '5 months ago'
        },
    ];

    return (
        <section className="customer-reviews-section">
            <div className="container">
                {/* MODIFICATION 1: Restored SectionTitle to bring back the flower icon */}
                <SectionTitle title="Customer Reviews" />
                <div className="reviews-grid">
                    {reviews.map((review, i) => (
                        <div key={i} className="review-card">
                            <div className="review-header">
                                <img src={review.image} alt={review.name} className="reviewer-image" />
                                <div className="reviewer-info">
                                    <p className="reviewer-name">{review.name}</p>
                                    <p className="reviewer-title">Reviewer</p>
                                </div>
                            </div>
                            <div className="review-rating-area">
                                <div className="stars-container">
                                    {[...Array(review.rating)].map((_, idx) => <Star key={idx} fill="#FFC107" stroke="#FFC107" size={20} />)}
                                    {[...Array(5 - review.rating)].map((_, idx) => <Star key={idx} fill="none" stroke="#FFC107" size={20} />)}
                                </div>
                                <span className="rating-value">{review.rating}/5</span>
                            </div>
                            <p className="review-text">{review.text}</p>
                            <p className="review-time">{review.time}</p>
                        </div>
                    ))}
                </div>
                <div className="write-review-container">
                    {/* MODIFICATION 2: Changed className to use existing button styles */}
                    <button className="btn btn-secondary">Write Your Review</button>
                </div>
            </div>
        </section>
    );
};


// --- MAIN PAGE COMPONENT ---
// No Navbar or Footer here, as they are handled in your main App.js
const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/products/?limit=8')
      .then(response => {
        const productData = response.data.results || response.data;
        if (Array.isArray(productData)) {
            setProducts(productData);
        } else {
            setProducts([]);
        }
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setProducts([]);
      });
  }, []);

  return (
    <>
        <Hero />
        <Categories />
        <ShopByColor />
        <StatsBar />
        <About />
        <NewArrivals products={products} />
        <CustomerReviews />
    </>
  );
}

export default HomePage;