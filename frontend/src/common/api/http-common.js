import axios from 'axios';

export default axios.create({
  baseURL: '/',
  header: {
    Authorization: '',
  },
});
