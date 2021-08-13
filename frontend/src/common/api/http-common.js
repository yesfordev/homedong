import baseAxios from 'axios';
import { getToken } from './JWT-common';

const axios = baseAxios.create({
  baseURL: 'http://i5a608.p.ssafy.io:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

axios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${getToken()}`;
  return config;
});

export default axios;
