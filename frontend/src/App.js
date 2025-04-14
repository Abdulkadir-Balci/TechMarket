import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Register from './Register';
import Tablets from './Tablets';  // Tablets bileşenini import ettik
import TabletDetail from './TabletDetail';  // TabletDetail bileşenini import ettik
import Phones from './Phones';
import PhoneDetail from './PhoneDetail';
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
        {/* Hamburger Menüsü (üç çizgi) */}
        {user &&(
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
            <button onClick={handleLogout} className="logout-button">Logout</button>   
          </div>  
        )}
        </>
        )}

        {/* Main Content */}
        <div className="content">
          <Routes>
            <Route path="/" element={user ?(<div className="welcome-text"><h1>Welcome to TechMarket, {user.username}!</h1></div>): (<Navigate to="/login" replace />)} />
            <Route path="/tablets" element={user ? <Tablets /> : <Navigate to="/login" replace />}  />
            <Route path="/tablet/:tabletId"  element={user ? <TabletDetail /> : <Navigate to="/login" replace />} />
            <Route path="/phones" element={user ? <Phones /> : <Navigate to="/login" replace />}  /> {/* Phones route ekledik */}
            <Route path="/phone/:phoneId" element={user ? <PhoneDetail /> : <Navigate to="/login" replace />} /> {/* Phone detail sayfası */}
            <Route path="/about" element={user ? <h1>About Us</h1> : <Navigate to="/login" replace />}  />
            <Route path="/services" element={user ? <h1>Our Services</h1> : <Navigate to="/login" replace />}  />
            <Route path="/contact" element={user ? <h1>Contact Us</h1> : <Navigate to="/login" replace />}  />

            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>

        {/* Footer */}
        {user && (
          <footer>
            <nav>
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/about" className="nav-link">About</Link>
              <Link to="/services" className="nav-link">Services</Link>
              <Link to="/contact" className="nav-link">Contact</Link>
            </nav>
          </footer>
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
