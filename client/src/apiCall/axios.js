import axios from 'axios';
const BASE_URL = 'https://diaks-app.herokuapp.com';

export default axios.create({
  baseURL: BASE_URL,
});
