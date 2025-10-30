import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AdminStackParamList } from '../../navigation/AdminNavigator';

type AddManagerScreenNavigationProp = NativeStackNavigationProp<AdminStackParamList, 'AddManager'>;

const AddManagerScreen = ({ navigation }: any) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (pass: string) => {
    if (!pass) return false;
    const hasMinLength = pass.length >= 8;
    const hasUpperCase = /[A-Z]/.test(pass);
    const hasLowerCase = /[a-z]/.test(pass);
    const hasNumber = /[0-9]/.test(pass);
    return hasMinLength && hasUpperCase && hasLowerCase && hasNumber;
  };

  const handleAddManager = async () => {
    // Validasi input
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Peringatan', 'Nama, Email, dan Password wajib diisi!');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Peringatan', 'Format email tidak valid!');
      return;
    }

    // Pastikan email menggunakan domain manager
    if (!email.includes('manager@') && !email.includes('.manager@')) {
      Alert.alert(
        'Peringatan',
        'Email manager harus mengandung "manager" (contoh: nama.manager@ugn.ac.id)'
      );
      return;
    }

    if (!validatePassword(password)) {
      Alert.alert(
        'Peringatan',
        'Password harus minimal 8 karakter, mengandung huruf besar, huruf kecil, dan angka!'
      );
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Implement API call
      // const response = await api.post('/admin/create-manager', { name, email, phone, password });

      // Get existing managers
      const managersData = await AsyncStorage.getItem('@managers');
      const managers = managersData ? JSON.parse(managersData) : [];

      // Check if email already exists
      const existingManager = managers.find((m: any) => m.email === email);
      if (existingManager) {
        Alert.alert('Peringatan', 'Email manager sudah terdaftar!');
        setIsLoading(false);
        return;
      }

      // Create new manager
      const newManager = {
        id: `manager-${Date.now()}`,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim() || undefined,
        password: password, // In production, password should be hashed on backend
        role: 'manager',
        createdAt: new Date().toISOString(),
        createdBy: 'admin', // Should be actual admin ID
      };

      // Save to storage
      managers.push(newManager);
      await AsyncStorage.setItem('@managers', JSON.stringify(managers));

      Alert.alert(
        'Berhasil',
        `Manager ${name} berhasil ditambahkan!\n\nEmail: ${email}\nPassword: ${password}\n\nSimpan kredensial ini dan berikan kepada manager.`,
        [
          {
            text: 'OK',
            onPress: () => {
              // Reset form
              setName('');
              setEmail('');
              setPhone('');
              setPassword('');
              // Navigate back or to manager list
              if (navigation.canGoBack()) {
                navigation.goBack();
              }
            },
          },
        ]
      );
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Gagal menambahkan manager');
    } finally {
      setIsLoading(false);
    }
  };

  const generatePassword = () => {
    const length = 12;
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let generatedPassword = '';
    
    // Ensure at least one uppercase, lowercase, and number
    generatedPassword += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)];
    generatedPassword += 'abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 26)];
    generatedPassword += '0123456789'[Math.floor(Math.random() * 10)];
    
    // Fill the rest
    for (let i = generatedPassword.length; i < length; i++) {
      generatedPassword += charset[Math.floor(Math.random() * charset.length)];
    }
    
    // Shuffle the password
    generatedPassword = generatedPassword.split('').sort(() => Math.random() - 0.5).join('');
    
    setPassword(generatedPassword);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>← Kembali</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tambah Manager</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.form}>
          <Text style={styles.label}>Nama Lengkap *</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Masukkan nama lengkap manager"
            placeholderTextColor="#999"
            editable={!isLoading}
          />

          <Text style={styles.label}>Email *</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="nama.manager@ugn.ac.id"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!isLoading}
          />
          <Text style={styles.hint}>
            Email harus mengandung "manager" (contoh: john.manager@ugn.ac.id)
          </Text>

          <Text style={styles.label}>No. Telepon (Opsional)</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="08123456789"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
            editable={!isLoading}
          />

          <Text style={styles.label}>Password *</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              value={password}
              onChangeText={setPassword}
              placeholder="Min. 8 karakter, huruf besar, kecil, angka"
              placeholderTextColor="#999"
              secureTextEntry={!showPassword}
              editable={!isLoading}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeButton}
              disabled={isLoading}
            >
              <Text style={styles.eyeIcon}>{showPassword ? '👁️' : '🙈'}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={generatePassword}
            style={styles.generateButton}
            disabled={isLoading}
          >
            <Text style={styles.generateButtonText}>🔄 Generate Password Acak</Text>
          </TouchableOpacity>

          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>ℹ️ Informasi Penting:</Text>
            <Text style={styles.infoText}>
              • Manager hanya dapat login dengan akun yang dibuat oleh admin{'\n'}
              • Simpan kredensial dengan aman dan berikan kepada manager{'\n'}
              • Manager tidak dapat melakukan registrasi sendiri{'\n'}
              • Password dapat diubah oleh manager setelah login pertama
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.submitButton, isLoading && styles.buttonDisabled]}
            onPress={handleAddManager}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.submitButtonText}>Tambah Manager</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#015023',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  hint: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    fontStyle: 'italic',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeButton: {
    position: 'absolute',
    right: 12,
    padding: 8,
  },
  eyeIcon: {
    fontSize: 20,
  },
  generateButton: {
    backgroundColor: '#F0F0F0',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  generateButtonText: {
    color: '#015023',
    fontSize: 14,
    fontWeight: '600',
  },
  infoBox: {
    backgroundColor: '#E8F5E9',
    padding: 16,
    borderRadius: 8,
    marginTop: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 12,
    color: '#2E7D32',
    lineHeight: 20,
  },
  submitButton: {
    backgroundColor: '#015023',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 40,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});

export default AddManagerScreen;