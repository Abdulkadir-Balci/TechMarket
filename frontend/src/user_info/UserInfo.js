import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './UserInfo.css';

const UserInfo = ({ userEmail, onLogout, onLogin }) => {  
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (userEmail) {
      setLoading(true);
      setError(null);
      
      axios.post('http://localhost:8080/getUserByEmail', { email: userEmail })
        .then(response => {
          setUser(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error("User fetch error:", error);
          setError("Kullanıcı bilgileri yüklenirken hata oluştu");
          setLoading(false);
        });
    } else {
      setUser(null); // Kullanıcı yoksa state'i temizle
    }
  }, [userEmail]);

  const toggleUserInfo = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className="user-info-container" ref={popupRef}>
      <div 
        className={`user-icon ${isOpen ? 'active' : ''}`} 
        onClick={toggleUserInfo}
        title={user ? "Kullanıcı bilgileri" : "Giriş yap"}
      >
        {user ? (
          <span className="avatar">{user.name.charAt(0).toUpperCase()}</span>
        ) : (
          <span>👤</span>
        )}
      </div>

      {isOpen && (
        <div className="user-info-popup">
          {loading ? (
            <div className="loading-message">Yükleniyor...</div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : user ? (
            <>
              <div className="user-header">
                <div className="user-avatar">{user.name.charAt(0).toUpperCase()}</div>
                <h3>{user.name}</h3>
              </div>
              <div className="user-details">
                <p><strong>Email:</strong> {user.email}</p>
                {user.role && <p><strong>User Role:</strong> {user.role}</p>}
                {user.joinDate && <p><strong>Join Date:</strong> {new Date(user.joinDate).toLocaleDateString()}</p>}
              </div>
              <button className="auth-button" onClick={onLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <div className="no-user">Giriş yapılmamış</div>
              <button className="auth-button" onClick={onLogin}>
                Login
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UserInfo;