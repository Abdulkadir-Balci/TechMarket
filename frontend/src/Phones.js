// src/Phones.js
import React, { useEffect, useState } from 'react';
import './css/Phones.css';

const Phones = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products/category/smartphones")
      .then(res => res.json())
      .then(data => {
        setAllProducts(data.products);
        setFilteredProducts(data.products);
      });
  }, []);

  // Arama çubuğu değiştiğinde filtreleme
  useEffect(() => {
    const filtered = allProducts.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, allProducts]);

  return (
    <div className="phones-page">
      <h2>Phones</h2>
      <input
        type="text"
        placeholder="Search phones..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <div className="phones-container">
        {filteredProducts.map((product) => (
          <div className="phone-card" key={product.id}>
            <img src={product.thumbnail} alt={product.title} />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p><strong>Price:</strong> ${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Phones;
