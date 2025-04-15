import UserInfo from './user_info/UserInfo.js'; // UserInfo bileşenini import ettik
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Register from './Register';
import Tablets from './Tablets';  // Tablets bileşenini import ettik
import TabletDetail from './TabletDetail';  // TabletDetail bileşenini import ettik
import Phones from './Phones';
import PhoneDetail from './PhoneDetail';
import './user_info/UserInfo.css';
import CategoryList from './CategoryList';

const App = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="app">


      {/* Main Content */}
      <div className="content">
        <Routes>
          <Route path="/" element={<CategoryList />} />
          <Route path="/tablets" element={user ? <Tablets /> : <Navigate to="/login" replace />}  />
          <Route path="/tablet/:tabletId"  element={user ? <TabletDetail /> : <Navigate to="/login" replace />} />
          <Route path="/phones" element={user ? <Phones /> : <Navigate to="/login" replace />}  /> {/* Phones route ekledik */}
          <Route path="/phone/:phoneId" element={user ? <PhoneDetail /> : <Navigate to="/login" replace />} /> {/* Phone detail sayfası */}
          <Route path="/about" element={user ? <h1>About Us</h1> : <Navigate to="/login" replace />}  />
          <Route path="/services" element={user ? <h1>Our Services</h1> : <Navigate to="/login" replace />}  />
          <Route path="/contact" element={user ? <h1>Contact Us</h1> : <Navigate to="/login" replace />}  />

          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />

          <Route path="/subcategory/apple-phones" element={<Phones />} />
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