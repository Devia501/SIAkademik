import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, StatusBar, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import AuthStyles from '../../styles/AuthStyles';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const navigation = useNavigation();

  return (
    <SafeAreaView style={AuthStyles.container} edges={['top']}>
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
        <Text style={AuthStyles.title}>Login</Text>
        <Text style={AuthStyles.label}>Email</Text>
        <TextInput
          style={AuthStyles.input}
          value={email}
          onChangeText={setEmail}
          placeholder=""
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={AuthStyles.label}>Password</Text>
        <TextInput
          style={AuthStyles.input}
          value={password}
          onChangeText={setPassword}
          placeholder=""
          secureTextEntry
        />
      </View>

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

      <View style={AuthStyles.buttonSection}>
        <TouchableOpacity style={AuthStyles.primaryButton}>
          <Text style={AuthStyles.primaryButtonText}>Login</Text>
        </TouchableOpacity>
      </View>

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