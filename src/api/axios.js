import axios from 'axios';

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: BASE_API_URL,
  headers: {
    'Access-Control-Allow-Credentials': true
  }
});

export default axiosInstance;