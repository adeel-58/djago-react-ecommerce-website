import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-light py-4 border-top mt-auto">
      <Container>
        <Row>
          <Col md={4} className="mb-3 mb-md-0">
            <h5 className="fw-bold">MyStore</h5>
            <p className="text-muted">Your favorite eCommerce destination.</p>
          </Col>

          <Col md={4} className="mb-3 mb-md-0">
            <h6>Quick Links</h6>
            <ul className="list-unstyled">
              <li><Link className="text-decoration-none text-dark" to="/">Home</Link></li>
              <li><Link className="text-decoration-none text-dark" to="/shop">Shop</Link></li>
              <li><Link className="text-decoration-none text-dark" to="/cart">Cart</Link></li>
              <li><Link className="text-decoration-none text-dark" to="/login">Login</Link></li>
            </ul>
          </Col>

          <Col md={4}>
            <h6>Contact</h6>
            <p className="text-muted mb-1">Email: support@mystore.com</p>
            <p className="text-muted">Phone: +1 234 567 890</p>
          </Col>
        </Row>
        <hr />
        <p className="text-center text-muted mb-0">&copy; {new Date().getFullYear()} MyStore. All rights reserved.</p>
      </Container>
    </footer>
  );
};

export default Footer;
