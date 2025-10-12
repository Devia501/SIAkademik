import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, StatusBar, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import AuthStyles from '../../styles/AuthStyles';

const RegisterScreen = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
        <Text style={AuthStyles.title}>Registrasi</Text>
        <Text style={AuthStyles.label}>Nama Lengkap</Text>
        <TextInput
          style={AuthStyles.input}
          value={fullName}
          onChangeText={setFullName}
          placeholder=""
          autoCapitalize="words"
        />

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
          autoCapitalize="none"
          secureTextEntry
        />

        <Text style={AuthStyles.label}>Confirm Password</Text>
        <TextInput
          style={AuthStyles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder=""
          autoCapitalize="none"
          secureTextEntry
        />
      </View>

      <View style={styles.registerButtonSection}>
        <TouchableOpacity style={AuthStyles.primaryButton}>
          <Text style={AuthStyles.primaryButtonText}>Register</Text>
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
  registerButtonSection: {
    paddingHorizontal: 85,
    paddingVertical: 146,  
    zIndex: 1,
  },
  navigationBarSpacer: {
    height: Platform.OS === 'android' ? 48 : 0,
  },
});

export default RegisterScreen;