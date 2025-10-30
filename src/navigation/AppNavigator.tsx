import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';

// Screens
import LandingScreen from '../screens/auth/LandingScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';

// Navigators
import PendaftarNavigator from './PendaftarNavigator';
import ManagerNavigator from './ManagerNavigator';
import AdminNavigator from './AdminNavigator';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigation = useNavigation<any>();

  // 🔁 Redirect otomatis saat user berubah
  useEffect(() => {
    if (!isLoading && user) {
      if (user.role === 'admin') {
        navigation.reset({
          index: 0,
          routes: [{ name: 'AdminApp' }],
        });
      } else if (user.role === 'manager') {
        navigation.reset({
          index: 0,
          routes: [{ name: 'ManagerApp' }],
        });
      } else if (user.role === 'pendaftar') {
        navigation.reset({
          index: 0,
          routes: [{ name: 'PendaftarApp' }],
        });
      }
    }
  }, [user, isLoading]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#015023" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <>
          <Stack.Screen name="Landing" component={LandingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      ) : (
        <>
          {user?.role === 'admin' && (
            <Stack.Screen name="AdminApp" component={AdminNavigator} />
          )}
          {user?.role === 'manager' && (
            <Stack.Screen name="ManagerApp" component={ManagerNavigator} />
          )}
          {user?.role === 'pendaftar' && (
            <Stack.Screen name="PendaftarApp" component={PendaftarNavigator} />
          )}
        </>
      )}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});

export default AppNavigator;
