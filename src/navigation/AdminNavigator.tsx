import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import AdminDashboardScreen from '../screens/admin/DashboardScreen';
import ManageManagerScreen from '../screens/admin/ManageManagerScreen';
import ManageStudentsScreen from '../screens/admin/ManageStudentsScreen';
import AdminProfileScreen from '../screens/admin/ProfileScreen';

const Tab = createBottomTabNavigator();

const AdminNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          switch (route.name) {
            case 'Dashboard':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Manager':
              iconName = focused ? 'people' : 'people-outline';
              break;
            case 'Students':
              iconName = focused ? 'school' : 'school-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'home-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#D4A853',
        tabBarInactiveTintColor: '#999',
        headerStyle: {
          backgroundColor: '#166534',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={AdminDashboardScreen} />
      <Tab.Screen 
        name="Manager" 
        component={ManageManagerScreen}
        options={{ title: 'Kelola Manager' }}
      />
      <Tab.Screen 
        name="Students" 
        component={ManageStudentsScreen}
        options={{ title: 'Mahasiswa' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={AdminProfileScreen}
        options={{ title: 'Profil' }}
      />
    </Tab.Navigator>
  );
};

export default AdminNavigator;