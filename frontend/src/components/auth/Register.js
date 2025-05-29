// src/components/auth/Register.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/slices/authSlice'; // Ensure this path is correct
import { useNavigate, Link } from 'react-router-dom';
import '../../styles/RegisterPage.css'; // Import the CSS file

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '', // Added confirm password field
  });
  const [formError, setFormError] = useState(''); // For client-side validation errors

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/'); // redirect to homepage when authenticated
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (formError) setFormError(''); // Clear form error when user types
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(''); // Clear previous form errors
    if (formData.password !== formData.confirmPassword) {
      setFormError("Passwords do not match!");
      return;
    }
    if (formData.password.length < 6) { // Example: Basic password length validation
        setFormError("Password must be at least 6 characters long.");
        return;
    }
    // Dispatch only username, email, and password as per your original component
    dispatch(registerUser({ 
        username: formData.username, 
        email: formData.email, 
        password: formData.password 
    }));
  };

  return (
    // Use the same container structure as Login page for consistency
    <div className="auth-page-container register-page-variant"> 
      <div className="auth-form-container">
        <h2 className="auth-title">Create Your Account</h2>
        <p className="auth-subtitle">Join our pack and get the best for your pets!</p>

        {/* Display Redux error OR client-side formError */}
        {(error || formError) && <p className="auth-error-message">{error || formError}</p>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              placeholder="Choose a username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
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
              placeholder="Create a password (min. 6 characters)"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary auth-submit-button" disabled={loading}>
            {loading ? 'Registering...' : 'Create Account'}
          </button>

          <p className="auth-redirect-link">
            Already have an account? <Link to="/login">Log in here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
