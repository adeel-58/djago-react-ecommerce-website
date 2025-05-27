// src/components/layout/Navbar.js

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import SearchForm from '../home/SearchForm';
import './Navbar.css';

const AppNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <Link className="navbar__brand" to="/">MyStore</Link>

        <div className="navbar__search">
          <SearchForm />
        </div>

        <div className="navbar__categories">
          <div className="dropdown">
            <span className="dropdown__toggle">Categories</span>
            <div className="dropdown__menu">
              <Link to="/category/nail-polishes">Nail Polishes</Link>
              <Link to="/category/nail-art-accessories">Nail Art & Accessories</Link>
              <Link to="/category/nail-care-essentials">Nail Care Essentials</Link>
            </div>
          </div>
        </div>

        {/* 🛒 Cart link without item count */}
        <Link className="navbar__link" to="/cart">
          🛒 Cart
        </Link>

        {!isAuthenticated ? (
          <div className="navbar__auth">
            <Link className="navbar__link" to="/login">Login</Link>
            <Link className="navbar__link" to="/register">Register</Link>
          </div>
        ) : (
          <div className="dropdown">
            <span className="dropdown__toggle">My Account</span>
            <div className="dropdown__menu">
              <Link to="/account/dashboard">Dashboard</Link>
              <Link to="/account/orders">Orders</Link>
              <Link to="/account/addresses">Addresses</Link>
              <Link to="/account/details">Account Details</Link>
              <hr />
              <span onClick={handleLogout} className="dropdown__item logout">Logout</span>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default AppNavbar;
