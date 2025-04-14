import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CategoryList.css';

const categories = [
  {
    name: 'Phones',
    subcategories: ['Apple Phones', 'Android Phones'],
  },
  {
    name: 'Computers',
    subcategories: ['Desktops', 'Laptops'],
  },
  {
    name: 'Earphones',
    subcategories: ['Wired', 'Wireless'],
  },
  {
    name: 'Cameras',
    subcategories: ['DSLR', 'Mirrorless'],
  },
];

const CategoryList = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [expandedCategory, setExpandedCategory] = useState(null);

  const toggleCategoryList = () => {
    setIsOpen(!isOpen);
  };

  const toggleSubcategories = (categoryName) => {
    setExpandedCategory(expandedCategory === categoryName ? null : categoryName);
  };

  return (
    <div className="category-list">
      <button className="category-title" onClick={toggleCategoryList}>
        Categories
      </button>

      {isOpen && (
        <div className="categories">
          {categories.map((category, index) => (
            <div className="category-item" key={index}>
              <button
                className="category-title"
                onClick={() => toggleSubcategories(category.name)}
              >
                {category.name}
              </button>

              {expandedCategory === category.name && (
                <div className="subcategory-list">
                  <ul>
                    {category.subcategories.map((sub, subIndex) => (
                      <li key={subIndex}>
                        <Link to={`/subcategory/${sub.toLowerCase().replace(/\s+/g, '-')}`}>
                          {sub}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryList;
