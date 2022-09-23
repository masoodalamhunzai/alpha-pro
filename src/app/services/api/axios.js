import axios from 'axios';
import { settings as s } from '../Settings';

const token = localStorage.getItem('token');

const axiosInstance = axios.create({
  baseURL: s.baseUrl,
  timeout: 1000,
  headers: token
    ? {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    : {
        'Content-Type': 'application/json',
      },
});

export default axiosInstance;
