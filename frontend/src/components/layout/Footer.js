import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Footer.css'; // We will create this CSS file
import facebookIcon from '../../icons/fb.svg';
import instagramIcon from '../../icons/ig.svg';
import pinterestIcon from '../../icons/tw.svg'; // Assuming this replaces Twitter based on common social media sets
import logo from '../../icons/l.png'; // Import your actual logo

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                {/* Left Section: Logo, Stay in touch, Newsletter */}
                <div className="footer-section footer-left">
                    <div className="footer-logo">
                        {/* Using your actual logo image */}
                        <img src={logo} alt="Nailova Logo" />
                    </div>
                    <h3 className="stay-in-touch">Stay in touch!</h3>
                    <p className="newsletter-text">
                        Sign up for our newsletter to get exclusive updates, deals, and promotions.
                    </p>
                    <div className="newsletter-form">
                        <input type="email" placeholder="Email" className="newsletter-input" />
                        <button type="submit" className="newsletter-button">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="arrow-icon">
                                <path fillRule="evenodd" d="M3.75 12a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H4.5a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                                <path fillRule="evenodd" d="M16.28 17.72a.75.75 0 010-1.06l2.47-2.47H4.5a.75.75 0 010-1.5h14.25l-2.47-2.47a.75.75 0 011.06-1.06l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 01-1.06 0z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                    <div className="social-icons">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                            <img src={facebookIcon} alt="Facebook" className="social-icon-img" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                            <img src={instagramIcon} alt="Instagram" className="social-icon-img" />
                        </a>
                        <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                            <img src={pinterestIcon} alt="Pinterest" className="social-icon-img" />
                        </a>
                    </div>
                </div>

                {/* Middle Section: Shop Links */}
                <div className="footer-section footer-middle">
                    <h3 className="section-title">Shop</h3>
                    <ul className="footer-links">
                        <li><Link to="#">Dip Powder</Link></li>
                        <li><Link to="#">Gel Polish</Link></li>
                        <li><Link to="#">Nail Care</Link></li>
                        <li><Link to="#">Nail Essentials</Link></li>
                        <li><Link to="#">Removal</Link></li>
                    </ul>
                </div>

                {/* Right Section: Learn & Help & Support Links */}
                <div className="footer-section footer-right">
                    <h3 className="section-title">Learn</h3>
                    <ul className="footer-links">
                        <li><Link to="#">About Us</Link></li>
                        <li><Link to="#s">Reviews</Link></li>
                    </ul>
                    <h3 className="section-title help-support-title">Help & Support</h3>
                    <ul className="footer-links">
                        <li><Link to="#">30 Day Guarantee</Link></li>
                        <li><Link to="#">Contact Us</Link></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
