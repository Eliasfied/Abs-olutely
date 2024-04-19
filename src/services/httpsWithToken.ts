import axios from 'axios';
import config from '../config/config';

const httpsWithToken = axios.create({
  baseURL: config.baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

httpsWithToken.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt');
  if (token) {
    config.headers.Authorization = 'Bearer ' + token;
  }
  return config;
});

export default httpsWithToken;