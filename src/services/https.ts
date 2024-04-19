import axios from 'axios';
import config from '../config/config';

const https = axios.create({
  baseURL: config.baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default https;