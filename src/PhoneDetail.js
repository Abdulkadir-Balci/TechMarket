import React from 'react';
import { useParams } from 'react-router-dom';

const phoneDetails = {
  'iphone-13-pro': {
    name: 'iPhone 13 Pro',
    image: 'https://m.media-amazon.com/images/I/618Bb+QzCmL._AC_SX342_SY445_.jpg',
    description: 'The iPhone 13 Pro comes with a 6.1" Super Retina XDR display, A15 Bionic chip.',
    price: '13,999.00 TL',
    color: 'Graphite',
    storage: '128GB',
  },
  'samsung-galaxy-s21': {
    name: 'Samsung Galaxy S21',
    image: 'https://m.media-amazon.com/images/I/61EVFGf7zaL.__AC_SX300_SY300_QL70_ML2_.jpg',
    description: 'The Samsung Galaxy S21 features a 6.2" Dynamic AMOLED display, Snapdragon 888.',
    price: '9,999.00 TL',
    color: 'Phantom Gray',
    storage: '128GB',
  },
  'google-pixel-6': {
    name: 'Google Pixel 6',
    image: 'https://m.media-amazon.com/images/I/61nJq3BzlRL._AC_SL1500_.jpg',
    description: 'The Google Pixel 6 comes with a 6.4" AMOLED display, Google Tensor chip.',
    price: '7,999.00 TL',
    color: 'Stormy Black',
    storage: '128GB',
  },
};

const PhoneDetail = () => {
  const { phoneId } = useParams();
  const phone = phoneDetails[phoneId];

  if (!phone) {
    return <h2>Phone not found!</h2>;
  }

  return (
    <div className="phone-detail-container" style={{ display: 'flex', padding: '20px' }}>
      <div className="phone-image">
        <img
          src={phone.image}
          alt={phone.name}
          style={{
            width: '300px',
            height: 'auto',
            marginRight: '30px',
          }}
        />
      </div>
      <div className="phone-info">
        <h1>{phone.name}</h1>
        <p>{phone.description}</p>
        <p><strong>Price:</strong> {phone.price}</p>
        <p><strong>Color:</strong> {phone.color}</p>
        <p><strong>Storage:</strong> {phone.storage}</p>
      </div>
    </div>
  );
};

export default PhoneDetail;
