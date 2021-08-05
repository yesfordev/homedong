import axios from 'axios';
import { getToken } from './JWT-common';

const token = getToken();
if (token) {
  console.log('token', token);
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export default axios.create({
  baseURL: '/',
  headers: {
    'Content-Type': 'application/json',
  },
});
