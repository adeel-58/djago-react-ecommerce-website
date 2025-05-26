import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/', // Your Django backend API
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to inject token dynamically
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken'); // Or wherever you store it
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
