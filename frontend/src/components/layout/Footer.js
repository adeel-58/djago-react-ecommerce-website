// src/components/layout/Footer.js
import React from 'react';
// Removed Container, Row, Col from react-bootstrap to use custom div structure
import { Link } from 'react-router-dom';
import '../../styles/Footer.css'; // We will create this CSS file

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-row">
          <div className="footer-col footer-col-brand">
            <h5 className="footer-brand-name">PetHub</h5> {/* Changed from MyStore */}
            <p className="footer-tagline">Your pet's favorite online destination.</p>
          </div>

          <div className="footer-col footer-col-links">
            <h6 className="footer-heading">Quick Links</h6>
            <ul className="footer-links-list">
              <li><Link className="footer-link" to="/">Home</Link></li>
              <li><Link className="footer-link" to="/products">Shop</Link></li> {/* Assuming /products for shop */}
              <li><Link className="footer-link" to="/cart">Cart</Link></li>
              <li><Link className="footer-link" to="/login">Login</Link></li>
              {/* Add more links like About Us, Contact, FAQ etc. */}
            </ul>
          </div>

          <div className="footer-col footer-col-contact">
            <h6 className="footer-heading">Contact Us</h6>
            <p className="footer-contact-info">Email: support@pethub.com</p>
            <p className="footer-contact-info">Phone: +1 234 567 890</p>
            {/* Add social media icons/links here if desired */}
          </div>
        </div>
        <hr className="footer-divider" />
        <p className="footer-copyright">&copy; {new Date().getFullYear()} PetHub. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
