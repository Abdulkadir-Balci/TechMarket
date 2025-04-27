import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate import edildi
import './HomePage.css';

const HomePage = ({ cartData }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const navigate = useNavigate(); // useNavigate hook'u oluşturuldu

  // Sidebar'ı göster/gizle fonksiyonu
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  // Kategoriye tıklanınca yönlendirme işlemi
  const navigateToCategory = (category) => {
    navigate(`/${category}`);
  };

  // Sepet sayfasına gitme
  const goToCart = () => {
    navigate('/cart');
  };

  return (
    <div className="app">
      <header>
        <h1>Home Page</h1>
      </header>

      <div className="hamburger-menu" onClick={toggleSidebar}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      {/* Sidebar sadece görünür olduğunda render edilir */}
      {isSidebarVisible && (
        <div className="sidebar">
          <h3>Kategoriler</h3>
          <div className="category-list">
            <button className="category-title" onClick={() => navigateToCategory('phones')}>
              Phones
            </button>
            <button className="category-title" onClick={() => navigateToCategory('tablets')}>
              Tablets
            </button>
            {/* Diğer kategori butonlarını burada ekleyebilirsiniz */}
          </div>
        </div>
      )}

      {/* Sepet İkonu */}
      <div className="cart-icon" onClick={goToCart}>
        🛒
        {cartData.length > 0 && <span className="cart-count">{cartData.length}</span>}
      </div>

      <div className="content">
        <div className="welcome-text">
          <h2>Welcome Tech-Market!</h2>
        </div>
        <div className="phone-list">
          {/* Telefon listesi veya diğer içerikler burada olacak */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
