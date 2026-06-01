import axios from 'axios';

// Create an Axios instance with base URL and default headers
const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Save organization configuration.
 * @param {Object} data - The organization setup data collected from the form.
 * @returns {Promise} Axios response promise.
 */
export const saveOrgConfiguration = (data) => API.post('/org/setup', data);

/**
 * Retrieve current organization configuration.
 * @returns {Promise} Axios response promise.
 */
export const getOrgConfiguration = () => API.get('/org/setup');
