import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Register from './Register';
import Phones from './Phones';
import Earphones from './Earphones';
import Computers from './Computers';
import UserInfo from './user_info/UserInfo.js';
import CategoryList from './CategoryList';  // Kategoriler Listesini Import Ediyoruz

const App = () => {
  const [isCategoryOpen, setCategoryOpen] = useState(false); // Kategoriler barı açık mı?
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const toggleCategoryList = () => {
    setCategoryOpen(!isCategoryOpen);  // Kategorileri açma/kapama işlemi
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
          {/* Hamburger Menü butonu */}
          <div className="hamburger-menu" onClick={toggleCategoryList}>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>

          {/* Kategori Barı */}
          <CategoryList isOpen={isCategoryOpen} toggleCategoryList={toggleCategoryList} />
        </>
      )}

      {/* Main Content */}
      <div className="content">
        <Routes>
          <Route path="/computers" element={user ? <Computers /> : <Navigate to="/login" replace />} />
          <Route path="/earphones" element={user ? <Earphones /> : <Navigate to="/login" replace />} />
          <Route path="/" element={user ?(<div className="welcome-text"><h1>Welcome to TechMarket, {user.username}!</h1></div>): (<Navigate to="/login" replace />)} />
          <Route path="/phones" element={user ? <Phones /> : <Navigate to="/login" replace />} />
          <Route path="/about" element={user ? <h1>About Us</h1> : <Navigate to="/login" replace />} />
          <Route path="/services" element={user ? <h1>Our Services</h1> : <Navigate to="/login" replace />} />
          <Route path="/contact" element={user ? <h1>Contact Us</h1> : <Navigate to="/login" replace />} />
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
