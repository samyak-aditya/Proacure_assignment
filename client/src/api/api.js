// api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Replace with your API base URL

// Define an API function to send login data
  const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Define an API function to send signup data
 const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export {login, signup};