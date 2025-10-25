import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AuthStyles from '../../styles/AuthStyles';
import { AuthStackParamList } from '../../navigation/AppNavigator';

type RegisterScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Register'>;

const RegisterScreen = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const navigation = useNavigation<RegisterScreenNavigationProp>();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (pass) => {
    if (!pass) return false;
    const hasMinLength = pass.length >= 8;
    const hasUpperCase = /[A-Z]/.test(pass);
    const hasLowerCase = /[a-z]/.test(pass);
    const hasNumber = /[0-9]/.test(pass);

    return hasMinLength && hasUpperCase && hasLowerCase && hasNumber;
  };

  const handleRegister = () => {
    if (!fullName.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert('Peringatan', 'Semua kolom wajib diisi!');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Peringatan', 'Format email tidak valid! Contoh: nama@email.com');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Peringatan', 'Konfirmasi password tidak cocok!');
      return;
    }

    if (!validatePassword(password)) {
      Alert.alert(
        'Peringatan',
        'Password harus minimal 8 karakter, mengandung huruf besar, huruf kecil, dan angka!'
      );
      return;
    }

    Alert.alert('Berhasil', 'Registrasi berhasil (dummy logic).');
  };

  return (
    <SafeAreaView style={AuthStyles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="light-content" backgroundColor="#DABC4E" />

      <View style={AuthStyles.header}>
        <Image
          source={require('../../assets/images/logo-ugn2.png')}
          style={AuthStyles.logo}
          resizeMode="contain"
        />
        <Text style={AuthStyles.headerText}>UNIVERSITAS GLOBAL NUSANTARA</Text>
      </View>

      <View style={AuthStyles.formContainer}>
        <Text style={AuthStyles.title}>Registrasi</Text>

        <Text style={AuthStyles.label}>Nama Lengkap</Text>
        <TextInput
          style={AuthStyles.input}
          value={fullName}
          onChangeText={setFullName}
          autoCapitalize="words"
        />

        <Text style={AuthStyles.label}>Email</Text>
        <TextInput
          style={AuthStyles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={AuthStyles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={[AuthStyles.input, styles.inputDark, { flex: 1 }]}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeButton}
            activeOpacity={0.7}
          >
            <Image
              source={
                showPassword
                  ? require('../../assets/icons/fi-sr-eye.png')
                  : require('../../assets/icons/fi-sr-eye-crossed.png')
              }
              style={styles.eyeIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <Text style={AuthStyles.label}>Konfirmasi Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={[AuthStyles.input, styles.inputDark, { flex: 1 }]}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
          />
          <TouchableOpacity
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            style={styles.eyeButton}
            activeOpacity={0.7}
          >
            <Image
              source={
                showConfirmPassword
                  ? require('../../assets/icons/fi-sr-eye.png')
                  : require('../../assets/icons/fi-sr-eye-crossed.png')
              }
              style={styles.eyeIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.registerButtonSection}>
        <TouchableOpacity
          style={AuthStyles.primaryButton}
          onPress={handleRegister}
          activeOpacity={0.8}
        >
          <Text style={AuthStyles.primaryButtonText}>Register</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={{ marginTop: -130, alignSelf: 'center' }}
        >
          <Text style={{ color: '#000000ff', fontSize: 12}}>
            Sudah punya akun? <Text style={{color: '#F5F5DC', fontWeight: 'bold' }}>Login</Text>
          </Text>
      </TouchableOpacity>

      {/* Logo Background */}
      <Image
        source={require('../../assets/images/logo-ugn.png')}
        style={AuthStyles.backgroundLogo}
        resizeMode="contain"
      />

      <View style={styles.navigationBarSpacer} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputDark: {
    backgroundColor: '#F0F0E8',
    color: '#000',
    borderColor: '#C9C9C9',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeButton: {
    position: 'absolute',
    right: 15,
    top: 10,
  },
  eyeIcon: {
    width: 16,
    height: 20,
  },
  registerButtonSection: {
    paddingHorizontal: 82,
    paddingVertical: 128,
  },
  navigationBarSpacer: {
    height: Platform.OS === 'android' ? 48 : 0,
  },
});

export default RegisterScreen;
