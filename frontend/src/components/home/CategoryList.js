// src/components/home/CategoryList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link
import '../../styles/CategoryList.css'; // Styles for CategoryList

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('https://nailova-django-react-website-erfwf0csd9hjaafv.southeastasia-01.azurewebsites.net/api/categories/')
      .then(response => setCategories(response.data.results || response.data)) // Adjust if API uses pagination
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  return (
    <div className="category-list-container">
      <h2 className="section-title">Shop by Category</h2>
      {categories.length > 0 ? (
        <div className="category-grid">
          {categories.map(category => (
            <Link key={category.id} to={`/category/${category.slug || category.id}`} className="category-card-link">
              {/* Assuming your category object has a 'slug' or you can use 'id' */}
              <div className="category-card">
                {/* Optional: Add an image/icon here if your API provides it */}
                {/* <img src={category.image || '/placeholder-category-icon.svg'} alt={category.name} className="category-card-icon" /> */}
                <h4 className="category-card-name">{category.name}</h4>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>Loading categories...</p>
      )}
    </div>
  );
};

export default CategoryList;
