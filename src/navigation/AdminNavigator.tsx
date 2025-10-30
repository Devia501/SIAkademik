import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardAdmin from '../screens/admin/DashboardAdmin';
import AddManagerScreen from '../screens/admin/AddManagerScreen';
// Import screen lain untuk admin di sini

export type AdminStackParamList = {
  AdminDashboard: undefined;
  AddManager: undefined;
  // Tambahkan screen lain untuk admin
  // ManagerList: undefined;
  // UserList: undefined;
  // AdminSettings: undefined;
};

const Stack = createNativeStackNavigator<AdminStackParamList>();

const AdminNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="AdminDashboard"
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        animationDuration: 400,
        fullScreenGestureEnabled: true,
      }}
    >
      <Stack.Screen name="AdminDashboard" component={DashboardAdmin} />
      <Stack.Screen name="AddManager" component={AddManagerScreen} />
    </Stack.Navigator>
  );
};

export default AdminNavigator;