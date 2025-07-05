// src/components/layout/Navbar.js

import React, { useState } from 'react'; // Import useState for managing input state
import { Link, useNavigate } from 'react-router-dom'; // useNavigate for navigation
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice'; // Ensure this path is correct

// Import the stylesheet for the navbar
import '../../styles/Navbar.css';

// --- Correctly import icons from the src folder ---
// The path '../../icons/' goes up two directories from 'src/components/layout/'
import facebookIcon from '../../icons/facebook.png';
import instagramIcon from '../../icons/instagram.png';
import pinterestIcon from '../../icons/pinterest.png';
import searchIcon from '../../icons/search.png';
import cartIcon from '../../icons/cart.png';
import heartIcon from '../../icons/heart.png';
import userIcon from '../../icons/user.png';
import logo from '../../icons/l2.png'; // Import your actual logo


// --- Helper Components using the imported icons ---

const TopBar = () => (
    <div className="top-bar">
        <div className="container top-bar__container">
            <div className="top-bar__contact">
                <span>Phone / xxxx xxx xxx</span>
            </div>
            <div className="top-bar__socials">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <img src={facebookIcon} alt="Facebook" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <img src={instagramIcon} alt="Instagram" />
                </a>
                <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">
                    <img src={pinterestIcon} alt="Pinterest" />
                </a>
            </div>
        </div>
    </div>
);

const MainNavbar = ({ isAuthenticated, handleLogout, toggleMobileMenu }) => {
    // State to hold the search input value
    const [searchKeyword, setSearchKeyword] = useState('');
    // Hook to programmatically navigate
    const navigate = useNavigate();

    // Handler for search form submission
    const handleSearchSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        if (searchKeyword.trim()) { // Check if the input is not empty or just whitespace
            navigate(`/search?q=${searchKeyword.trim()}`); // Navigate to search results page
            setSearchKeyword(''); // Clear the search input after submission
        } else {
            navigate('/'); // If search is empty, navigate to home or handle as preferred
        }
    };

    return (
        <div className="main-navbar">
            <div className="container main-navbar__container">
                {/* Logo */}
                <div className="main-navbar__brand">
                    <Link to="/" className="brand-link">
                        <img src={logo} alt="Nailova Logo" className="navbar-logo" /> {/* Added logo here */}
                    </Link>
                </div>

                {/* Search Bar - Now functional */}
                <div className="main-navbar__search">
                    <form onSubmit={handleSearchSubmit} className="search-bar"> {/* Wrap input in a form */}
                        <input
                            type="text"
                            placeholder="Search"
                            className="search-bar__input"
                            value={searchKeyword} // Bind input value to state
                            onChange={(e) => setSearchKeyword(e.target.value)} // Update state on change
                        />
                        {/* Use a button for the search icon to trigger form submission */}
                        <button type="submit" className="search-bar__icon-button">
                            <img src={searchIcon} alt="Search" className="search-bar__icon" />
                        </button>
                    </form>
                </div>

                {/* Icons & Actions */}
                <div className="main-navbar__actions">
                    <Link to="/cart" className="action-link">
                        <img src={cartIcon} alt="Shopping Cart" />
                    </Link>
                    <Link to="/wishlist" className="action-link wishlist-icon"> {/* Added class for mobile hiding */}
                        <img src={heartIcon} alt="Wishlist" />
                    </Link>

                    {/* Auth Section */}
                    {!isAuthenticated ? (
                        // When not logged in, user icon links to login page
                        <Link to="/login" className="action-link">
                            <img src={userIcon} alt="Login" />
                        </Link>
                    ) : (
                        // When logged in, user icon has a dropdown
                        <div className="dropdown">
                            <span className="action-link dropdown__toggle">
                                <img src={userIcon} alt="My Account" />
                            </span>
                            <div className="dropdown__menu">
                                <Link to="/account/dashboard" className="dropdown__item">Dashboard</Link>
                                <Link to="/account/orders" className="dropdown__item">Orders</Link>
                                <Link to="/account/details" className="dropdown__item">Account Details</Link>
                                <hr className="dropdown__divider" />
                                <span onClick={handleLogout} className="dropdown__item dropdown__item--logout">
                                    Logout
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Hamburger Menu Icon (visible on mobile) */}
                    <button className="menu-toggle" onClick={toggleMobileMenu} aria-label="Open mobile menu">
                        &#9776; {/* Unicode for hamburger icon */}
                    </button>
                </div>
            </div>
        </div>
    );
};

const BottomNavbar = () => (
    <div className="bottom-navbar">
        <nav className="container bottom-navbar__container">
            <ul className="bottom-navbar__links">
                <li><Link to="/">Home</Link></li>
                
                {/* Shop Dropdown */}
                <li className="dropdown">
                    <Link to="/shop" className="dropdown__toggle">
                        Shop
                    </Link>
                    <div className="dropdown__menu">
                        <Link to="/shop/all-products" className="dropdown__item">All Products</Link>
                        <Link to="/shop/new-arrivals" className="dropdown__item">New Arrivals</Link>
                        <Link to="/shop/on-sale" className="dropdown__item">On Sale</Link>
                    </div>
                </li>

                {/* Nails Accessories Dropdown */}
                <li className="dropdown">
                    <Link to="/category/accessories" className="dropdown__toggle">
                        Nails Accessories 
                    </Link>
                    <div className="dropdown__menu">
                        <Link to="/category/brushes" className="dropdown__item">Brushes</Link>
                        <Link to="/category/glitter" className="dropdown__item">Glitter</Link>
                        <Link to="/category/stickers" className="dropdown__item">Stickers</Link>
                    </div>
                </li>

                <li><Link to="/reviews">Customers Reviews</Link></li>
                <li><Link to="/about">About Nailova</Link></li>
            </ul>
        </nav>
    </div>
);

// New MobileMenu Component
const MobileMenu = ({ isOpen, toggleMenu, isAuthenticated, handleLogout }) => {
    return (
        <div className={`mobile-menu ${isOpen ? 'is-open' : ''}`}>
            <button className="mobile-menu__close-btn" onClick={toggleMenu} aria-label="Close mobile menu">
                &times; {/* Unicode for multiplication sign (X icon) */}
            </button>
            <ul className="mobile-menu__links">
                <li className="mobile-menu__item"><Link to="/" onClick={toggleMenu}>Home</Link></li>
                <li className="mobile-menu__item"><Link to="/shop" onClick={toggleMenu}>Shop</Link></li>
                <li className="mobile-menu__item"><Link to="/shop/new-arrivals" onClick={toggleMenu}>New Arrivals</Link></li>
                <li className="mobile-menu__item"><Link to="/about" onClick={toggleMenu}>About Nailova</Link></li>
                {/* Removed other menu items as per request */}
            </ul>
        </div>
    );
};


// --- Main Exported Component ---
const AppNavbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.auth);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="app-navbar">
            <TopBar />
            <MainNavbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} toggleMobileMenu={toggleMobileMenu} />
            <BottomNavbar />
            <MobileMenu isOpen={isMobileMenuOpen} toggleMenu={toggleMobileMenu} isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
        </header>
    );
};

export default AppNavbar;
