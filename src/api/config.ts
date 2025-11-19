import axios from 'axios';

const LASTFM_API_KEY = import.meta.env.VITE_LASTFM_API_KEY;
const LASTFM_BASE_URL = import.meta.env.VITE_LASTFM_BASE_URL;

export const apiClient = axios.create({
  baseURL: LASTFM_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to add Last.fm API parameters
apiClient.interceptors.request.use(
  (config) => {
    // Last.fm API uses query parameters
    config.params = {
      ...config.params,
      api_key: LASTFM_API_KEY,
      format: 'json'
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    if (response.data?.error) {
      const errorMessage = response.data.message || `Last.fm API Error: ${response.data.error}`;
      return Promise.reject(new Error(errorMessage));
    }
    return response;
  },
  (error) => {
    if (error.response) {
      const message = error.response.data?.message || error.response.statusText || 'An error occurred';
      return Promise.reject(new Error(message));
    } else if (error.request) {
      return Promise.reject(new Error('Network error. Please check your connection.'));
    } else {
      return Promise.reject(new Error(error.message || 'An unexpected error occurred'));
    }
  }
);
