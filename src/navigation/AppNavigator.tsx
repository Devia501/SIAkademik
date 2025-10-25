import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import LandingScreen from '../screens/auth/LandingScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import PendaftarNavigator from './PendaftarNavigator';
import { NavigatorScreenParams } from '@react-navigation/native';
import { PendaftarStackParamList } from './PendaftarNavigator';

export type AuthStackParamList = {
  Splash: undefined;
  Landing: undefined; 
  Login: undefined;
  Register: undefined;
  PendaftarApp: NavigatorScreenParams<PendaftarStackParamList>;
};

const Stack = createNativeStackNavigator<AuthStackParamList>(); 

const AppNavigator = () => {
  return (
    <Stack.Navigator 
      initialRouteName="Splash"
      screenOptions={{ animation: 'fade', headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="PendaftarApp" component={PendaftarNavigator} />
    </Stack.Navigator>
  );
};

export default AppNavigator;