// src/services/userService.js

import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

export const signup = async (userData) => {
  const response = await axios.post(`${BASE_URL}/users`, userData);
  return response.data;
};

export const login = async (email, password) => {
  const response = await axios.get(`${BASE_URL}/users?email=${email}&password=${password}`);
  if (response.data.length > 0) {
    localStorage.setItem('user', JSON.stringify(response.data[0]));
    return response.data[0];
  } else {
    throw new Error('Invalid credentials');
  }
};

export const logout = () => {
  localStorage.removeItem('user');
};
