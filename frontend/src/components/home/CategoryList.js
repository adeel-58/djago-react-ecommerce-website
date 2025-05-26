import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/categories/')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  return (
    <div className="category-list">
      <h3>Shop by Category</h3>
      <div className="category-grid">
        {categories.map(category => (
          <div key={category.id} className="category-card">
            <h4>{category.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
