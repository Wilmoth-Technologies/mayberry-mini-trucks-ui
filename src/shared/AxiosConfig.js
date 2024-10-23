// axiosConfig.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://mayberry-mini-trucks-api.dev.kubernetes-wilmoth.com',
  timeout: 10000, //10 Second Request Timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
