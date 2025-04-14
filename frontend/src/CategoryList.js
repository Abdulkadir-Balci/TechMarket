import React, { useState } from 'react';
import './CategoryList.css';  // CSS dosyasını import ediyoruz

const categories = [
  { name: 'Phones' },
  { name: 'Computers' },
  { name: 'Tablets' },
  { name: 'Earphones' },
];

const CategoryList = () => {
  // Kategori listesinin açık mı kapalı mı olduğunu belirlemek için useState kullanıyoruz
  const [isOpen, setIsOpen] = useState(true);

  const toggleCategoryList = () => {
    setIsOpen(!isOpen);  // Listeyi açıp kapama işlevi
  };

  return (
    <div className="category-list">
      {/* "Categories" başlığını tıklayarak kategorileri açıp kapatıyoruz */}
      <button className="category-title" onClick={toggleCategoryList}>
        Categories
      </button>

      {/* Kategoriler listesi */}
      {isOpen && (
        <div className="categories">
          {categories.map((category, index) => (
            <div className="category-item" key={index}>
              <button className="category-title">{category.name}</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryList;
