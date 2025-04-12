import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Tablets from './Tablets';  // Tablets bileşenini import ettik
import TabletDetail from './TabletDetail';  // TabletDetail bileşenini import ettik
import Phones from './Phones';
import PhoneDetail from './PhoneDetail';
const App = () => {
  const [isCategoryOpen, setCategoryOpen] = useState(false); // Kategori kısmı açık mı kapalı mı?

  const toggleCategoryList = () => {
    setCategoryOpen(!isCategoryOpen); // Kategoriyi açma veya kapama işlemi
  };

  return (
    <Router>
      <div className="app">
        {/* Hamburger Menüsü (üç çizgi) */}
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
              <Link to="/tablets">
                <button className="category-title">Tablets</button>
              </Link>
              <Link to="/phones">
                <button className="category-title">Phones</button>
              </Link>
              <Link to="/computers">
                <button className="category-title">Computers</button>
              </Link>
              <Link to="/earphones">
                <button className="category-title">Earphones</button>
              </Link>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="content">
          <Routes>
            <Route path="/" element={<div className="welcome-text"><h1>Welcome to TechMarket!</h1></div>} />
            <Route path="/tablets" element={<Tablets />} />
            <Route path="/tablet/:tabletId" element={<TabletDetail />} />
            <Route path="/phones" element={<Phones />} /> {/* Phones route ekledik */}
            <Route path="/phone/:phoneId" element={<PhoneDetail />} /> {/* Phone detail sayfası */}
            <Route path="/about" element={<h1>About Us</h1>} />
            <Route path="/services" element={<h1>Our Services</h1>} />
            <Route path="/contact" element={<h1>Contact Us</h1>} />
          </Routes>
        </div>

        {/* Footer */}
        <footer>
          <nav>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/services" className="nav-link">Services</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
          </nav>
        </footer>
      </div>
    </Router>
  );
};

export default App;
