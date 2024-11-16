// axiosConfig.js
import axios from 'axios';

//Local Backend URL: http://localhost:9000
const axiosInstance = axios.create({
  baseURL: 'https://api.mayberryminitrucks.com',
  timeout: 45000, //45 Second Request Timeout
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});



// Add a request interceptor to add CSRF token to all non-GET requests
axiosInstance.interceptors.request.use(async (config) => {
  // Only add CSRF token for state-changing methods
  if (config.method !== 'get') {
    try {
      // Get the CSRF token from the cookie if it exists
      const csrfToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('PLAY_CSRF_TOKEN'))
        ?.split('=')[1];

      if (csrfToken) {
        config.headers['Csrf-Token'] = csrfToken;
      }
    } catch (error) {
      console.error('Error setting CSRF token:', error);
    }
  }
  return config;
});

export default axiosInstance;
