import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import './user_info/UserInfo.css';
import HomePage from './HomePage';
import Phones from './Phones';
import Tablets from './Tablets';
import PhoneDetail from './PhoneDetail';
import TabletDetail from './TabletDetail';
import Cart from './Cart';
import UserInfo from './user_info/UserInfo.js'; 
import Login from './Login';
import Register from './Register';
import CategoryList from './CategoryList';

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
  // Diğer ürünler burada yer alacak
};

const App = () => {
  const [user, setUser] = useState(null);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  // Kullanıcı girişi ve çıkışı işlemleri
  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  // Sepete ürün ekleme, artırma, azaltma ve silme işlemleri
  const handleAddToCart = (productId) => {
    const product = availableProducts[productId];

    // Sepette bu ürün var mı kontrol et
    const existingProductIndex = cartData.findIndex(item => item.productId === productId);

    if (existingProductIndex > -1) {
      const updatedCart = [...cartData];
      if (updatedCart[existingProductIndex].quantity < 10) {
        updatedCart[existingProductIndex].quantity += 1;
        setCartData(updatedCart);
      }
    } else {
      setCartData([...cartData, { productId, quantity: 1, ...product }]);
    }
  };

  const handleDecreaseQuantity = (productId) => {
    const updatedCart = cartData.map(item => {
      if (item.productId === productId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartData(updatedCart);
  };

  const handleIncreaseQuantity = (productId) => {
    const updatedCart = cartData.map(item => {
      if (item.productId === productId && item.quantity < 10) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartData(updatedCart);
  };

  const handleRemoveFromCart = (productId) => {
    const updatedCartData = cartData.filter(item => item.productId !== productId);
    setCartData(updatedCartData);
  };

  return (
    <div className="app">
      {/* Main Content */}
      <div className="content">
        <Routes>
          <Route path="/" element={<HomePage cartData={cartData} />} />
          <Route path="/phones" element={user ? <Phones handleAddToCart={handleAddToCart} /> : <Navigate to="/login" replace />} />
          <Route path="/tablets" element={user ? <Tablets handleAddToCart={handleAddToCart} /> : <Navigate to="/login" replace />} />
          <Route path="/phone/:phoneId" element={user ? <PhoneDetail handleAddToCart={handleAddToCart} availableProducts={availableProducts} /> : <Navigate to="/login" replace />} />
          <Route path="/tablet/:tabletId" element={user ? <TabletDetail handleAddToCart={handleAddToCart} availableProducts={availableProducts} /> : <Navigate to="/login" replace />} />
          <Route path="/cart" element={user ? <Cart cartData={cartData} handleRemoveFromCart={handleRemoveFromCart} handleIncreaseQuantity={handleIncreaseQuantity} handleDecreaseQuantity={handleDecreaseQuantity} /> : <Navigate to="/login" replace />} />
          
          {/* Authentication Routes */}
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          
          {/* Dummy Pages */}
          <Route path="/about" element={user ? <h1>About Us</h1> : <Navigate to="/login" replace />} />
          <Route path="/services" element={user ? <h1>Our Services</h1> : <Navigate to="/login" replace />} />
          <Route path="/contact" element={user ? <h1>Contact Us</h1> : <Navigate to="/login" replace />} />
        </Routes>
      </div>

      {/* Footer and User Info */}
      {user && (
        <>
          <UserInfo userEmail={user.email} onLogout={handleLogout} />
          <footer>
            <nav>
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/about" className="nav-link">About</Link>
              <Link to="/services" className="nav-link">Services</Link>
              <Link to="/contact" className="nav-link">Contact</Link>
            </nav>
          </footer>
        </>
      )}
    </div>
  );
};

function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWithRouter;
