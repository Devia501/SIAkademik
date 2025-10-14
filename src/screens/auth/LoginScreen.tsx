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

type LoginScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Peringatan', 'Email dan Password tidak boleh kosong!');
      return;
    }

    if (!isChecked) {
      Alert.alert('Peringatan', 'Harap centang captcha terlebih dahulu.');
      return;
    }

    // Login berhasil, navigasi ke Dashboard Pendaftar
    // @ts-ignore - Navigate ke nested navigator
    navigation.navigate('PendaftarApp', { screen: 'Dashboard' });
  };

  return (
    <SafeAreaView style={AuthStyles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="#DABC4E" />

      {/* Header */}
      <View style={AuthStyles.header}>
        <Image
          source={require('../../assets/images/logo-ugn2.png')}
          style={AuthStyles.logo}
          resizeMode="contain"
        />
        <Text style={AuthStyles.headerText}>UNIVERSITAS GLOBAL NUSANTARA</Text>
      </View>

      {/* Form Login */}
      <View style={AuthStyles.formContainer}>
        <Text style={AuthStyles.title}>Login</Text>

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
      </View>

      {/* Captcha */}
      <View style={styles.captchaSection}>
        <Text style={AuthStyles.label}>Captcha</Text>
        <TouchableOpacity
          style={styles.captchaContainer}
          onPress={() => setIsChecked(!isChecked)}
          activeOpacity={0.7}
        >
          <View style={styles.checkbox}>
            {isChecked && <View style={styles.checkboxChecked} />}
          </View>
          <Text style={styles.captchaText}>I'm not a robot</Text>
          <Image
            source={require('../../assets/images/captcha.png')}
            style={styles.captchaIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* Tombol Login */}
      <View style={AuthStyles.buttonSection}>
        <TouchableOpacity
          style={AuthStyles.primaryButton}
          onPress={handleLogin}
          activeOpacity={0.8}
        >
          <Text style={AuthStyles.primaryButtonText}>Login</Text>
        </TouchableOpacity>
      </View>

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
    top: 6,
  },
  eyeIcon: {
    width: 16,
    height: 20,
  },
  captchaSection: {
    paddingHorizontal: 120,
    zIndex: 1,
    paddingLeft: 45,
  },
  captchaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 18,
    paddingVertical: 6,
    marginBottom: 30,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#015023',
    borderRadius: 4,
    marginRight: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  checkboxChecked: {
    width: 14,
    height: 14,
    backgroundColor: '#015023',
    borderRadius: 1,
  },
  captchaText: {
    flex: 1,
    fontSize: 10,
    color: '#333333',
  },
  captchaIcon: {
    width: 20,
    height: 20,
  },
  navigationBarSpacer: {
    height: Platform.OS === 'android' ? 48 : 0,
  },
});

export default LoginScreen;