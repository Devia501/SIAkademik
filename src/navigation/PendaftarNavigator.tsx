import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '../screens/pendaftar/DashboardScreen';
import TataCaraScreen from '../screens/pendaftar/TataCaraScreen';

export type PendaftarStackParamList = {
  Dashboard: undefined;
  TataCara: undefined;
};

const Stack = createNativeStackNavigator<PendaftarStackParamList>();

const PendaftarNavigator = () => {
  return (
    <Stack.Navigator 
      initialRouteName="Dashboard"
      screenOptions={{ animation: 'fade', headerShown: false }}
    >
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="TataCara" component={TataCaraScreen} />
    </Stack.Navigator>
  );
};

export default PendaftarNavigator;