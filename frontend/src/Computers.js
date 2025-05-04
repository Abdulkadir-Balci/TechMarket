// src/Computers.js
import React, { useEffect, useState } from 'react';
import './css/Phones.css'; // Bu dosya styling için kullanılıyor

const Computers = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetch("/data/products.json")
      .then(res => res.json())
      .then(data => {
        const laptopsOnly = data.products.filter(product => product.category === "laptops");
        setAllProducts(laptopsOnly);
        setFilteredProducts(laptopsOnly);
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
            <img 
  src={product.thumbnail || product.images?.[0]} 
  alt={product.title} 
  onError={(e) => e.target.src = 'placeholder-image-url'} // Fallback ekleyin
/>
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
