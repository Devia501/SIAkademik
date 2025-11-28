import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ============================================
// 🔧 KONFIGURASI API URL
// ============================================
// PILIH SALAH SATU sesuai device:

// Device Fisik (ganti dengan IP komputer Anda)
const API_URL = 'http://172.27.86.208:8000/api'; // <--- PASTIKAN IP INI BENAR!

console.log('🌐 API URL:', API_URL);

// ============================================
// 🔧 AXIOS INSTANCE
// ============================================
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 15000, // 15 detik timeout
});

// ============================================
// 📤 REQUEST INTERCEPTOR (FINAL FIX)
// ============================================
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('token');
      
      // 🎯 PERBAIKAN: Gunakan template literal dan fallback ke string kosong untuk fullUrl
      const fullUrl = `${api.defaults.baseURL || ''}${config.url || ''}`; 

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        // 🎯 PERBAIKAN LOG: Menggunakan optional chaining (?.) untuk menghindari error
        const role = config.url?.startsWith('/registration') ? 'Pendaftar' : 'Admin/Lain';
        console.log(`🔒 Token Found. Role: ${role}`);
      } else {
        console.log('🔓 No Token Found. This may cause 401/404 on protected routes.');
      }
      
      // Log request untuk debugging 
      console.log(`📤 ${config.method?.toUpperCase()} ${config.url} -> ${fullUrl}`);
      if (config.data) {
        // Log data request (potong jika terlalu panjang)
        console.log('   Data:', JSON.stringify(config.data).substring(0, 100));
      }
      
    } catch (error) {
      console.error('❌ Error getting token:', error);
    }
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

// ============================================
// 📥 RESPONSE INTERCEPTOR
// ============================================
api.interceptors.response.use(
  (response) => {
    // Log response sukses
    console.log(`✅ ${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status}`);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle network error (no response)
    if (!error.response) {
      console.error('❌ Network Error: Tidak dapat terhubung ke server');
      return Promise.reject({
        message: 'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.',
        isNetworkError: true,
      });
    }

    const status = error.response?.status;
    console.error(`❌ ${originalRequest?.method?.toUpperCase()} ${originalRequest?.url} - ${status}`);

    // Handle 401 Unauthorized (token expired/invalid)
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      console.log('🔒 Token expired or invalid, logging out...');
      
      // Clear auth data
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      
      // Di AuthContext, Anda dapat menambahkan logika untuk mengarahkan ke halaman Login
    }

    // Handle 403 Forbidden (insufficient permissions)
    if (status === 403) {
      console.error('🚫 Forbidden: Insufficient permissions');
    }

    // Handle 422 Validation Error
    if (status === 422) {
      console.error('⚠️ Validation Error:', error.response.data?.errors);
    }

    // Handle 429 Too Many Requests
    if (status === 429) {
      console.error('⏱️ Too many requests. Please try again later.');
    }

    // Handle 500 Server Error
    if (status === 500) {
      console.error('💥 Server Error:', error.response.data?.message);
    }

    return Promise.reject(error);
  }
);

export default api;