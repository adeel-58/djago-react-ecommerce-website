// src/components/auth/Register.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/slices/authSlice'; // Ensure this path is correct
import { useNavigate, Link } from 'react-router-dom';
import '../../styles/RegisterPage.css'; // Assuming you have this CSS file

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '', // Added confirm password for good practice
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
    // It's also good practice to clear the Redux error when the user starts typing again,
    // but that would require dispatching a 'clearAuthError' action if you have one.
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(''); // Clear previous client-side form errors

    if (formData.password !== formData.confirmPassword) {
      setFormError("Passwords do not match!");
      return;
    }
    if (formData.password.length < 6) { // Example: Basic password length validation
        setFormError("Password must be at least 6 characters long.");
        return;
    }
    // Dispatch only username, email, and password as per your original component structure
    // The backend will handle if username/email already exists.
    dispatch(registerUser({ 
        username: formData.username, 
        email: formData.email, 
        password: formData.password 
    }));
  };

  // Determine which error message to display
  let displayError = null;
  if (formError) {
    displayError = formError;
  } else if (error) {
    // Check if the error message from Redux indicates a user already exists.
    // You'll need to adjust the strings "already exists" or "in use" based on
    // the actual error messages your backend/authSlice provides for this scenario.
    if (typeof error === 'string' && (error.toLowerCase().includes("already exists") || error.toLowerCase().includes("in use") || error.toLowerCase().includes("taken"))) {
      displayError = "Username or email already exists, please try another.";
    } else if (typeof error === 'string') {
      displayError = error; // Display the backend error message directly
    } else {
      displayError = "Registration failed. Please try again."; // Generic fallback
    }
  }

  return (
    <div className="register-page-container register-page-variant"> 
      <div className="auth-form-container">
        <h2 className="auth-title">Create Your Account</h2>
        <p className="auth-subtitle">Join our pack and get the best for your pets!</p>

        {displayError && <p className="auth-error-message">{displayError}</p>}
        
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
