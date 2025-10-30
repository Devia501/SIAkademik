import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardManager from '../screens/manager/DashboardManager';
// Import screen lain untuk manager di sini

export type ManagerStackParamList = {
  ManagerDashboard: undefined;
  // Tambahkan screen lain untuk manager
  // ManagerProfile: undefined;
  // ManagerSettings: undefined;
};

const Stack = createNativeStackNavigator<ManagerStackParamList>();

const ManagerNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="ManagerDashboard"
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        animationDuration: 400,
        fullScreenGestureEnabled: true,
      }}
    >
      <Stack.Screen name="ManagerDashboard" component={DashboardManager} />
    </Stack.Navigator>
  );
};

export default ManagerNavigator;