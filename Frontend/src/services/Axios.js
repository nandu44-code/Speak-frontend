import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const api = axios.create({
  baseURL: 'http://localhost:8001'
});

const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    const response = await api.post('/login/refresh/', {
      refresh: refreshToken
    });

    const newAccessToken = response.data.access;
    localStorage.setItem('accessToken', newAccessToken);

    return newAccessToken;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    throw error;
  }
};

api.interceptors.request.use(async (config) => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    const decodedToken = jwtDecode(accessToken);
    const currentTime = Math.floor(Date.now() / 1000);
    console.log("entered here")
    if (decodedToken.exp < currentTime) {
      try {
        const newAccessToken = await refreshAccessToken();
        config.headers.Authorization = `Bearer ${newAccessToken}`;
      } catch (error) {
        console.error('Error setting new access token:', error);
      }
    } else {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }

  return config;
});

export default api;
