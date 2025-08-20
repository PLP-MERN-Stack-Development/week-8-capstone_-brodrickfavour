// frontend/src/api.js
import axios from 'axios';

// This function determines the API base URL based on the environment.
const getBaseURL = () => {
  // In a production build (npm run build), Vite sets import.meta.env.PROD to true.
  if (import.meta.env.PROD) {
    // Use the production URL from environment variables, fallback to a default if not set
    return import.meta.env.VITE_API_URL || 'https://backend-production-adb6.up.railway.app/';
  }
  // In development, use local backend
  return 'http://localhost:5000';
};

const api = axios.create({
  baseURL: getBaseURL(),
});

// Add a request interceptor to include the JWT token

export default api;
