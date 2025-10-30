import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 🔹 Simulasi hash sederhana (frontend only, bukan untuk production)
const simpleHash = (password: string): string => {
  return `hashed-${password}-salt`;
};

const simpleCompare = (password: string, hashedPassword: string): boolean => {
  return hashedPassword === simpleHash(password);
};

// 🔹 Tipe data user
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'pendaftar';
  phone?: string;
}

// 🔹 Data context auth
interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, recaptchaToken?: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

//
// ===========================================
// 🚀 Inisialisasi Dummy Data Otomatis
// ===========================================
const initializeDummyData = async () => {
  const defaultManagers = [
    {
      id: 'manager-101',
      name: 'Budi Manager',
      email: 'manager@ugn.ac.id',
      phone: '08111222333',
      password: simpleHash('Manager123'),
      role: 'manager',
      createdAt: new Date().toISOString(),
      createdBy: 'system-init',
    },
  ];

  const defaultUsers = [
    {
      id: 'user-201',
      name: 'Ali Pendaftar',
      email: 'ali@gmail.com',
      phone: '08123456789',
      password: simpleHash('Pendaftar123'),
      role: 'pendaftar',
      createdAt: new Date().toISOString(),
    },
  ];

  try {
    const managersData = await AsyncStorage.getItem('@managers');
    const usersData = await AsyncStorage.getItem('@users');

    const shouldResetManagers =
      !managersData || managersData === '[]' || managersData === '{}';
    const shouldResetUsers =
      !usersData || usersData === '[]' || usersData === '{}';

    if (shouldResetManagers) {
      await AsyncStorage.setItem('@managers', JSON.stringify(defaultManagers));
      console.log('✅ Dummy managers data initialized.');
    }

    if (shouldResetUsers) {
      await AsyncStorage.setItem('@users', JSON.stringify(defaultUsers));
      console.log('✅ Dummy users data initialized.');
    }
  } catch (error) {
    console.error('❌ Error initializing dummy data:', error);
  }
};

//
// ===========================================
// 🌐 Auth Provider
// ===========================================
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      // simulasi loading
      await new Promise(resolve => setTimeout(resolve, 1500));
      await initializeDummyData(); // pastikan dummy dibuat
      await checkUserLoggedIn();
    };
    initializeApp();
  }, []);

  // 🔹 Cek user tersimpan di AsyncStorage
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

  // 🔹 Fungsi LOGIN
  const login = async (email: string, password: string, recaptchaToken?: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // simulasi delay API
      let userData: User;

      // --- ADMIN login ---
      if (email === 'admin@ugn.ac.id' && password === 'Admin123') {
        userData = {
          id: '1',
          name: 'Administrator',
          email,
          role: 'admin',
        };
      }
      // --- MANAGER login ---
      else if (email.includes('manager@') || email.includes('.manager@')) {
        const managersData = await AsyncStorage.getItem('@managers');
        const managers = managersData ? JSON.parse(managersData) : [];

        console.log('📦 Loaded managers:', managers);

        const managerAccount = managers.find((m: any) => m.email === email);
        if (!managerAccount) {
          throw new Error('Akun manager tidak ditemukan. Hubungi administrator.');
        }

        if (!simpleCompare(password, managerAccount.password)) {
          throw new Error('Password salah');
        }

        userData = {
          id: managerAccount.id,
          name: managerAccount.name,
          email: managerAccount.email,
          role: 'manager',
          phone: managerAccount.phone,
        };
      }
      // --- PENDAFTAR login ---
      else {
        const usersData = await AsyncStorage.getItem('@users');
        const users = usersData ? JSON.parse(usersData) : [];

        console.log('📦 Loaded users:', users);

        const userAccount = users.find((u: any) => u.email === email);
        if (!userAccount) {
          throw new Error('Email tidak terdaftar. Silakan registrasi terlebih dahulu.');
        }

        if (!simpleCompare(password, userAccount.password)) {
          throw new Error('Password salah');
        }

        userData = {
          id: userAccount.id,
          name: userAccount.name,
          email: userAccount.email,
          role: 'pendaftar',
          phone: userAccount.phone,
        };
      }

      // Simpan user dan token
      await AsyncStorage.setItem('@user', JSON.stringify(userData));
      await AsyncStorage.setItem('@token', `token-${userData.role}-${Date.now()}`);

      setUser(userData);
      console.log(`✅ Login success as ${userData.role}`);
    } catch (error: any) {
      throw new Error(error.message || 'Login gagal. Silakan coba lagi.');
    }
  };

  // 🔹 Fungsi LOGOUT
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('@user');
      await AsyncStorage.removeItem('@token');
      setUser(null);
      console.log('👋 Logout success.');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // 🔹 Fungsi REGISTER
  const register = async (data: RegisterData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const usersData = await AsyncStorage.getItem('@users');
      const users = usersData ? JSON.parse(usersData) : [];

      const existingUser = users.find((u: any) => u.email === data.email);
      if (existingUser) {
        throw new Error('Email sudah terdaftar. Silakan gunakan email lain.');
      }

      const newUser = {
        id: `user-${Date.now()}`,
        name: data.name,
        email: data.email,
        password: simpleHash(data.password),
        role: 'pendaftar',
        phone: data.phone,
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      await AsyncStorage.setItem('@users', JSON.stringify(users));
      console.log('✅ Registrasi berhasil:', newUser);
    } catch (error: any) {
      throw new Error(error.message || 'Registrasi gagal. Silakan coba lagi.');
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

//
// ===========================================
// 🔹 Custom Hook untuk akses context
// ===========================================
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
