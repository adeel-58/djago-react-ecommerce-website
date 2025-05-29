// src/components/auth/Login.js

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/slices/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import '../../styles/LoginPage.css'; // Import the new CSS file

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/'); // Redirect to homepage after login
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  return (
    <div className="auth-page-container">
      <div className="auth-form-container">
        <h2 className="auth-title">Welcome Back!</h2>
        <p className="auth-subtitle">Login to continue to your pet's paradise.</p>

        {error && <p className="auth-error-message">{error}</p>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="username" className="form-label">Username or Email</label>
            <input
              type="text" // Consider type="email" if you accept email for login
              className="form-control"
              id="username"
              name="username"
              placeholder="Enter your username or email"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {/* Optional: Add a "Forgot Password?" link here */}
            {/* <Link to="/forgot-password" className="form-link forgot-password-link">Forgot Password?</Link> */}
          </div>

          <button type="submit" className="btn btn-primary auth-submit-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <p className="auth-redirect-link">
            Don't have an account? <Link to="/register">Sign up here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
