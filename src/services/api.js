import axios from 'axios';

const api = axios.create({
  baseURL: 'https://webescola-api.herokuapp.com',
});

export default api;