import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'pendaftar';
  phone?: string;
}

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'manager' | 'pendaftar';
  phone?: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const checkUserLoggedIn = async () => {
    try {
      const userData = await AsyncStorage.getItem('@user');
      const token = await AsyncStorage.getItem('@token');
      
      if (userData && token) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      // TODO: Implement API call
      // const response = await api.post('/login', { email, password });
      // const { user, token } = response.data;
      
      // Dummy data untuk development
      // Simulasi berbagai role
      let userData: User;
      
      if (email.includes('admin')) {
        userData = {
          id: '1',
          name: 'Admin User',
          email: email,
          role: 'admin',
        };
      } else if (email.includes('manager')) {
        userData = {
          id: '2',
          name: 'Manager User',
          email: email,
          role: 'manager',
        };
      } else {
        userData = {
          id: '3',
          name: 'Pendaftar User',
          email: email,
          role: 'pendaftar',
        };
      }

      // Save to AsyncStorage
      await AsyncStorage.setItem('@user', JSON.stringify(userData));
      await AsyncStorage.setItem('@token', 'dummy-token');
      
      setUser(userData);
    } catch (error) {
      throw new Error('Email atau password salah');
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('@user');
      await AsyncStorage.removeItem('@token');
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const register = async (data: RegisterData) => {
    try {
      // TODO: Implement API call
      // const response = await api.post('/register', data);
      
      console.log('Register data:', data);
      
      // Untuk registrasi publik, role selalu 'pendaftar'
      // Admin dan Manager dibuat melalui sistem internal
      
      // Simulasi berhasil register
      return Promise.resolve();
    } catch (error) {
      throw new Error('Registrasi gagal. Silakan coba lagi.');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};