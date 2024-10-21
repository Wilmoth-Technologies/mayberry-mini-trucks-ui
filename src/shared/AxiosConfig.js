// axiosConfig.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:9000',
  timeout: 10000, //10 Second Request Timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
