import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // Link'i import ediyoruz
import './CategoryList.css';  // CSS dosyasını import ediyoruz

const categories = [
  { name: 'Phones', path: '/phones' },
  { name: 'Computers', path: '/computers' },
  { name: 'Tablets', path: '/tablets' },
  { name: 'Earphones', path: '/earphones' },
];

const CategoryList = ({ isOpen, toggleCategoryList }) => {
  return (
    <div className={`category-list ${isOpen ? 'open' : ''}`}>
      {/* Kategoriler listesi */}
      <div className="categories">
        {categories.map((category, index) => (
          <div className="category-item" key={index}>
            <Link to={category.path}>
              <button className="category-button" onClick={toggleCategoryList}>
                {category.name}
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
