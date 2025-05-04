// src/Tablets.js
import React, { useEffect, useState } from 'react';
import './css/Tablets.css'; // Make sure to create a corresponding CSS file

const Tablets = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetch("/data/products.json")
      .then(res => res.json())
      .then(data => {
        const tabletsOnly = data.products.filter(product => 
          product.category === "tablets" // Filter for tablets only
        );
        setAllProducts(tabletsOnly);
        setFilteredProducts(tabletsOnly);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Filter products based on search term
  useEffect(() => {
    const filtered = allProducts.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, allProducts]);

  return (
    <div className="tablets-page">
      <h2>Tablets</h2>
      <input
        type="text"
        placeholder="Search tablets..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <div className="tablets-container">
        {filteredProducts.map((product) => (
          <div className="tablet-card" key={product.id}>
            <img src={product.thumbnail} alt={product.title} />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p><strong>Price:</strong> ${product.price}</p>
            {product.discountPercentage && (
              <p className="discount">
                <strong>Discount:</strong> {product.discountPercentage}% off
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tablets;