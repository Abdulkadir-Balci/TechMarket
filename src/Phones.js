import React from 'react';
import { Link } from 'react-router-dom';
import './Phones.css';  // CSS dosyasını import et

const phoneData = [
  {
    name: 'iPhone 13 Pro',
    image: 'https://m.media-amazon.com/images/I/618Bb+QzCmL._AC_SX342_SY445_.jpg',
    id: 'iphone-13-pro',
  },
  {
    name: 'Samsung Galaxy S21',
    image: 'https://m.media-amazon.com/images/I/61EVFGf7zaL.__AC_SX300_SY300_QL70_ML2_.jpg',
    id: 'samsung-galaxy-s21',
  },
  {
    name: 'Google Pixel 6',
    image: 'https://m.media-amazon.com/images/I/61nJq3BzlRL._AC_SL1500_.jpg',
    id: 'google-pixel-6',
  },
];

const Phones = () => {
  return (
    <div className="phone-page">
      <h1>Phones</h1>
      <div className="phone-list">
        {phoneData.map((phone) => (
          <div className="phone-item" key={phone.id}>
            <Link to={`/phone/${phone.id}`}>
              <img src={phone.image} alt={phone.name} />
              <h2>{phone.name}</h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Phones;
