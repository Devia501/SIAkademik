import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// PILIH SALAH SATU sesuai device:
// Android Emulator
const API_URL = 'http://10.160.84.208/api';

// iOS Simulator
// const API_URL = 'http://localhost:8000/api';

// Device Fisik (ganti dengan IP komputer)
// const API_URL = 'http://192.168.x.x:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000,
});

// Request Interceptor - Tambahkan token ke setiap request
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error getting token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor - Handle errors globally
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired atau invalid, logout user
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      // Bisa trigger navigation ke login screen di sini jika perlu
    }
    
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;