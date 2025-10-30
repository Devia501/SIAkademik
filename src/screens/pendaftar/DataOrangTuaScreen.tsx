import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Image,
  TextInput,
  Modal,
  Alert,
  StyleSheet, 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PendaftarStackParamList } from '../../navigation/PendaftarNavigator';
import PendaftarStyles from '../../styles/PendaftarStyles';
import PendaftaranStyles from '../../styles/PendaftaranStyles';
import LinearGradient from 'react-native-linear-gradient';

type DataOrangTuaNavigationProp = NativeStackNavigationProp<
  PendaftarStackParamList,
  'DataOrangTua'
>;

// --- Dropdown Modal Component (Tetap Sama) ---
const DropdownModal = ({
  visible,
  onClose,
  options,
  onSelect,
  selectedValue,
}: {
  visible: boolean;
  onClose: () => void;
  options: string[];
  onSelect: (value: string) => void;
  selectedValue: string;
}) => (
  <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
    <TouchableOpacity
      style={PendaftaranStyles.modalOverlay}
      activeOpacity={1}
      onPress={onClose}
    >
      <View style={PendaftaranStyles.modalContent}>
        <ScrollView style={PendaftaranStyles.modalScrollView}>
          {options.map((option, i) => (
            <TouchableOpacity
              key={i}
              style={[
                PendaftaranStyles.modalOption,
                selectedValue === option && PendaftaranStyles.modalOptionSelected,
              ]}
              onPress={() => {
                onSelect(option);
                onClose();
              }}
            >
              <Text
                style={[
                  PendaftaranStyles.modalOptionText,
                  selectedValue === option && PendaftaranStyles.modalOptionTextSelected,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </TouchableOpacity>
  </Modal>
);

const penghasilanOptions = [
  'Kurang dari Rp 1.000.000',
  'Rp 1.000.000 - Rp 3.000.000',
  'Rp 3.000.000 - Rp 5.000.000',
  'Lebih dari Rp 5.000.000',
];

const DataOrangTuaScreen = () => {
  const navigation = useNavigation<DataOrangTuaNavigationProp>();

  const [activeTab, setActiveTab] = useState<'Orang Tua' | 'Wali'>('Orang Tua');
  const [activeParent, setActiveParent] = useState<'Ayah' | 'Ibu'>('Ayah');

  // --- STATE BARU UNTUK MODAL ---
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessSplash, setShowSuccessSplash] = useState(false);
  // ------------------------------

  // states for forms (tetap sama)
  const [ayah, setAyah] = useState({
    nama: '',
    alamat: '',
    nomor: '',
    pekerjaan: '',
    pendidikan: '',
    penghasilan: '',
  });

  const [ibu, setIbu] = useState({
    nama: '',
    alamat: '',
    nomor: '',
    pekerjaan: '',
    pendidikan: '',
    penghasilan: '',
  });

  const [wali, setWali] = useState({
    nama: '',
    alamat: '',
    nomor: '',
    pekerjaan: '',
    pendidikan: '',
    penghasilan: '',
  });

  // dropdown modal state & openDropdown for icon (dropup)
  const [showPenghasilanModal, setShowPenghasilanModal] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    if (!showPenghasilanModal) {
      setOpenDropdown(null);
    }
  }, [showPenghasilanModal]);

  const handleChange = (
    role: 'ayah' | 'ibu' | 'wali',
    key: keyof typeof ayah,
    value: string,
  ) => {
    if (role === 'ayah') setAyah({ ...ayah, [key]: value });
    else if (role === 'ibu') setIbu({ ...ibu, [key]: value });
    else setWali({ ...wali, [key]: value });
  };

  const handleSelectPenghasilan = (value: string) => {
    if (activeTab === 'Orang Tua') {
      if (activeParent === 'Ayah') setAyah({ ...ayah, penghasilan: value });
      else setIbu({ ...ibu, penghasilan: value });
    } else {
      setWali({ ...wali, penghasilan: value });
    }
  };

  // FUNGSI INTI UNTUK MENGELOLA ALUR
  const handlePressSelesai = () => {
    // 1. Validasi (opsional, tapi disarankan)
    // if (validationFailed) { Alert.alert('Error', 'Harap lengkapi semua data'); return; }

    // 2. Tampilkan modal konfirmasi
    setShowConfirmModal(true);
  };

  const handleSubmitConfirmation = () => {
    // 1. Tutup modal konfirmasi
    setShowConfirmModal(false);

    // 2. Tampilkan splash screen berhasil
    setShowSuccessSplash(true);

    // 3. Atur timeout untuk navigasi setelah splash (misal 2.5 detik)
    setTimeout(() => {
      setShowSuccessSplash(false);
      
      // *ASUMSI: Nama rute pembayaran adalah 'RincianBiayaPendaftaran'*
      navigation.navigate('RincianBiayaPendaftaran' as any); 
    }, 2500); 
  };
  // AKHIR FUNGSI INTI

  // helper to get current form object & setter
  const currentForm = () => {
    if (activeTab === 'Orang Tua') {
      return activeParent === 'Ayah' ? ayah : ibu;
    }
    return wali;
  };

  return (
    <SafeAreaView style={PendaftarStyles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header dan Progress Bar (Tidak Berubah) */}
        {/* ... */}
        <View style={PendaftarStyles.headerContainer}>
          <ImageBackground
            source={require('../../assets/images/Rectangle 52.png')}
            style={PendaftarStyles.waveBackground}
            resizeMode="cover"
          >
            <View style={PendaftaranStyles.headerTop}>
              <View style={PendaftaranStyles.headerTitleContainer}>
                <Text style={PendaftaranStyles.headerTitle}>Pendaftaran</Text>
              </View>
            </View>
          </ImageBackground>
        </View>

        <View style={PendaftaranStyles.progressContainer}>
          <View style={PendaftaranStyles.progressBar}>
            <View style={[PendaftaranStyles.progressStep, PendaftaranStyles.progressStepActive]} />
            <View style={[PendaftaranStyles.progressStep, PendaftaranStyles.progressStepActive]} />
            <View style={[PendaftaranStyles.progressStep, PendaftaranStyles.progressStepActive]} />
            <View style={[PendaftaranStyles.progressStep, PendaftaranStyles.progressStepActive]} />
            <View style={[PendaftaranStyles.progressStep, PendaftaranStyles.progressStepActive]} />
          </View>
        </View>

        {/* Content */}
        <View style={PendaftaranStyles.content}>
          <View style={PendaftaranStyles.sectionContainer}>
            <View style={PendaftaranStyles.sectionHeader}>
              <View style={PendaftaranStyles.numberCircle}>
                <Text style={PendaftaranStyles.numberText}>5</Text>
              </View>
              <Text style={PendaftaranStyles.sectionTitle}>Data Orang Tua/Wali</Text>
            </View>

            {/* Tabs Orang Tua / Wali */}
            <View style={localStyles.mainTabContainer}>
              <TouchableOpacity
                style={[
                  localStyles.mainTabButton,
                  activeTab === 'Orang Tua' && localStyles.mainTabActive,
                ]}
                onPress={() => setActiveTab('Orang Tua')}
              >
                <Text style={localStyles.mainTabText}>Orang Tua</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  localStyles.mainTabButton,
                  activeTab === 'Wali' && localStyles.mainTabActive,
                ]}
                onPress={() => setActiveTab('Wali')}
              >
                <Text style={localStyles.mainTabText}>Wali</Text>
              </TouchableOpacity>
            </View>

            {/* Orang Tua form */}
            {activeTab === 'Orang Tua' && (
              <>
                {/* Tabs Ayah / Ibu */}
                <View style={localStyles.subTabContainer}>
                  <TouchableOpacity
                    style={[
                      localStyles.subTabButton,
                      activeParent === 'Ayah' && localStyles.subTabActive,
                    ]}
                    onPress={() => setActiveParent('Ayah')}
                  >
                    <Text style={localStyles.subTabText}>Ayah</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      localStyles.subTabButton,
                      activeParent === 'Ibu' && localStyles.subTabActive,
                    ]}
                    onPress={() => setActiveParent('Ibu')}
                  >
                    <Text style={localStyles.subTabText}>Ibu</Text>
                  </TouchableOpacity>
                </View>
                
                {/* Badge Active Parent */}
                <View style={localStyles.activeParentBadge}>
                  <Text style={localStyles.activeParentText}>{activeParent}</Text>
                </View>

                {/* fields Ayah/Ibu (Dipersingkat) */}
                <View style={PendaftaranStyles.formGroup}><Text style={PendaftaranStyles.label}>Nama {activeParent} Kandung</Text><TextInput style={PendaftaranStyles.input} value={currentForm().nama} onChangeText={(val) => handleChange(activeParent === 'Ayah' ? 'ayah' : 'ibu', 'nama', val)}/></View>
                <View style={PendaftaranStyles.formGroup}><Text style={PendaftaranStyles.label}>Alamat {activeParent} Kandung</Text><TextInput style={PendaftaranStyles.input} value={currentForm().alamat} onChangeText={(val) => handleChange(activeParent === 'Ayah' ? 'ayah' : 'ibu', 'alamat', val)}/></View>
                <View style={PendaftaranStyles.formGroup}><Text style={PendaftaranStyles.label}>Nomor Ponsel {activeParent} Kandung</Text><TextInput style={PendaftaranStyles.input} keyboardType="phone-pad" value={currentForm().nomor} onChangeText={(val) => handleChange(activeParent === 'Ayah' ? 'ayah' : 'ibu', 'nomor', val)}/></View>
                <View style={PendaftaranStyles.formGroup}><Text style={PendaftaranStyles.label}>Pekerjaan {activeParent} Kandung</Text><TextInput style={PendaftaranStyles.input} value={currentForm().pekerjaan} onChangeText={(val) => handleChange(activeParent === 'Ayah' ? 'ayah' : 'ibu', 'pekerjaan', val)}/></View>
                <View style={PendaftaranStyles.formGroup}><Text style={PendaftaranStyles.label}>Pendidikan {activeParent} Kandung</Text><TextInput style={PendaftaranStyles.input} value={currentForm().pendidikan} onChangeText={(val) => handleChange(activeParent === 'Ayah' ? 'ayah' : 'ibu', 'pendidikan', val)}/></View>
                <View style={PendaftaranStyles.formGroup}>
                  <Text style={PendaftaranStyles.label}>Penghasilan {activeParent} Kandung</Text>
                  <TouchableOpacity style={PendaftaranStyles.pickerContainer} onPress={() => {setShowPenghasilanModal(true); setOpenDropdown('penghasilan');}}>
                    <View style={PendaftaranStyles.pickerInput}>
                      <Text style={[PendaftaranStyles.pickerText, !(currentForm().penghasilan) && PendaftaranStyles.placeholderText,]}>{currentForm().penghasilan || 'Pilih Penghasilan'}</Text>
                    </View>
                    <Image source={openDropdown === 'penghasilan' ? require('../../assets/icons/Polygon 5.png') : require('../../assets/icons/Polygon 4.png')} style={PendaftaranStyles.dropdownIcon} resizeMode="contain"/>
                  </TouchableOpacity>
                </View>
              </>
            )}

            {/* Wali form */}
            {activeTab === 'Wali' && (
              <>
                {/* fields Wali (Dipersingkat) */}
                <View style={PendaftaranStyles.formGroup}><Text style={PendaftaranStyles.label}>Nama Wali</Text><TextInput style={PendaftaranStyles.input} value={wali.nama} onChangeText={(val) => handleChange('wali', 'nama', val)}/></View>
                <View style={PendaftaranStyles.formGroup}><Text style={PendaftaranStyles.label}>Alamat Wali</Text><TextInput style={PendaftaranStyles.input} value={wali.alamat} onChangeText={(val) => handleChange('wali', 'alamat', val)}/></View>
                <View style={PendaftaranStyles.formGroup}><Text style={PendaftaranStyles.label}>Nomor Ponsel Wali</Text><TextInput style={PendaftaranStyles.input} keyboardType="phone-pad" value={wali.nomor} onChangeText={(val) => handleChange('wali', 'nomor', val)}/></View>
                <View style={PendaftaranStyles.formGroup}><Text style={PendaftaranStyles.label}>Pekerjaan Wali</Text><TextInput style={PendaftaranStyles.input} value={wali.pekerjaan} onChangeText={(val) => handleChange('wali', 'pekerjaan', val)}/></View>
                <View style={PendaftaranStyles.formGroup}><Text style={PendaftaranStyles.label}>Pendidikan Wali</Text><TextInput style={PendaftaranStyles.input} value={wali.pendidikan} onChangeText={(val) => handleChange('wali', 'pendidikan', val)}/></View>
                
                <View style={PendaftaranStyles.formGroup}>
                  <Text style={PendaftaranStyles.label}>Penghasilan Wali</Text>
                  <TouchableOpacity style={PendaftaranStyles.pickerContainer} onPress={() => {setShowPenghasilanModal(true); setOpenDropdown('penghasilan');}}>
                    <View style={PendaftaranStyles.pickerInput}>
                      <Text style={[PendaftaranStyles.pickerText,!wali.penghasilan && PendaftaranStyles.placeholderText,]}>{wali.penghasilan || 'Pilih Penghasilan'}</Text>
                    </View>
                    <Image source={openDropdown === 'penghasilan' ? require('../../assets/icons/Polygon 5.png') : require('../../assets/icons/Polygon 4.png')} style={PendaftaranStyles.dropdownIcon} resizeMode="contain"/>
                  </TouchableOpacity>
                </View>
              </>
            )}

            {/* Tombol Selesai */}
            <TouchableOpacity
              style={localStyles.submitButton}
              onPress={handlePressSelesai} 
            >
              <LinearGradient
                colors={['#DABC4E', '#F5EFD3']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={localStyles.submitButton}
              >
                <Text style={localStyles.submitButtonText}>Selesai</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* background logo */}
      <Image
        source={require('../../assets/images/logo-ugn.png')}
        style={PendaftarStyles.backgroundLogo}
        resizeMode="contain"
      />

      {/* Dropdown modal for penghasilan (Tetap Sama) */}
      <DropdownModal
        visible={showPenghasilanModal}
        onClose={() => setShowPenghasilanModal(false)}
        options={penghasilanOptions}
        onSelect={handleSelectPenghasilan}
        selectedValue={
          activeTab === 'Orang Tua'
            ? activeParent === 'Ayah'
              ? ayah.penghasilan
              : ibu.penghasilan
            : wali.penghasilan
        }
      />
      
      {/* 1. MODAL KONFIRMASI DATA (image_898866.png) */}
      <Modal visible={showConfirmModal} transparent animationType="fade" onRequestClose={() => setShowConfirmModal(false)}>
        <View style={modalStyles.overlay}>
          {/* GANTI VIEW DENGAN LINEAR GRADIENT */}
          <LinearGradient
            colors={['#DABC4E', '#F5EFD3']} // Warna: emas muda ke emas tua
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={modalStyles.confirmBox}
          >
            <Image
              source={require('../../assets/icons/streamline-block_content-confirm-file.png')} // Asumsi ikon dokumen
              style={modalStyles.confirmIcon}
              resizeMode="contain"
            />
            <Text style={modalStyles.confirmTitle}>Konfirmasi Data</Text>
            <Text style={modalStyles.confirmSubtitle}>Apakah kamu yakin?</Text>
            <View style={modalStyles.confirmButtonRow}>
              <TouchableOpacity
                style={[modalStyles.confirmButton, modalStyles.noButton]}
                onPress={() => setShowConfirmModal(false)}
              >
                <Text style={modalStyles.noButtonText}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[modalStyles.confirmButton, modalStyles.yesButton]}
                onPress={handleSubmitConfirmation} 
              >
                <Text style={modalStyles.yesButtonText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </Modal>

      {/* 2. SUCCESS SPLASH SCREEN (image_89886a.png) */}
      <Modal visible={showSuccessSplash} transparent animationType="fade" statusBarTranslucent>
        <ImageBackground
          source={require('../../assets/images/logo-ugn.png')} // Ganti dengan background yang sesuai jika ada
          style={modalStyles.splashOverlay}
          imageStyle={modalStyles.splashBackgroundImage}
          resizeMode="contain"
        >
          <View style={modalStyles.splashContent}>
            <View style={modalStyles.checkCircle}>
              <Image
                source={require('../../assets/icons/emojione-v1_left-check-mark.png')} // Asumsi ikon centang besar
                style={modalStyles.checkIcon}
                resizeMode="contain"
              />
            </View>
            <Text style={modalStyles.splashTitle}>Selamat, data berhasil dikonfirmasi!</Text>
            <Text style={modalStyles.splashSubtitle}>Redirect ke halaman pembayaran...</Text>
          </View>
        </ImageBackground>
      </Modal>
    </SafeAreaView>
    
  );
};

