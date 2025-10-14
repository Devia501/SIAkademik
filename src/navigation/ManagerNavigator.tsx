import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import ManagerDashboardScreen from '../screens/manager/DashboardScreen';
import DataVerificationScreen from '../screens/manager/DataVerificationScreen';
import ReportsScreen from '../screens/manager/ReportsScreen';
import ManagerProfileScreen from '../screens/manager/ProfileScreen';

const Tab = createBottomTabNavigator();

const ManagerNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          switch (route.name) {
            case 'Dashboard':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Verification':
              iconName = focused ? 'checkmark-circle' : 'checkmark-circle-outline';
              break;
            case 'Reports':
              iconName = focused ? 'document-text' : 'document-text-outline';
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
      <Tab.Screen name="Dashboard" component={ManagerDashboardScreen} />
      <Tab.Screen 
        name="Verification" 
        component={DataVerificationScreen}
        options={{ title: 'Verifikasi' }}
      />
      <Tab.Screen 
        name="Reports" 
        component={ReportsScreen}
        options={{ title: 'Laporan' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ManagerProfileScreen}
        options={{ title: 'Profil' }}
      />
    </Tab.Navigator>
  );
};

export default ManagerNavigator;