// src/Tablets.js
import React, { useEffect, useState } from 'react';
import './css/Tablets.css'; // Eğer yoksa oluşturabilirsin

const Tablets = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products/category/smartphones")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
      })
      .catch((error) => {
        console.error("API'den veri çekilirken hata oluştu:", error);
      });
  }, []);

  return (
    <div className="tablet-list">
      <h2>Smartphones</h2>
      <div className="tablets-container">
        {products.map((product) => (
          <div className="tablet-card" key={product.id}>
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

export default Tablets;