// --- STYLESHEET LOKAL ---
const localStyles = StyleSheet.create({
  // Gaya untuk Tabs Orang Tua / Wali (Main Tabs)
  mainTabContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: '#A8A350', // Background tab container
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#000',
    overflow: 'hidden',
    marginTop: 10,
    width: '90%', // Mengatur lebar agar terlihat sesuai gambar
  },
  mainTabButton: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainTabActive: {
    backgroundColor: '#E5C363', 
  },
  mainTabText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 14, 
  },

  // Gaya untuk Tabs Ayah / Ibu (Sub Tabs)
  subTabContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: '#fddaace0',
    borderRadius: 20, 
    borderWidth: 1,
    borderColor: '#000',
    overflow: 'hidden',
    marginTop: 20,
    width: '70%', 
  },
  subTabButton: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subTabActive: {
    backgroundColor: '#fddaacff', 
  },
  subTabText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 12, 
  },

  // Gaya untuk Badge Active Parent
  activeParentBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#C8C9A9',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginTop: 20,
  },
  activeParentText: {
    color: '#000',
    fontWeight: '600',
  },

  // Gaya untuk Tombol Selesai
  submitButton: {
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    marginTop: 30,
    marginBottom: 20, 
    alignSelf: 'center',
    width: '60%', // Tetapkan lebar agar paddingHorizontal tidak lagi diperlukan secara eksplisit
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  }
});


