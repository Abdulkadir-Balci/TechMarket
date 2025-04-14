import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CategoryList from './CategoryList';
import Phones from './Phones';
import PhoneDetail from './PhoneDetail';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CategoryList />} />
        <Route path="/subcategory/apple-phones" element={<Phones />} />
        <Route path="/phone/:phoneId" element={<PhoneDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
