import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001/api', 
});
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
        if (token) {
      config.headers['x-auth-token'] = token;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,  
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const response = await axios.post('http://localhost:5001/api/auth/refresh-token', {
          refreshToken,
        });

        const newAccessToken = response.data.accessToken;
        localStorage.setItem('accessToken', newAccessToken);

        originalRequest.headers['x-auth-token'] = newAccessToken;

        return api(originalRequest);
      } catch (error) {
        console.error('Token refresh failed:', error);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login'; 
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
