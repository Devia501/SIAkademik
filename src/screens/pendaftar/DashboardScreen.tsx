import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PendaftarStackParamList } from '../../navigation/PendaftarNavigator';

type DashboardScreenNavigationProp = NativeStackNavigationProp<PendaftarStackParamList, 'Dashboard'>;

const DashboardScreen = () => {
  const navigation = useNavigation<DashboardScreenNavigationProp>();
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header with Wave */}
        <View style={styles.headerContainer}>
          <ImageBackground
            source={require('../../assets/images/wave5.png')}
            style={styles.waveBackground}
            resizeMode="cover"
          >
            <View style={styles.headerContent}>
              {/* Menu Icon */}
              <TouchableOpacity style={styles.menuButton}>
                <Text style={styles.menuIcon}>☰</Text>
              </TouchableOpacity>

              {/* User Info */}
              <View style={styles.userInfo}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>SA</Text>
                </View>
                <View style={styles.userTextContainer}>
                  <Text style={styles.userName}>Siti Nur Azizah</Text>
                  <Text style={styles.userRole}>Calon Mahasiswa</Text>
                </View>
              </View>

              {/* Notification Icon */}
              <TouchableOpacity style={styles.notifButton}>
                <Text style={styles.notifIcon}>🔔</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          {/* Quick Action Buttons */}
          <View style={styles.quickActions}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => navigation.navigate('TataCara')}
            >
              <Text style={styles.actionIcon}>📝</Text>
              <View>
                <Text style={styles.actionTitle}>Tata cara</Text>
                <Text style={styles.actionSubtitle}>Pendaftaran</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionIcon}>ℹ️</Text>
              <View>
                <Text style={styles.actionTitle}>Informasi</Text>
                <Text style={styles.actionSubtitle}>Penting</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Register Button */}
          <TouchableOpacity style={styles.registerButton}>
            <Text style={styles.registerButtonText}>Daftar Mahasiswa Baru</Text>
          </TouchableOpacity>

          {/* News Section */}
          <View style={styles.newsSection}>
            <Text style={styles.newsTitle}>Berita Terbaru</Text>
            
            <View style={styles.newsCard}>
              <Text style={styles.newsCardTitle}>
                Selamat Kepada Calon Mahasiswa Baru
              </Text>
              <View style={styles.newsCardContent}>
                <Text style={styles.newsCardText}>
                  Klik disini untuk melihat pengumuman!
                </Text>
              </View>
            </View>

            {/* Pagination Dots */}
            <View style={styles.pagination}>
              <View style={[styles.dot, styles.dotActive]} />
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>
          </View>
        </View>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem}>
            <View style={styles.navItemActive}>
              <Text style={styles.navIcon}>🏠</Text>
              <Text style={styles.navTextActive}>Home</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navIcon}>📄</Text>
            <Text style={styles.navText}>Form</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navIcon}>👤</Text>
            <Text style={styles.navText}>Profile</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D5C3D',
  },
  headerContainer: {
    height: 150,
  },
  waveBackground: {
    width: '100%',
    height: '100%',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  menuButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIcon: {
    fontSize: 24,
    color: '#000',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#0D5C3D',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0D5C3D',
  },
  userTextContainer: {
    marginLeft: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0D5C3D',
  },
  userRole: {
    fontSize: 12,
    color: '#0D5C3D',
    marginTop: 2,
  },
  notifButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notifIcon: {
    fontSize: 24,
  },
  content: {
    paddingHorizontal: 20,
    marginTop: -40,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5E6D3',
    borderRadius: 15,
    padding: 15,
    width: '48%',
    gap: 10,
  },
  actionIcon: {
    fontSize: 28,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  actionSubtitle: {
    fontSize: 12,
    color: '#000',
  },
  registerButton: {
    backgroundColor: '#D4AF37',
    borderRadius: 25,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 30,
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  newsSection: {
    marginBottom: 100,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 15,
  },
  newsCard: {
    backgroundColor: '#F5E6D3',
    borderRadius: 20,
    padding: 20,
    borderWidth: 3,
    borderColor: '#FFF',
  },
  newsCardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 15,
  },
  newsCardContent: {
    backgroundColor: '#E8D4B8',
    borderRadius: 15,
    padding: 15,
  },
  newsCardText: {
    fontSize: 12,
    color: '#0D5C3D',
    textAlign: 'center',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFF',
    opacity: 0.5,
  },
  dotActive: {
    width: 30,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D4AF37',
    opacity: 1,
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
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  navItem: {
    alignItems: 'center',
  },
  navItemActive: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5E6D3',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
    gap: 8,
  },
  navIcon: {
    fontSize: 24,
  },
  navText: {
    fontSize: 11,
    color: '#666',
    marginTop: 4,
  },
  navTextActive: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default DashboardScreen;