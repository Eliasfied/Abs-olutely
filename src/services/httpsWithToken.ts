import axios from 'axios';
import { Http } from '@capacitor-community/http';

import config from '../config/config';

// const httpsWithToken = axios.create({
//   baseURL: config.baseURL,
//   headers: {
//     'Content-Type': 'application/json'
//   }
// });

// httpsWithToken.interceptors.request.use((config) => {
//   const token = localStorage.getItem('jwt');
//   if (token) {
//     config.headers.Authorization = 'Bearer ' + token;
//   }
//   return config;
// });

// Adding a function to retrieve the JWT token
const getToken = () => {
  const token = localStorage.getItem('jwt');
  if(token) {
    return token;
  }
};

interface RequestOptions {
  method: string;
  url: string;
  headers: {
    'Content-Type': string;
    Authorization: string;
  };
  data?: any;
}

const createRequest = (method: string, url: string, data?: any) => {
  const token = getToken();
  const options: RequestOptions = { 
    method: method,
    url: `${config.baseURL}${url}`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  };
  if (data) {
    options.data = data;
  }

  return Http.request(options);
}

const httpsWithToken = {
  get: (url) => createRequest('GET', url),
  post: (url, data?) => createRequest('POST', url, data),
  put: (url, data) => createRequest('PUT', url, data),
  delete: (url) => createRequest('DELETE', url),
};

export default httpsWithToken;