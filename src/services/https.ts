import axios from 'axios';
import { Http } from '@capacitor-community/http';
import config from '../config/config';

// const https = axios.create({
//   baseURL: config.baseURL,
//   headers: {
//     'Content-Type': 'application/json'
//   }
// });



const createRequest = (method, url, data?) => {
  const options = {
    method: method,
    url: `${config.baseURL}${url}`,
    headers: {
      'Content-Type': 'application/json',
      
    },
    data: data,
  };

  return Http.request(options);
};

const https = {
  get: (url) => createRequest('GET', url, {}),
  post: (url, data?) => createRequest('POST', url, data),
  put: (url, data) => createRequest('PUT', url, data),
  delete: (url) => createRequest('DELETE', url, {}),
};

export default https;