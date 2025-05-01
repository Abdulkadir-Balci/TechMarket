// src/Computers.js
import React, { useEffect, useState } from 'react';
import './css/Phones.css'; // Bu dosya styling için kullanılıyor

const Computers = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/category/electronics")
      .then(res => res.json())
      .then(data => {
        setAllProducts(data);           // ✅ Direkt data kullanılıyor
        setFilteredProducts(data);      // ✅ Aynı şekilde
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
      <h2>Computers</h2>
      <input
        type="text"
        placeholder="Search computers..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <div className="phones-container">
        {filteredProducts.map((product) => (
          <div className="phone-card" key={product.id}>
            <img src={product.image} alt={product.title} /> {/* ✅ image alanı kullanılıyor */}
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p><strong>Price:</strong> ${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Computers;
