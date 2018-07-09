import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.gotinder.com',
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json'
  },
  responseType: 'json'
});

const token = localStorage.getItem('auth-token');

console.log('auth-token', token);

if (token !== null) {
  axiosInstance.defaults.headers.common['X-Auth-Token'] = token;
}

export default axiosInstance;
