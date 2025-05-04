import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Register from './Register';
import Phones from './Phones';
import Earphones from './Earphones';
import Computers from './Computers';
import Tablets from './Tablets';
import UserInfo from './user_info/UserInfo.js';
import CategoryList from './CategoryList';

const App = () => {
  const [isCategoryOpen, setCategoryOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

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

  // Auth sayfaları kontrolü (login/register)
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  // Ürün sayfaları kontrolü
  const isProductPage = [
    '/computers',
    '/earphones',
    '/phones',
    '/tablets',
    '/about',
    '/services',
    '/contact'
  ].includes(location.pathname);

  return (
    <div className="app">
      {/* Kategori Menüsü (sadece auth sayfalarında değilken göster) */}
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

      {/* Ana İçerik */}
      <div className="content">
        <Routes>
          <Route path="/" element={
            <div className="welcome-text">
              <h1>Welcome to TechMarket{user ? `, ${user.name}!` : '!'}</h1>
            </div>
          } />
          <Route path="/computers" element={<Computers />} />
          <Route path="/earphones" element={<Earphones />} />
          <Route path="/phones" element={<Phones />} />
          <Route path="/tablets" element={<Tablets />} />
          <Route path="/about" element={<h1>About Us</h1>} />
          <Route path="/services" element={<h1>Our Services</h1>} />
          <Route path="/contact" element={<h1>Contact Us</h1>} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>

      {/* Footer (sadece auth sayfalarında değilken göster) */}
      {!isAuthPage && (
        <footer>
          <nav>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/services" className="nav-link">Services</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
          </nav>
        </footer>
      )}

      {/* UserInfo (Auth sayfaları hariç TÜM sayfalarda göster) */}
      {!isAuthPage && (
        <UserInfo 
          userEmail={user?.email} 
          onLogout={handleLogout} 
          onLogin={() => navigate('/login')}
        />
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