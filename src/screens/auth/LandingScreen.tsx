import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AppNavigator';

type LandingScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'Landing'
>;

const { width, height } = Dimensions.get('window');

const LandingScreen = () => {
  const navigation = useNavigation<LandingScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Background gedung kampus */}
      <ImageBackground
        source={require('../../assets/images/campus-building.jpeg')}
        style={styles.backgroundImage}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.overlay} />
      </ImageBackground>

      {/* Wave (gelombang) */}
      <View style={styles.waveWrapper}>
        {/* wave1 di bawah */}
        <Image
          source={require('../../assets/images/wave1.png')}
          style={[styles.waveImage, styles.wave1]}
          resizeMode="cover"
        />

        {/* wave di atas */}
        <Image
          source={require('../../assets/images/wave.png')}
          style={[styles.waveImage, styles.wave2]}
          resizeMode="cover"
        />
      </View>

      {/* Konten utama */}
      <View style={styles.contentContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/images/logo-ugn2.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>UNIVERSITAS GLOBAL NUSANTARA</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.loginButton]}
            onPress={() => navigation.navigate('Login')}
            activeOpacity={0.8}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.registerButton]}
            onPress={() => navigation.navigate('Register')}
            activeOpacity={0.8}
          >
            <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Spacer untuk navigation bar */}
      <View style={styles.navigationBarSpacer} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#015023',
  },
  backgroundImage: {
    width,
    height: height * 0.5,
    position: 'absolute',
    top: 0,
  },
  imageStyle: {
    opacity: 0.9,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
  },

  // --- bagian wave ---
  waveWrapper: {
    position: 'absolute',
    top: height * 0.31,
    left: 0,
    right: 0,
    height: 180,
    zIndex: 5,
  },
  waveImage: {
    position: 'absolute',
    width: width,
    height: 160,
  },
  wave1: {
    zIndex: 1,
    top: 25, // sedikit di bawah wave utama
    opacity: 0.9, // biar sedikit transparan, bisa kamu ubah
  },
  wave2: {
    zIndex: 2,
    top: 30,
  },

  // --- konten utama ---
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingBottom: 40,
    zIndex: 10,
  },
  logoContainer: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: '170%',
    height: '210%',
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
    letterSpacing: 1,
  },
  buttonContainer: {
    width: '65%',
    gap: 26,
    marginBottom: 20,
  },
  button: {
    width: '100%',
    paddingVertical: 6,
    borderRadius: 50,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1.85,
    shadowRadius: 9.84,
    elevation: 5,
  },
  loginButton: {
    backgroundColor: '#DABC4E',
  },
  loginButtonText: {
    color: '#F5EFD3',
    fontSize: 16,
    fontWeight: '500',
  },
  registerButton: {
    backgroundColor: '#F5F5DC',
  },
  registerButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
  },
  navigationBarSpacer: {
    height: Platform.OS === 'android' ? 48 : 0,
    backgroundColor: '#015023',
  },
});

export default LandingScreen;
