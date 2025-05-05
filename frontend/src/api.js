import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api'; // Spring Boot backend'in adresi

export const fetchAllProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/products`);
    return response.data;
  } catch (error) {
    console.error('Ürünler alınırken hata oluştu:', error);
    return [];
  }
};

export const fetchAndSaveProducts = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/products/fetch`);
    return response.data;
  } catch (error) {
    console.error('API’den ürün çekerken hata oluştu:', error);
    return null;
  }
};
