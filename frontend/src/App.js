import UserInfo from './user_info/UserInfo.js'; // UserInfo bileşenini import ettik
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Register from './Register';

import Phones from './Phones';
import Earphones from './Earphones'; 
import './user_info/UserInfo.css';
import Computers from './Computers';
const App = () => {
  const [isCategoryOpen, setCategoryOpen] = useState(false); // Kategori kısmı açık mı kapalı mı?
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const toggleCategoryList = () => {
    setCategoryOpen(!isCategoryOpen); // Kategoriyi açma veya kapama işlemi
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="app">
      {user && (
        <>
          <div className="hamburger-menu" onClick={toggleCategoryList}>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>

          {/* Sidebar ve Kategori Listesi */}
          {isCategoryOpen && (
            <div className="sidebar">
              <h3>Categories</h3>
              <div className="category-list">
              
                <Link to="/Phones">
                  <button className="category-title">Phones</button>
                </Link>
                <Link to="/Computers">
                  <button className="category-title">Computers</button>
                </Link>
                <Link to="/Earphones">
                  <button className="category-title">Earphones</button>
                </Link>
              </div>
            </div>  
          )}
        </>
      )}

      {/* Main Content */}
      <div className="content">
        <Routes>
        <Route path="/computers" element={user ? <Computers /> : <Navigate to="/login" replace />} />
        <Route path="/earphones" element={user ? <Earphones /> : <Navigate to="/login" replace />} />

          <Route path="/" element={user ?(<div className="welcome-text"><h1>Welcome to TechMarket, {user.username}!</h1></div>): (<Navigate to="/login" replace />)} />
          
         
          <Route path="/Phones" element={user ? <Phones /> : <Navigate to="/login" replace />}  /> {/* Phones route ekledik */}
          <Route path="/about" element={user ? <h1>About Us</h1> : <Navigate to="/login" replace />}  />
          <Route path="/services" element={user ? <h1>Our Services</h1> : <Navigate to="/login" replace />}  />
          <Route path="/contact" element={user ? <h1>Contact Us</h1> : <Navigate to="/login" replace />}  />

          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>

      {/* Footer */}
      {user && (
        <>
          {/* Kullanıcı Bilgisi Sağ Üst Köşede */}
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