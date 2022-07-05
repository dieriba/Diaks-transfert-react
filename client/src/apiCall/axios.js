import axios from 'axios';
// const BASE_URL = 'https://diaks-reacst.herokuapp.com';
const BASE_URL = 'http://localhost:1000';
export default axios.create({
  baseURL: BASE_URL,
});
