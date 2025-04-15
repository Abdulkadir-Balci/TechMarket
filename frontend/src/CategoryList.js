import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CategoryList.css'; // Stil dosyası

// Kategori ve alt kategori verileri
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
  const [isOpen, setIsOpen] = useState(true); // Kategori listesinin açık/kapalı durumu
  const [expandedCategory, setExpandedCategory] = useState(null); // Hangi kategori genişletilmiş

  const toggleCategoryList = () => {
    setIsOpen(!isOpen); // Tıklanınca aç/kapa yap
  };

  const toggleSubcategories = (categoryName) => {
    // Aynı kategoriye tekrar tıklanırsa kapat
    setExpandedCategory(expandedCategory === categoryName ? null : categoryName);
  };

  return (
    <div className="category-list">
      {/* Ana başlık: Kategoriler */}
      <button className="category-title" onClick={toggleCategoryList}>
        Categories
      </button>

      {/* Liste açık ise kategorileri göster */}
      {isOpen && (
        <div className="categories">
          {categories.map((category, index) => (
            <div className="category-item" key={index}>
              {/* Kategori adı, tıklanınca alt kategorileri aç/kapa yapar */}
              <button
                className="category-title"
                onClick={() => toggleSubcategories(category.name)}
              >
                {category.name}
              </button>

              {/* Alt kategoriler */}
              {expandedCategory === category.name && (
                <div className="subcategory-list">
                  <ul>
                    {category.subcategories.map((sub, subIndex) => (
                      <li key={subIndex}>
                        {/* Subcategory ismini link olarak göster */}
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
