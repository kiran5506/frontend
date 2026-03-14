import { baseURL } from '@/services/endpoints';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    let token = null;
    if (localStorage.getItem('genToken')) {
      token = localStorage.getItem('genToken');
    } else if (localStorage.getItem('token')) {
      token = localStorage.getItem('token');
    } else if (localStorage.getItem('adminToken')) {
      token = localStorage.getItem('adminToken');
    } else if (localStorage.getItem('cToken')) {
      token = localStorage.getItem('cToken');
    }
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    // If sending FormData, let the browser set the Content-Type header with boundary
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('Axios response error interceptor triggered:', error.response);
    if (error.response && error.response.status === 409) {
      console.log('Token expired! Logging out...');
      
      // Clear all tokens
      localStorage.removeItem('genToken');
      localStorage.removeItem('token');
      localStorage.removeItem('adminToken');
      
      // Clear persisted auth data
      localStorage.removeItem('persist:vendor');
      localStorage.removeItem('persist:admin');
      localStorage.removeItem('persist:genauth');
      
      // Redirect to login based on user type
      if (localStorage.getItem('userType') === 'admin') {
        window.location.href = '/admin';
      } else if (localStorage.getItem('userType') === 'vendor') {
        window.location.href = '/vendor';
      } else {
        window.location.href = '/login';
      }
    } else if (error.response && error.response.status === 500) {
      console.log('Server error! Please try again later.');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
