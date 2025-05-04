// src/Earphones.js
import React, { useEffect, useState } from 'react';
import './css/Phones.css';

const Earphones = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
      fetch("/data/products.json")
        .then(res => res.json())
        .then(data => {
          const earphonesOnly = data.products.filter(product => product.category === "earphones");
          setAllProducts(earphonesOnly);
          setFilteredProducts(earphonesOnly);
        })
        .catch(error => {
          console.error("Veri alınırken hata oluştu:", error);
        });
    }, []);

  useEffect(() => {
    const filtered = allProducts.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, allProducts]);

  return (
    <div className="phones-page">
      <h2>Earphones</h2>
      <input
        type="text"
        placeholder="Search earphones..."
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

export default Earphones;
