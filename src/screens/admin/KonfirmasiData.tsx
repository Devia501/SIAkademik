// src/screens/admin/KonfirmasiDataManagerScreen.tsx

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  ImageBackground,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AdminStackParamList } from '../../navigation/AdminNavigator'; 

type KonfirmasiDataNavigationProp = NativeStackNavigationProp<AdminStackParamList, 'KonfirmasiData'>;

// Data dummy untuk tampilan statis sesuai desain
const DUMMY_DATA = {
  nama: 'Siti Nur Azizah',
  username: '@manager_azizah_new',
  email: 'siti.azizah@gmail.com',
  role: 'Administrator', // Dalam konteks ini, mungkin Role yang diberikan
  createdAt: '12 Oktober 2025, 14:30',
};

const KonfirmasiData = () => {
  const navigation = useNavigation<KonfirmasiDataNavigationProp>();

  const managerData = DUMMY_DATA;
  
  const handleKembaliKeUserList = () => {
    console.log('Kembali ke User List');
    // Ganti 'UserList' dengan nama screen daftar manager Anda
    // navigation.navigate('UserList'); 
    navigation.popToTop(); 
  };

  const handleTambahManagerLagi = () => {
    console.log('Tambah Manager Lagi');
    // Ganti 'AddNewManagerForm' dengan nama screen tambah manager
    // navigation.navigate('AddNewManagerForm'); 
    navigation.goBack(); // Untuk contoh, kembali ke AddNewManagerForm
  };

  const handleKirimUlangEmail = () => {
    Alert.alert('Kirim Ulang Email', 'Email aktivasi telah dikirim ulang ke alamat manager.');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={localStyles.container} edges={['top', 'bottom']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={localStyles.scrollContent}
      >
        {/* Header */}
        <View style={localStyles.headerContainer}>
          <ImageBackground
            source={require('../../assets/images/App Bar - Bottom.png')} // Ganti dengan path gambar header
            style={localStyles.waveBackground}
            resizeMode="cover"
          >
            <View style={localStyles.headerContent}>
              {/* Tombol Back */}
              <TouchableOpacity
                style={localStyles.headerIconContainerLeft}
                onPress={handleBack}
              >
                <Image
                  source={require('../../assets/icons/material-symbols_arrow-back-rounded.png')} // Ikon back
                  style={localStyles.headerIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <View style={localStyles.headerTitleContainer}>
                 <Image 
                    source={require('../../assets/icons/lets-icons_check-fill.png')} // Ikon centang
                    style={localStyles.checkIcon}
                    resizeMode="contain"
                 />
                 <Text style={localStyles.headerTitle}>Konfirmasi Data</Text>
              </View>
            </View>
          </ImageBackground>
        </View>

        {/* Content */}
        <View style={localStyles.formContainer}>
          
          {/* Checkmark Circle */}
          <View style={localStyles.successCircle}>
            <Image
              source={require('../../assets/icons/complete.png')} // Ikon centang besar
              style={localStyles.successCheck}
              resizeMode="contain"
            />
          </View>

          {/* Success Message */}
          <Text style={localStyles.successTitle}>Manager Berhasil Dibuat!</Text>
          <Text style={localStyles.successSubtitle}>Manager baru telah ditambahkan ke sistem.</Text>

          {/* Summary Card */}
          <View style={localStyles.summaryCard}>
            <Text style={localStyles.summaryName}>{managerData.nama}</Text>
            <Text style={localStyles.summaryUsername}>{managerData.username}</Text>

            <View style={localStyles.summaryDetail}>
              <Image
                source={require('../../assets/icons/majesticons_mail.png')} // Ikon Email
                style={localStyles.summaryIcon}
                resizeMode="contain"
              />
              <Text style={localStyles.summaryDetailText}>{managerData.email}</Text>
            </View>

            <View style={localStyles.summaryDetail}>
              <Image
                source={require('../../assets/icons/majesticons_key.png')} // Ikon Person/Role
                style={localStyles.summaryIcon}
                resizeMode="contain"
              />
              <Text style={localStyles.summaryDetailText}>{managerData.role}</Text>
            </View>
            
            <View style={localStyles.summaryDetail}>
              <Image
                source={require('../../assets/icons/clarity_date-solid (1).png')} // Ikon Calendar/Created At
                style={localStyles.summaryIcon}
                resizeMode="contain"
              />
              <Text style={localStyles.summaryDetailText}>Created : {managerData.createdAt}</Text>
            </View>
          </View>

          {/* Email Sent Badge */}
          <TouchableOpacity 
             style={localStyles.emailBadge}
             onPress={() => Alert.alert('Informasi', `Email aktivasi dikirim ke ${managerData.email}`)}
          >
            <Image
              source={require('../../assets/icons/lets-icons_check-fill (1).png')} // Ikon Email putih
              style={localStyles.emailBadgeIcon}
              resizeMode="contain"
            />
            <Text style={localStyles.emailBadgeText}>Email aktivasi telah dikirim ke</Text>
            <Text style={localStyles.emailBadgeTextBold}>{managerData.email}</Text>
          </TouchableOpacity>

          {/* Next Steps Card */}
          <View style={localStyles.stepsCard}>
            <Text style={localStyles.stepsTitle}>Langkah Selanjutnya</Text>
            <View style={localStyles.stepsList}>
              <Text style={localStyles.stepItem}>1. Manager akan menerima email aktivasi</Text>
              <Text style={localStyles.stepItem}>2. Manager perlu verifikasi email</Text>
              <Text style={localStyles.stepItem}>3. Manager dapat login setelah verifikasi</Text>
              <Text style={localStyles.stepItem}>4. Password akan di-set saat aktivasi</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <TouchableOpacity 
            style={localStyles.userListButton}
            onPress={() => navigation.navigate('AddNewManager')}
          >
            <Text style={localStyles.userListButtonText}>Kembali ke User List</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={localStyles.addMoreButton}
            onPress={() => navigation.navigate('AddNewManagerForm')}
          >
            <Text style={localStyles.addMoreButtonText}>Tambah Manager Lagi</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={localStyles.resendEmailButton}
            onPress={handleKirimUlangEmail}
          >
            <Text style={localStyles.resendEmailButtonText}>Kirim Ulang Email</Text>
          </TouchableOpacity>

          {/* Spacer */}
          <View style={{ height: 40 }} />
        </View>
      </ScrollView>

      {/* Background Logo */}
      <Image
        source={require('../../assets/images/logo-ugn.png')} // Ganti dengan path logo UGN
        style={localStyles.backgroundLogo}
        resizeMode="contain"
      />
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#015023', // Warna hijau tua
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  headerContainer: {
    width: '100%',
  },
  waveBackground: {
    width: '100%',
    height: 80,
    justifyContent: 'center',
    backgroundColor: '#DABC4E', // Warna Emas/Kuning pada header
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20, 
  },
  headerIconContainerLeft: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Latar belakang tombol back
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerIcon: {
    width: 24,
    height: 24,
    tintColor: '#015023', // Ikon back
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    left: 10,
  },
  checkIcon: {
    width: 24,
    height: 24,
    tintColor: '#015023', // Ikon centang
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#015023', // Teks judul
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    alignItems: 'center',
  },
  successCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#38A169', // Hijau sukses
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 6,
    borderColor: '#DABC4E', // Border emas
    marginBottom: 20,
  },
  successCheck: {
    width: 150,
    height: 150,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  successSubtitle: {
    fontSize: 14,
    color: '#DABC4E',
    marginBottom: 30,
    textAlign: 'center',
  },
  summaryCard: {
    backgroundColor: '#FEFAE0', // Putih gading
    borderRadius: 25,
    padding: 24,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  summaryName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#DABC4E',
    marginBottom: 4,
  },
  summaryUsername: {
    fontSize: 14,
    color: '#000',
    marginBottom: 15,
  },
  summaryDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    width: '100%',
  },
  summaryIcon: {
    width: 16,
    height: 16,
    tintColor: '#000',
    marginRight: 8,
  },
  summaryDetailText: {
    fontSize: 13,
    color: '#000',
  },
  emailBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#38A169', // Hijau yang berbeda untuk badge email
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 30,
  },
  emailBadgeIcon: {
    width: 16,
    height: 16,
    tintColor: '#FFFFFF',
    marginRight: 8,
  },
  emailBadgeText: {
    fontSize: 13,
    color: '#FFFFFF',
  },
  emailBadgeTextBold: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 4,
  },
  stepsCard: {
    backgroundColor: '#FEFAE0', // Putih gading
    borderRadius: 25,
    padding: 24,
    marginBottom: 30,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  stepsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#015023',
    marginBottom: 10,
  },
  stepsList: {
    paddingLeft: 0,
  },
  stepItem: {
    fontSize: 13,
    color: '#000',
    lineHeight: 20,
  },
  userListButton: {
    backgroundColor: '#DABC4E',
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 12,
    width: '100%',
    borderWidth: 1,
    borderColor: '#000000ff',
  },
  userListButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffffff',
  },
  addMoreButton: {
    backgroundColor: '#38A169',
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    width: '100%',
    borderWidth: 1,
    borderColor: '#000000ff',
  },
  addMoreButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  resendEmailButton: {
    backgroundColor: '#DC2626',
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#000000ff',
  },
  resendEmailButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  backgroundLogo: {
    position: 'absolute',
    bottom: -350,
    alignSelf: 'center',
    width: 950,
    height: 950,
    opacity: 0.20,
    zIndex: -1,
  },
});

export default KonfirmasiData;