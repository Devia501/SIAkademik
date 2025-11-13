import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ============================================
// 📝 TYPES & INTERFACES
// ============================================
export interface LoginCredentials {
  email: string;
  password: string;
  recaptchaToken?: string; // TAMBAHKAN: Field opsional untuk reCAPTCHA
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone?: string;
}

export interface User {
// ... (User interface tidak berubah)
  id: number;
  name: string;
  email: string;
  role: 'pendaftar' | 'manager' | 'admin';
  phone?: string;
  email_verified_at?: string | null;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  token: string;
  user: User;
  message?: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  email: string;
  token: string;
  password: string;
  password_confirmation: string;
}

// ============================================
// 🔐 AUTH SERVICE
// ============================================
export const authService = {
  /**
   * Login user
   * POST /api/login
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      // PERBAIKAN: Payload harus mengirim g-recaptcha-response
      const payload = {
        email: credentials.email,
        password: credentials.password,
        'g-recaptcha-response': credentials.recaptchaToken, 
      };

      // POST /api/login merespons dengan { data: { token, user } }
      const response = await api.post<{ data: AuthResponse } | AuthResponse>('/login', payload);
      
      // PERBAIKAN PARSING: Mengambil data dari properti 'data' atau langsung dari response.data
      const authData = (response.data as any).data || response.data; 
      
      if (authData.token) {
        await AsyncStorage.setItem('token', authData.token);
        await AsyncStorage.setItem('user', JSON.stringify(authData.user));
        console.log('✅ Token saved to AsyncStorage');
      }
      
      return authData;
    } catch (error: any) {
      console.error('❌ Login error:', error.response?.data || error.message);
      throw error;
    }
  },

  /**
   * Register new user (default role: pendaftar)
   * POST /api/register
   */
  register: async (data: RegisterData): Promise<AuthResponse> => {
    try {
      // POST /api/register merespons dengan { data: { token, user } }
      const response = await api.post<{ data: AuthResponse } | AuthResponse>('/register', data);
      
      // PERBAIKAN PARSING: Mengambil data dari properti 'data' atau langsung dari response.data
      const authData = (response.data as any).data || response.data;

      if (authData.token) {
        await AsyncStorage.setItem('token', authData.token);
        await AsyncStorage.setItem('user', JSON.stringify(authData.user));
        console.log('✅ Registration successful, token saved');
      }
      
      return authData;
    } catch (error: any) {
      console.error('❌ Register error:', error.response?.data || error.message);
      throw error;
    }
  },
  /**
   * Logout user
   * POST /api/logout
   */
  logout: async (): Promise<void> => {
    try {
      await api.post('/logout');
      console.log('✅ Logout API call successful');
    } catch (error: any) {
      console.error('⚠️ Logout API error (proceeding anyway):', error.message);
    } finally {
      // Always clear local data
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      console.log('✅ Local auth data cleared');
    }
  },

  /**
   * Get current authenticated user
   * GET /api/user
   */
  getCurrentUser: async (): Promise<User> => {
    try {
      const response = await api.get<User>('/user');
      
      // Update stored user data
      await AsyncStorage.setItem('user', JSON.stringify(response.data));
      
      return response.data;
    } catch (error: any) {
      console.error('❌ Get current user error:', error.response?.data || error.message);
      throw error;
    }
  },

  /**
   * Check if user is authenticated (has valid token)
   */
  isAuthenticated: async (): Promise<boolean> => {
    try {
      const token = await AsyncStorage.getItem('token');
      return !!token;
    } catch (error) {
      console.error('❌ Error checking authentication:', error);
      return false;
    }
  },

  /**
   * Get stored user from AsyncStorage (offline)
   */
  getStoredUser: async (): Promise<User | null> => {
    try {
      const userStr = await AsyncStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('❌ Error getting stored user:', error);
      return null;
    }
  },

  /**
   * Forgot password - send reset link
   * POST /api/forgot-password
   */
  forgotPassword: async (data: ForgotPasswordData): Promise<{ message: string }> => {
    try {
      const response = await api.post<{ message: string }>('/forgot-password', data);
      console.log('✅ Password reset email sent');
      return response.data;
    } catch (error: any) {
      console.error('❌ Forgot password error:', error.response?.data || error.message);
      throw error;
    }
  },

  /**
   * Reset password with token
   * POST /api/reset-password
   */
  resetPassword: async (data: ResetPasswordData): Promise<{ message: string }> => {
    try {
      const response = await api.post<{ message: string }>('/reset-password', data);
      console.log('✅ Password reset successful');
      return response.data;
    } catch (error: any) {
      console.error('❌ Reset password error:', error.response?.data || error.message);
      throw error;
    }
  },

  /**
   * Check if user has specific role(s)
   */
  hasRole: async (roles: string[]): Promise<boolean> => {
    try {
      const user = await authService.getStoredUser();
      return user ? roles.includes(user.role) : false;
    } catch (error) {
      console.error('❌ Error checking role:', error);
      return false;
    }
  },

  /**
   * Check if user is admin
   */
  isAdmin: async (): Promise<boolean> => {
    return authService.hasRole(['admin']);
  },

  /**
   * Check if user is manager or admin
   */
  isManagerOrAdmin: async (): Promise<boolean> => {
    return authService.hasRole(['manager', 'admin']);
  },

  /**
   * Check if user is pendaftar (applicant)
   */
  isPendaftar: async (): Promise<boolean> => {
    return authService.hasRole(['pendaftar']);
  },
};