import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  Alert, // Tambahkan Alert untuk konfirmasi logout
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ManagerStackParamList } from '../../navigation/ManagerNavigator';
import { useAuth } from '../../contexts/AuthContext'; 

const { width } = Dimensions.get('window');

type DashboardManagerNavigationProp = NativeStackNavigationProp<ManagerStackParamList, 'ManagerDashboard'>;

const DashboardManager = () => {
  const navigation = useNavigation<DashboardManagerNavigationProp>();
  const { logout, user } = useAuth(); // Ambil fungsi logout dan user

  const handleLogout = () => {
    Alert.alert(
      "Konfirmasi Logout",
      "Apakah Anda yakin ingin keluar?",
      [
        { text: "Batal", style: "cancel" },
        { text: "Ya, Keluar", onPress: logout }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <ImageBackground
            source={require('../../assets/images/Rectangle 48.png')}
            style={styles.waveBackground}
            resizeMode="cover"
          >
            <View style={styles.headerContent}>
              <Text style={styles.headerTitle}>Manager Dashboard</Text>
              {/* TOMBOL LOGOUT ICON di KANAN ATAS */}
              <TouchableOpacity
                style={styles.logoutIconContainer}
                onPress={handleLogout}
              >
                <Image
                  source={require('../../assets/icons/mingcute_exit-line.png')}
                  style={styles.logoutIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              {/* AKHIR TOMBOL LOGOUT ICON */}
            </View>
          </ImageBackground>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Today's Summary */}
          <View style={styles.summaryHeader}>
            <Text style={styles.summaryTitle}>Today's Summary</Text>
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationText}>0</Text>
            </View>
          </View>

          {/* Menggunakan data user?.name */}
          <Text style={styles.greetingText}>Selamat datang, {user?.name || 'manager system'}!</Text>

          {/* Total Pendaftar Card */}
          <View style={styles.totalCard}>
            <Text style={styles.totalNumber}>0</Text>
            <Text style={styles.totalLabel}>Total Pendaftar</Text>
          </View>

          {/* Stats Cards */}
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Diterima</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Pending</Text>
            </View>
          </View>

          {/* Ditolak Card */}
          <View style={styles.rejectCard}>
            <Text style={styles.rejectNumber}>0</Text>
            <Text style={styles.rejectLabel}>Ditolak</Text>
          </View>

          {/* Action Buttons */}
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Kelola Pendaftaran</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButtonSecondary}>
            <Text style={styles.actionButtonText}>System Settings</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem}>
            <View style={styles.navItemActive}>
              <Image
                source={require('../../assets/icons/material-symbols_home-rounded.png')}
                style={styles.navIcon}
                resizeMode="contain"
              />
              <Text style={styles.navTextActive}>Home</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem}>
            <Image
              source={require('../../assets/icons/clarity_form-line.png')}
              style={styles.navIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem}>
            <Image
              source={require('../../assets/icons/ix_user-profile-filled.png')}
              style={styles.navIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Background Logo */}
      <Image
        source={require('../../assets/images/logo-ugn.png')}
        style={styles.backgroundLogo}
        resizeMode="contain"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#015023',
  },
  headerContainer: {
    height: 60,
  },
  waveBackground: {
    width: '100%',
    height: '100%',
  },
  headerContent: {
    // Diubah untuk menampung tombol logout di kanan
    flexDirection: 'row',
    justifyContent: 'center', // Tetap fokus di tengah untuk judul
    alignItems: 'center',
    paddingTop: 15,
    paddingHorizontal: 20, // Tambahkan padding horizontal untuk ruang
    position: 'relative', // Atur agar elemen absolute (logout) bisa relatif terhadap ini
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000ff',
    // Gunakan position absolute atau margin horizontal negatif untuk menaruh di tengah mutlak 
    // agar tidak terpengaruh oleh tombol logout, tetapi kita biarkan margin karena lebih aman
  },
  // --- Gaya baru untuk tombol logout ---
  logoutIconContainer: {
    position: 'absolute',
    right: 20, // Geser ke kanan
    top: 15, // Sejajarkan dengan paddingTop
    padding: 5,
  },
  logoutIcon: {
    width: 24,
    height: 24,
  },
  // ------------------------------------
  content: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  notificationBadge: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#015023',
  },
  greetingText: {
    fontSize: 13,
    color: '#FFF',
    marginBottom: 20,
  },
  totalCard: {
    backgroundColor: '#F5E6D3',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 30,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#DABC4E',
  },
  totalNumber: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#000',
  },
  totalLabel: {
    fontSize: 14,
    color: '#000',
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#DABC4E',
    borderRadius: 16,
    paddingVertical: 24,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
  },
  statLabel: {
    fontSize: 12,
    color: '#000',
    marginTop: 4,
  },
  rejectCard: {
    backgroundColor: '#F5E6D3',
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#DABC4E',
  },
  rejectNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
  },
  rejectLabel: {
    fontSize: 14,
    color: '#DC2626',
    marginTop: 4,
  },
  actionButton: {
    backgroundColor: '#DABC4E',
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#000',
  },
  actionButtonSecondary: {
    backgroundColor: '#F5E6D3',
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 100,
    borderWidth: 2,
    borderColor: '#DABC4E',
  },
  actionButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 25,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderWidth: 4,
    borderColor: '#DABC4E',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
  },
  navItemActive: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5E6D3',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: '#000',
    gap: 4,
  },
  navIcon: {
    width: 24,
    height: 24,
  },
  navTextActive: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
  backgroundLogo: {
    position: 'absolute',
    bottom: -350,
    alignSelf: 'center',
    width: 950,
    height: 950,
    opacity: 0.15,
    zIndex: -1,
  },
});

export default DashboardManager;