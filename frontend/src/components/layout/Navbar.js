// src/components/layout/Navbar.js

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice'; // Ensure this path is correct
// import SearchForm from '../home/SearchForm'; // SearchForm is removed
import '../../styles/Navbar.css'; // Path as per our last discussion

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
        {/* Left Section: Brand/Logo */}
        <div className="navbar-section navbar-section--left">
          <Link className="navbar__brand" to="/">PetHub</Link> {/* Changed brand name */}
        </div>

        {/* Center Section: Categories */}
        <div className="navbar-section navbar-section--center">
          <div className="navbar__direct-categories">
            <Link className="navbar__link navbar__category-link" to="/category/dog-supplies">Dog Supplies</Link>
            <Link className="navbar__link navbar__category-link" to="/category/cat-supplies">Cat Supplies</Link>
            <Link className="navbar__link navbar__category-link" to="/category/small-pets">Small Pets</Link>
          </div>
        </div>

        {/* Right Section: Cart & Auth/Account */}
        <div className="navbar-section navbar-section--right">
          <Link className="navbar__link cart-link" to="/cart">
            🛒 <span className="cart-text">Cart</span>
          </Link>

          {!isAuthenticated ? (
            <div className="navbar__auth">
              <Link className="navbar__link" to="/login">Login</Link>
              <Link className="navbar__link navbar__register-btn" to="/register">Register</Link>
            </div>
          ) : (
            <div className="dropdown account-dropdown">
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
      </div>
    </nav>
  );
};

export default AppNavbar;
