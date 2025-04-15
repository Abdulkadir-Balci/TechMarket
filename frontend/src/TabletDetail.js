import React from 'react';
import { useParams } from 'react-router-dom';

// Tabletlerin detaylarını içeren örnek veri
const tabletDetails = {
  'samsung-galaxy-tab-s6-lite': {
    name: 'Samsung Galaxy Tab S6 Lite',
    image: 'https://m.media-amazon.com/images/I/61ssusKvqoL.jpg',
    description: 'A great tablet with S Pen included, perfect for creativity and productivity.',
    price: '8,799.00 TL',
    color: 'Black',
    storage: '64GB',
  },
  'apple-ipad-10-2-2020': {
    name: 'Apple iPad 10.2 (2020)',
    image: 'https://m.media-amazon.com/images/I/61VQc+6KLSL._AC_SL1500_.jpg',
    description: 'The latest iPad with 10.2" Retina display and A12 Bionic chip.',
    price: '6,499.00 TL',
    color: 'Space Gray',
    storage: '128GB',
  },
  'honor-pad-x9': {
    name: 'Honor Pad X9',
    image: 'https://m.media-amazon.com/images/I/51tL89Amu4L._AC_SL1500_.jpg',  // Yeni Honor resmi
    description: 'A high-performance tablet with a large screen and long battery life.',
    price: '4,299.00 TL',
    color: 'Blue',
    storage: '64GB',
  },
};

const TabletDetail = () => {
  const { tabletId } = useParams();  // Parametreyi almak için useParams kullanıyoruz
  const tablet = tabletDetails[tabletId];  // tabletId'yi kullanarak tabletin detaylarını alıyoruz

  if (!tablet) {
    return <h2>Tablet not found!</h2>;
  }

  return (
    <div className="tablet-detail-container">
      <div className="tablet-detail">
        {/* Sol Taraf: Tablet Resmi */}
        <div className="tablet-image">
          <img
            src={tablet.image}
            alt={tablet.name}
            style={{
              width: '12%',  // Resmin genişliğini %12'ye indirdik, boyutunu küçülttük
              height: 'auto',
              margin: '0',
              display: 'block',
              float: 'left',
              marginRight: '20px',
            }}
          />
        </div>

        {/* Tablet ismi, fiyatı, rengi ve hafıza bilgisi */}
        <div className="tablet-info">
          <h1>{tablet.name}</h1>
          <p>{tablet.description}</p>
          <p><strong>Price:</strong> {tablet.price}</p>
          <p><strong>Color:</strong> {tablet.color}</p>
          <p><strong>Storage:</strong> {tablet.storage}</p> {/* Storage bilgisini buraya ekledik */}
        </div>
      </div>
    </div>
  );
};

export default TabletDetail;
