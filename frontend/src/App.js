// src/App.js
import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Register from './Register';
import Phones from './Phones';
import Earphones from './Earphones';
import Computers from './Computers';
import Tablets from './Tablets';
import UserInfo from './user_info/UserInfo.js';
import CategoryList from './CategoryList';
import Cart from './Cart';

const App = () => {
  const [isCategoryOpen, setCategoryOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const cartRef = useRef();  // 👉 mini-cart için ref

  const toggleCategoryList = () => {
    setCategoryOpen(!isCategoryOpen);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    navigate('/');
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (productId, amount) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(item.quantity + amount, 1) }
          : item
      )
    );
  };

  const removeItem = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  // 👉 dış tıklama ile mini-cart kapatma
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setCartOpen(false);
      }
    };

    if (isCartOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCartOpen]);

  return (
    <div className="app">
      {/* Kategori menüsü */}
      {!isAuthPage && (
        <>
          <div className="hamburger-menu" onClick={toggleCategoryList}>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
          <CategoryList isOpen={isCategoryOpen} toggleCategoryList={toggleCategoryList} />
        </>
      )}

      {/* Sağ üst ikonlar */}
      {!isAuthPage && (
        <div className="header-icons">
          {/* Sepet ikonu */}
          <div className="cart-icon" onClick={() => setCartOpen(!isCartOpen)}>
            🛒
            {cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}
            {isCartOpen && (
              <div className="mini-cart" ref={cartRef}>
                {cartItems.length === 0 ? (
                  <p>Your Cart is Empty</p>
                ) : (
                  <>
                    <ul>
                      {cartItems.map((item) => (
                        <li key={item.id}>
                          {item.name || item.title} x {item.quantity} ({item.price} $)
                        </li>
                      ))}
                    </ul>
                    <p><strong>Total:</strong> {cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)} $</p>
                    <button onClick={() => navigate('/cart')}>Go to the Cart</button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Kullanıcı ikonu */}
          <UserInfo 
            userEmail={user?.email} 
            onLogout={handleLogout} 
            onLogin={() => navigate('/login')}
          />
        </div>
      )}

      {/* İçerik */}
      <div className="content">
        <Routes>
          <Route path="/" element={<div className="welcome-text"><h1>Welcome to TechMarket{user ? `, ${user.name}!` : '!'}</h1></div>} />
          <Route path="/computers" element={<Computers addToCart={addToCart} />} />
          <Route path="/earphones" element={<Earphones addToCart={addToCart} />} />
          <Route path="/phones" element={<Phones addToCart={addToCart} />} />
          <Route path="/tablets" element={<Tablets addToCart={addToCart} />} />
          <Route path="/cart" element={
            <Cart
              cartItems={cartItems}
              updateQuantity={updateQuantity}
              removeItem={removeItem}
              clearCart={clearCart}
            />
          } />
          <Route path="/about" element={<h1>About Us</h1>} />
          <Route path="/services" element={<h1>Our Services</h1>} />
          <Route path="/contact" element={<h1>Contact Us</h1>} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>

      {/* Footer */}
      {!isAuthPage && (
        <footer>
          <nav>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/services" className="nav-link">Services</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
            <Link to="/cart" className="nav-link">Cart</Link>
          </nav>
        </footer>
      )}
    </div>
  );
};

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
