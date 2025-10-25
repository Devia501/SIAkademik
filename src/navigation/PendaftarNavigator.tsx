import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '../screens/pendaftar/DashboardScreen';
import TataCaraScreen from '../screens/pendaftar/TataCaraScreen';
import InformasiPentingScreen from '../screens/pendaftar/InformasiPentingScreen';
import StatusPendaftaranAwalScreen from '../screens/pendaftar/StatusPendaftaranAwalScreen';
import ProfileScreen from '../screens/pendaftar/ProfileScreen';
import PendaftaranScreen from '../screens/pendaftar/PendaftaranScreen';
import DataAlamatScreen from '../screens/pendaftar/DataAlamatScreen';
import DataAkademikScreen from '../screens/pendaftar/DataAkademikScreen';
import DataPrestasiScreen from '../screens/pendaftar/DataPrestasiScreen';
import DataOrangTuaScreen from '../screens/pendaftar/DataOrangTuaScreen';

export type PendaftarStackParamList = {
  PendaftarDashboard: undefined;
  TataCara: undefined;
  InformasiPenting: undefined;
  StatusPendaftaranAwal: undefined;
  Profile: undefined;
  PendaftaranMahasiswa: undefined;
  DataAlamat: undefined;
  DataAkademik: undefined;
  DataPrestasi: undefined;
  DataOrangTua: undefined;
};

const Stack = createNativeStackNavigator<PendaftarStackParamList>();

const PendaftarNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="PendaftarDashboard"
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        animationDuration: 400,
        fullScreenGestureEnabled: true,
      }}
    >
      <Stack.Screen name="PendaftarDashboard" component={DashboardScreen} />
      <Stack.Screen name="TataCara" component={TataCaraScreen} />
      <Stack.Screen name="InformasiPenting" component={InformasiPentingScreen} />
      <Stack.Screen name="StatusPendaftaranAwal" component={StatusPendaftaranAwalScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="PendaftaranMahasiswa" component={PendaftaranScreen} />
      <Stack.Screen name="DataAlamat" component={DataAlamatScreen} />
      <Stack.Screen name="DataAkademik" component={DataAkademikScreen} />
      <Stack.Screen name="DataPrestasi" component={DataPrestasiScreen} />
      <Stack.Screen name="DataOrangTua" component={DataOrangTuaScreen} />
    </Stack.Navigator>
  );
};

export default PendaftarNavigator;
