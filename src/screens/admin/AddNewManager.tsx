// src/screens/admin/AddNewManagerScreen.tsx

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  ImageBackground,
  TextInput,
  Alert,
  ActivityIndicator, 
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ManagerStyles, Colors } from '../../styles/ManagerStyles'; 
import { AdminStyles } from '../../styles/AdminStyles';
import { AdminStackParamList } from '../../navigation/AdminNavigator';

// 📌 Impor API Service dan Tipe Data
import { adminService, UserManagement } from '../../services/apiService';

type AddNewManagerNavigationProp = NativeStackNavigationProp<AdminStackParamList, 'AddNewManager'>;

const AddNewManagerScreen = () => {
  const navigation = useNavigation<AddNewManagerNavigationProp>();
  const isFocused = useIsFocused(); // Untuk refresh data saat kembali

  // State untuk data dan UI
  const [managers, setManagers] = useState<UserManagement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState('');

  // 📌 Fungsi mengambil data Manager
  const fetchManagers = useCallback(async () => {
    try {
      // Panggil API Laravel untuk mendapatkan daftar user dengan role 'manager' atau 'admin'
      const response = await adminService.listUsers({ 
        role: 'manager,admin', // Filter di backend untuk Manager dan Admin
        search: searchText // Meneruskan teks pencarian
      });
      // Filter di frontend untuk memastikan hanya 'manager' dan 'admin' yang tampil
      const filteredManagers = response.data.filter(u => u.role === 'manager' || u.role === 'admin');
      setManagers(filteredManagers);
    } catch (error) {
      console.error('Failed to fetch managers:', error);
      Alert.alert('Error', 'Gagal memuat data manager.');
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  }, [searchText]);

  // 📌 useEffect untuk memuat data
  useEffect(() => {
    // Muat data saat screen fokus
    if (isFocused) {
        fetchManagers();
    }
  }, [isFocused, fetchManagers]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchManagers();
  };

  // Logika Tambah Manager (Navigasi ke Form)
  const handleAddManager = () => {
    // Asumsi ada screen 'AddNewManagerForm' untuk input data
    navigation.navigate('AddNewManagerForm'); 
  };

  const handleEditManager = (managerId: number) => { 
    console.log('Edit Manager ID:', managerId);
    // TODO: Implementasi navigasi ke Edit Screen (jika ada)
    Alert.alert('Fitur Belum Tersedia', `Fitur edit untuk manager ID ${managerId} belum diimplementasikan.`);
  };

  // 📌 Logika Hapus Manager (Integrasi API)
  const handleDeleteManager = (managerId: number, managerName: string) => {
    Alert.alert(
      'Delete Manager',
      `Apakah Anda yakin ingin menghapus ${managerName}?`,
      [
        { text: 'Batal', style: 'cancel' },
        { 
          text: 'Hapus', 
          style: 'destructive',
          onPress: async () => {
            try {
              // Panggil API Laravel untuk menghapus user
              await adminService.deleteUser(managerId);
              console.log('Manager dihapus:', managerId);
              Alert.alert('Success', 'Pengguna berhasil dihapus.');
              fetchManagers(); // Refresh daftar
            } catch (error) {
              console.error('Error deleting manager:', error);
              Alert.alert('Error', 'Gagal menghapus pengguna. Periksa koneksi atau izin Anda.');
            }
          }
        },
      ]
    );
  };

  // 📌 Komponen Card Manager
  const ManagerCard = ({ manager }: { manager: UserManagement }) => {
    // Implementasi Status sederhana: Active jika role bukan 'pendaftar' (asumsi)
    const isActive = manager.role === 'admin' || manager.role === 'manager';
    const displayRole = manager.role.charAt(0).toUpperCase() + manager.role.slice(1);
    const dateJoined = new Date(manager.created_at).toLocaleDateString('id-ID', {
        year: 'numeric', month: 'long', day: 'numeric'
    });

    return (
      <View style={[localStyles.managerCard, isActive ? localStyles.activeCard : localStyles.inactiveCard]}>
        <View style={localStyles.cardHeader}>
          <View>
            <Text style={localStyles.managerName}>{manager.name}</Text>
            <Text style={localStyles.managerRole}>{displayRole}</Text>
          </View>
          <View style={isActive ? localStyles.statusBadgeActive : localStyles.statusBadgeInactive}>
            <Text style={isActive ? localStyles.statusTextActive : localStyles.statusTextInactive}>
                {isActive ? 'Active' : 'Inactive'}
            </Text>
          </View>
        </View>
        
        <View style={localStyles.infoRow}>
          <Image
            source={require('../../assets/icons/Vector4.png')}
            style={localStyles.infoIcon}
            resizeMode="contain"
          />
          <Text style={localStyles.infoText}>{manager.email}</Text>
        </View>
        
        <View style={localStyles.infoRow}>
          <Image
            source={require('../../assets/icons/clarity_date-solid.png')}
            style={localStyles.infoIcon}
            resizeMode="contain"
          />
          <Text style={localStyles.infoText}>Joined: {dateJoined}</Text>
        </View>

        <View style={localStyles.actionButtons}>
          <TouchableOpacity 
            style={localStyles.editButton}
            onPress={() => handleEditManager(manager.id_user)}
          >
            <Text style={localStyles.editButtonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={localStyles.deleteButton}
            // Pastikan Admin tidak bisa menghapus dirinya sendiri jika ada logika
            onPress={() => handleDeleteManager(manager.id_user, manager.name)}
          >
            <Text style={localStyles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  return (
    <SafeAreaView style={AdminStyles.container} edges={['top', 'bottom']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={localStyles.scrollContent}
        refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#DABC4E']} tintColor="#DABC4E" />
        }
      >
        {/* Header */}
        <View style={AdminStyles.headerContainer}>
          <ImageBackground
            source={require('../../assets/images/App Bar - Bottom.png')}
            style={AdminStyles.waveBackground}
            resizeMode="cover"
          >
            <View style={AdminStyles.headerContent}>
              {/* Tombol Back */}
              <TouchableOpacity
                style={ManagerStyles.headerIconContainerLeft}
                onPress={() => navigation.goBack()}
              >
                <Image
                  source={require('../../assets/icons/material-symbols_arrow-back-rounded.png')}
                  style={ManagerStyles.headerIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <Text style={AdminStyles.headerTitle}>Kelola Manager</Text>
            </View>
          </ImageBackground>
        </View>

        <View style={AdminStyles.contentPadding}>
          {/* Manager Users Header */}
          <View style={localStyles.managerUsersHeader}>
            <Text style={localStyles.managerUsersText}>Manager Users ({managers.length})</Text>
          </View>

          {/* Search Bar */}
          <View style={localStyles.searchContainer}>
            <Image
              source={require('../../assets/icons/material-symbols_search-rounded.png')}
              style={localStyles.searchIcon}
              resizeMode="contain"
            />
            <TextInput
              style={localStyles.searchInput}
              placeholder="Search Manager..."
              placeholderTextColor="#666"
              value={searchText}
              onChangeText={setSearchText}
              onSubmitEditing={fetchManagers} // Search saat tekan enter
            />
          </View>

          {/* 📌 Manager Cards - Diambil dari API */}
          {isLoading ? (
            <ActivityIndicator size="large" color="#DABC4E" style={{ marginTop: 20 }} />
          ) : managers.length === 0 ? (
            <Text style={localStyles.noDataText}>Tidak ada data Manager ditemukan.</Text>
          ) : (
            managers.map((manager) => (
              <ManagerCard key={manager.id_user} manager={manager} />
            ))
          )}

          {/* Add New Manager Button */}
          <TouchableOpacity 
            style={localStyles.addManagerButton}
            onPress={handleAddManager} // Arahkan ke form
          >
            <Image
              source={require('../../assets/icons/gridicons_add.png')}
              style={localStyles.addManagerIcon}
              resizeMode="contain"
            />
            <Text style={localStyles.addManagerText}>Tambah Manager Baru</Text>
          </TouchableOpacity>

          {/* Spacer */}
          <View style={AdminStyles.navSpacer} />
        </View>
      </ScrollView>

      {/* Background Logo */}
      <Image
        source={require('../../assets/images/logo-ugn.png')}
        style={AdminStyles.backgroundLogo}
        resizeMode="contain"
      />

    </SafeAreaView>
  );
};

// Local Styles
const localStyles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 20,
  },
  managerUsersHeader: {
    alignSelf: 'flex-start',
    backgroundColor: '#DABC4E',
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#000000ff',
    opacity: 0.75,
  },
  managerUsersText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffffff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 2,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#DABC4E',
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    tintColor: '#000',
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#000',
  },
  // Manager Cards Styles
  managerCard: {
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    borderWidth: 3,
  },
  activeCard: {
    backgroundColor: '#FEFAE0',
    borderColor: '#DABC4E',
  },
  inactiveCard: {
    backgroundColor: '#FEFAE0',
    borderColor: '#DC2626',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  managerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 2,
  },
  managerRole: {
    fontSize: 12,
    color: '#666',
  },
  statusBadgeActive: {
    backgroundColor: '#015023',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  statusTextActive: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFF',
  },
  statusBadgeInactive: {
    backgroundColor: '#DC2626',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  statusTextInactive: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFF',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoIcon: {
    width: 16,
    height: 16,
    marginRight: 8,
    tintColor: '#000',
  },
  infoText: {
    fontSize: 13,
    color: '#000',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    gap: 10,
  },
  editButton: {
    flex: 1,
    backgroundColor: '#015023',
    borderRadius: 12,
    paddingVertical: 8,
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#DC2626',
    borderRadius: 12,
    paddingVertical: 8,
    alignItems: 'center',
  },
  deleteButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
  },
  // Add Manager Button
  addManagerButton: {
    flexDirection: 'row',
    backgroundColor: '#DABC4E',
    borderRadius: 25,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  addManagerIcon: {
    width: 24,
    height: 24,
    tintColor: '#ffffffff',
    marginRight: 8,
  },
  addManagerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffffff',
  },
  noDataText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default AddNewManagerScreen;