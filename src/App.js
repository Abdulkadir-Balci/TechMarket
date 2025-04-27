import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import Phones from './Phones';
import Tablets from './Tablets';
import PhoneDetail from './PhoneDetail';
import TabletDetail from './TabletDetail';
import Cart from './Cart';

// Ürün verileri
const availableProducts = {
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
    image: 'https://m.media-amazon.com/images/I/51tL89Amu4L._AC_SL1500_.jpg',
    description: 'A high-performance tablet with a large screen and long battery life.',
    price: '4,299.00 TL',
    color: 'Blue',
    storage: '64GB',
  },
};

function App() {
  const [cartData, setCartData] = useState([]);

  // Sepete ürün ekleme fonksiyonu
  const handleAddToCart = (productId) => {
    const product = availableProducts[productId];

    // Sepette bu ürün var mı kontrol et
    const existingProductIndex = cartData.findIndex(item => item.productId === productId);

    if (existingProductIndex > -1) {
      // Eğer ürün zaten varsa, adetini artır
      const updatedCart = [...cartData];
      if (updatedCart[existingProductIndex].quantity < 10) {
        updatedCart[existingProductIndex].quantity += 1;
        setCartData(updatedCart);
      }
    } else {
      // Eğer ürün yoksa, sepete yeni ürün ekle ve adedini 1 olarak ayarla
      setCartData([...cartData, { productId, quantity: 1, ...product }]);
    }
  };

  // Adet azaltma fonksiyonu
  const handleDecreaseQuantity = (productId) => {
    const updatedCart = cartData.map(item => {
      if (item.productId === productId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartData(updatedCart);
  };

  // Adet artırma fonksiyonu
  const handleIncreaseQuantity = (productId) => {
    const updatedCart = cartData.map(item => {
      if (item.productId === productId && item.quantity < 10) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartData(updatedCart);
  };

  // Sepetteki ürünün adetini azaltma
  const handleRemoveFromCart = (productId) => {
    const updatedCartData = cartData.filter(item => item.productId !== productId);
    setCartData(updatedCartData);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage cartData={cartData} />} />
        <Route path="/phones" element={<Phones handleAddToCart={handleAddToCart} />} />
        <Route path="/tablets" element={<Tablets handleAddToCart={handleAddToCart} />} />
        <Route path="/phone/:phoneId" element={<PhoneDetail handleAddToCart={handleAddToCart} availableProducts={availableProducts} />} />
        <Route path="/tablet/:tabletId" element={<TabletDetail handleAddToCart={handleAddToCart} availableProducts={availableProducts} />} />
        <Route path="/cart" element={<Cart cartData={cartData} handleRemoveFromCart={handleRemoveFromCart} handleIncreaseQuantity={handleIncreaseQuantity} handleDecreaseQuantity={handleDecreaseQuantity} />} />
      </Routes>
    </Router>
  );
}

export default App;