// --- STYLESHEET UNTUK MODAL (Konfirmasi & Splash) ---
const modalStyles = StyleSheet.create({
  // Gaya umum untuk Overlay Modal
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Gaya Modal Konfirmasi (image_898866.png)
  confirmBox: {
    width: '80%',
    // HILANGKAN backgroundColor di sini karena LinearGradient akan menanganinya
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000',
    // PASTIKAN style width, height diterapkan pada LinearGradient
  },
  confirmIcon: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  confirmTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#015023',
    marginBottom: 8,
  },
  confirmSubtitle: {
    fontSize: 14,
    color: '#000000ff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  confirmButtonRow: {
    flexDirection: 'row',
    gap: 15,
  },
  confirmButton: {
    flex: 1,
    paddingVertical: 6,
    borderRadius: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
  noButton: {
    backgroundColor: '#BE0414',
  },
  yesButton: {
    backgroundColor: '#189653',
  },
  noButtonText: {
    color: '#000000ff',
    fontWeight: 'bold',
  },
  yesButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  
  // Gaya Modal Splash Sukses (image_89886a.png)
  splashOverlay: {
    flex: 1,
    backgroundColor: '#015023',
    justifyContent: 'center',
    
  },
  splashBackgroundImage: {
    opacity: 0.15, 
    top: 202, 
    width: 950, 
    height: 950,
    left: -295,
  },
  splashContent: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -50, 
  },
  checkCircle: {
    width: 150,
    height: 150,
    borderRadius: 100,
    backgroundColor: '#F5EFD3', // Warna emas
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#DABC4E',
  },
  checkIcon: {
    width: 80,
    height: 80,
  },
  splashTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 8,
  },
  splashSubtitle: {
    fontSize: 14,
    color: '#FFF',
  },
});

export default DataOrangTuaScreen;