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
    const token =  localStorage.getItem('genToken') ? localStorage.getItem('genToken') : localStorage.getItem('token') ? localStorage.getItem('token') : null;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
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
    if (error.response && error.response.status === 401) {
      console.log('Unauthorized! Please log in again.');
    } else if (error.response && error.response.status === 500) {
      console.log('Server error! Please try again later.');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
