// src/Phones.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Yönlendirme için ekledik
import './css/Phones.css';

const Phones = ({ addToCart }) => { // addToCart'u props olarak aldık
  const [allProducts, setAllProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate(); // Yönlendirme hook'u

  useEffect(() => {
    fetch("/data/products.json")
      .then(res => res.json())
      .then(data => {
        const phonesOnly = data.products.filter(product => product.category === "smartphones");
        setAllProducts(phonesOnly);
        setFilteredProducts(phonesOnly);
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

  const handleAddToCart = (product) => {
    addToCart(product);
    // sepete ekledikten sonra cart sayfasına yönlendir
  };

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
            <button onClick={() => handleAddToCart(product)}>🛒 Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Phones;
