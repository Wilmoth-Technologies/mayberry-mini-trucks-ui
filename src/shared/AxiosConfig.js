// axiosConfig.js
import axios from 'axios';

//Local Backend URL: http://localhost:9000

const axiosInstance = axios.create({
  baseURL: 'https://mayberry-mini-trucks-api.dev.kubernetes-wilmoth.com',
  timeout: 30000, //30 Second Request Timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
