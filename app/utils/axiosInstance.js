import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.gotinder.com',
  timeout: 20000,
  headers: { 'Content-Type': 'application/json' },
  responseType: 'json'
});
