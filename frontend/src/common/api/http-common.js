import baseAxios from 'axios';
import { getToken } from './JWT-common';

const axios = baseAxios.create({
  baseURL: '/',
  headers: {
    'Content-Type': 'application/json',
  },
});

axios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${getToken()}`;
  return config;
});

export default axios;
