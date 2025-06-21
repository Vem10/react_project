import axios from 'axios';

const BASE_URL = 'http://localhost:3001'; // Adjust if using port 3001

export const popularProducts = async () => {
  const res = await axios.get(`${BASE_URL}/products?category=bridal&_limit=4`);
  return res.data;
};

export const trendyProducts = async () => {
  const res = await axios.get(`${BASE_URL}/products?_sort=id&_order=desc&_limit=4`);
  return res.data;
};

export const getProducts = async () => {
  const response = await axios.get(`${BASE_URL}/products`);
  return response.data;
};

export const getProductById = async (id) => {
  const response = await axios.get(`${BASE_URL}/products/${id}`);
  return response.data;
};

export const searchProduct = async (query) => {
  const response = await axios.get(`${BASE_URL}/products?q=${query}`);
  return response.data;
};

export const addToCart = async (cartData) => {
  const response = await axios.post(`${BASE_URL}/cart`, cartData);
  return response.data;
};

export const getCartList = async (userId) => {
  const response = await axios.get(`${BASE_URL}/cart?userId=${userId}`);
  return response.data;
};

export const removeCartItem = async (id) => {
  const response = await axios.delete(`${BASE_URL}/cart/${id}`);
  return response.data;
};

export const placeOrder = async (orderData) => {
  const response = await axios.post(`${BASE_URL}/orders`, orderData);
  return response.data;
};

export const getOrders = async (userId) => {
  const response = await axios.get(`${BASE_URL}/orders?userId=${userId}`);
  return response.data;
};

export const cancelOrder = async (orderId) => {
  const response = await axios.delete(`${BASE_URL}/orders/${orderId}`);
  return response.data;
};
