import React from 'react';
import { Link } from 'react-router-dom';
import './Tablets.css';

// Tabletlerin verisini burada tanımlıyoruz
const tabletData = [
  {
    name: 'Samsung Galaxy Tab S6 Lite',
    image: 'https://m.media-amazon.com/images/I/61ssusKvqoL.jpg',
    id: 'samsung-galaxy-tab-s6-lite',  // Her tablet için benzersiz bir id
  },
  {
    name: 'Apple iPad 10.2 (2020)',
    image: 'https://m.media-amazon.com/images/I/61VQc+6KLSL._AC_SL1500_.jpg',  // Yeni iPad resim URL'si
    id: 'apple-ipad-10-2-2020',  // Yeni tablet için benzersiz id
  },
  {
    name: 'Honor Pad X9',  // Yeni tablet adı
    image: 'https://m.media-amazon.com/images/I/51tL89Amu4L._AC_SL1500_.jpg',  // Honor Pad X9 için resim URL'si
    id: 'honor-pad-x9',  // Yeni tablet için benzersiz id
  },
];

const Tablets = () => {
  return (
    <div className="tablet-page">
      <h1>Tablets</h1>
      <div className="tablet-list">
        {tabletData.map((tablet) => (
          <div className="tablet-item" key={tablet.id}>
            <Link to={`/tablet/${tablet.id}`}>
              <img src={tablet.image} alt={tablet.name} style={{ maxWidth: '100%', height: 'auto' }} />
              <h2>{tablet.name}</h2>  {/* Tablet ismini ekledik */}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tablets;
