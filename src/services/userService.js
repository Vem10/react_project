// src/services/userService.js

import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

export const signup = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/users`, userData);
    return response.data;
  } catch (error) {
    console.error("Error during signup:", error);
    throw error; // Re-throw to be handled by the calling component
  }
};

export const login = async (email, password) => {
  try {
    // In a real application, you would send a POST request to your authentication endpoint
    // and your backend would verify credentials and return a user object or token.
    // For json-server, we're simulating by checking local users.
    const response = await axios.get(`${BASE_URL}/users?email=${email}&password=${password}`);

    if (response.data.length > 0) {
      const user = response.data[0];
      localStorage.setItem('user', JSON.stringify(user));
      // <--- START CHANGE HERE (userService.js) --->
      // Dispatch the custom event after successful login
      window.dispatchEvent(new Event('userChanged'));
      // <--- END CHANGE HERE (userService.js) --->
      return user;
    } else {
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    console.error("Error during login:", error);
    throw error; // Re-throw to be handled by the calling component
  }
};

export const logout = () => {
  localStorage.removeItem('user');
  // <--- START CHANGE HERE (userService.js) --->
  // Dispatch the custom event after logout
  window.dispatchEvent(new Event('userChanged'));
  // <--- END CHANGE HERE (userService.js) --->
};
