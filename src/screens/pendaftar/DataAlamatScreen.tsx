import React, { useState } from 'react';
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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PendaftarStackParamList } from '../../navigation/PendaftarNavigator';
import PendaftaranStyles from '../../styles/PendaftaranStyles';
import PendaftarStyles from '../../styles/PendaftarStyles';
import LinearGradient from 'react-native-linear-gradient';

type DataAlamatScreenNavigationProp = NativeStackNavigationProp<PendaftarStackParamList, 'DataAlamat'>;

const PROVINSI_OPTIONS = [
  'DKI Jakarta',
  'Jawa Barat',
  'Jawa Tengah',
  'Jawa Timur',
  'DI Yogyakarta',
  'Banten',
  'Bali',
  'Sumatera Utara',
  'Sumatera Barat',
  'Sumatera Selatan',
];

const KOTA_KABUPATEN_OPTIONS = [
  'Jakarta Pusat',
  'Jakarta Utara',
  'Jakarta Selatan',
  'Jakarta Barat',
  'Jakarta Timur',
  'Bandung',
  'Bekasi',
  'Depok',
  'Tangerang',
  'Bogor',
];

interface DropdownModalProps {
  visible: boolean;
  onClose: () => void;
  options: string[];
  onSelect: (value: string) => void;
  selectedValue: string;
}

const DropdownModal: React.FC<DropdownModalProps> = ({ 
  visible, 
  onClose, 
  options, 
  onSelect, 
  selectedValue 
}) => (
  <Modal
    visible={visible}
    transparent
    animationType="fade"
    onRequestClose={onClose}
  >
    <TouchableOpacity 
      style={PendaftaranStyles.modalOverlay} 
      activeOpacity={1}
      onPress={onClose}
    >
      <View style={PendaftaranStyles.modalContent}>
        <ScrollView style={PendaftaranStyles.modalScrollView}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                PendaftaranStyles.modalOption,
                selectedValue === option && PendaftaranStyles.modalOptionSelected
              ]}
              onPress={() => {
                onSelect(option);
                onClose();
              }}
            >
              <Text style={[
                PendaftaranStyles.modalOptionText,
                selectedValue === option && PendaftaranStyles.modalOptionTextSelected
              ]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </TouchableOpacity>
  </Modal>
);

const DataAlamatScreen: React.FC = () => {
  const navigation = useNavigation<DataAlamatScreenNavigationProp>();
  
  // Form states
  const [provinsi, setProvinsi] = useState('');
  const [kotaKabupaten, setKotaKabupaten] = useState('');
  const [kecamatan, setKecamatan] = useState('');
  const [kelurahan, setKelurahan] = useState('');
  const [kodePos, setKodePos] = useState('');
  const [namaDusun, setNamaDusun] = useState('');
  const [alamatLengkap, setAlamatLengkap] = useState('');
  const [currentStep, setCurrentStep] = useState(2);
  
  // Modal states
  const [showProvinsiModal, setShowProvinsiModal] = useState(false);
  const [showKotaKabupatenModal, setShowKotaKabupatenModal] = useState(false);
  const [showKecamatanModal, setShowKecamatanModal] = useState(false);
  const [showKelurahanModal, setShowKelurahanModal] = useState(false);
  const [showKodePosModal, setShowKodePosModal] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  React.useEffect(() => {
    if (!showProvinsiModal && !showKotaKabupatenModal && !showKecamatanModal && 
        !showKelurahanModal && !showKodePosModal) {
      setOpenDropdown(null);
    }
  }, [showProvinsiModal, showKotaKabupatenModal, showKecamatanModal, showKelurahanModal, showKodePosModal]);

  const handleNext = () => {
    console.log('Data Alamat submitted:', {
      provinsi,
      kotaKabupaten,
      kecamatan,
      kelurahan,
      kodePos,
      namaDusun,
      alamatLengkap,
    });
    
  };

  return (
    <SafeAreaView style={PendaftarStyles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
            <View style={[PendaftaranStyles.progressStep, currentStep >= 1 && PendaftaranStyles.progressStepActive]} />
            <View style={[PendaftaranStyles.progressStep, currentStep >= 2 && PendaftaranStyles.progressStepActive]} />
            <View style={[PendaftaranStyles.progressStep, currentStep >= 3 && PendaftaranStyles.progressStepActive]} />
            <View style={[PendaftaranStyles.progressStep, currentStep >= 4 && PendaftaranStyles.progressStepActive]} />
            <View style={[PendaftaranStyles.progressStep, currentStep >= 5 && PendaftaranStyles.progressStepActive]} />
          </View>
        </View>

        <View style={PendaftaranStyles.content}>
          <View style={PendaftaranStyles.sectionContainer}>
            <View style={PendaftaranStyles.sectionHeader}>
              <View style={PendaftaranStyles.numberCircle}>
                <Text style={PendaftaranStyles.numberText}>2</Text>
              </View>
              <Text style={PendaftaranStyles.sectionTitle}>Data Alamat</Text>
            </View>

            <View style={PendaftaranStyles.formGroup}>
              <Text style={PendaftaranStyles.label}>Provinsi</Text>
              <TouchableOpacity 
                style={PendaftaranStyles.pickerContainer}
                onPress={() => {
                  setShowProvinsiModal(true);
                  setOpenDropdown('provinsi');
                }}
              >
                <View style={PendaftaranStyles.pickerInput}>
                  <Text style={[PendaftaranStyles.pickerText, !provinsi && PendaftaranStyles.placeholderText]}>
                    {provinsi || 'Pilih Provinsi'}
                  </Text>
                </View>
                <Image
                  source={
                    openDropdown === 'provinsi'
                      ? require('../../assets/icons/Polygon 5.png')
                      : require('../../assets/icons/Polygon 4.png')
                  }
                  style={PendaftaranStyles.dropdownIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

            <View style={PendaftaranStyles.formGroup}>
              <Text style={PendaftaranStyles.label}>Kota/Kabupaten</Text>
              <TouchableOpacity 
                style={PendaftaranStyles.pickerContainer}
                onPress={() => {
                  setShowKotaKabupatenModal(true);
                  setOpenDropdown('kotaKabupaten');
                }}
              >
                <View style={PendaftaranStyles.pickerInput}>
                  <Text style={[PendaftaranStyles.pickerText, !kotaKabupaten && PendaftaranStyles.placeholderText]}>
                    {kotaKabupaten || 'Pilih Kota/Kabupaten'}
                  </Text>
                </View>
                <Image
                  source={
                    openDropdown === 'kotaKabupaten'
                      ? require('../../assets/icons/Polygon 5.png')
                      : require('../../assets/icons/Polygon 4.png')
                  }
                  style={PendaftaranStyles.dropdownIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

            <View style={PendaftaranStyles.formGroup}>
              <Text style={PendaftaranStyles.label}>Kecamatan</Text>
              <TextInput
                style={PendaftaranStyles.input}
                value={namaDusun}
                onChangeText={setNamaDusun}
                placeholder=""
                placeholderTextColor="#999"
              />
            </View>

            <View style={PendaftaranStyles.formGroup}>
              <Text style={PendaftaranStyles.label}>Kelurahan</Text>
              <TextInput
                style={PendaftaranStyles.input}
                value={namaDusun}
                onChangeText={setNamaDusun}
                placeholder=""
                placeholderTextColor="#999"
              />
            </View>

            <View style={PendaftaranStyles.formGroup}>
              <Text style={PendaftaranStyles.label}>Kode Pos</Text>
              <TextInput
                style={PendaftaranStyles.input}
                value={namaDusun}
                onChangeText={setNamaDusun}
                placeholder=""
                placeholderTextColor="#999"
              />
            </View>

            <View style={PendaftaranStyles.formGroup}>
              <Text style={PendaftaranStyles.label}>Nama Dusun</Text>
              <TextInput
                style={PendaftaranStyles.input}
                value={namaDusun}
                onChangeText={setNamaDusun}
                placeholder=""
                placeholderTextColor="#999"
              />
            </View>

            <View style={PendaftaranStyles.formGroup}>
              <Text style={PendaftaranStyles.label}>Alamat Lengkap</Text>
              <TextInput
                style={PendaftaranStyles.input}
                value={alamatLengkap}
                onChangeText={setAlamatLengkap}
                placeholder=""
                placeholderTextColor="#999"
              />
            </View>

            <TouchableOpacity 
              style={PendaftaranStyles.nextButton}
              onPress={() => navigation.navigate('DataAkademik')}
            >
              <LinearGradient
                colors={['#DABC4E', '#F5EFD3']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={PendaftaranStyles.nextButton}
              >
                <Text style={PendaftaranStyles.nextButtonText}>Next</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <Image
        source={require('../../assets/images/logo-ugn.png')}
        style={PendaftarStyles.backgroundLogo}
        resizeMode="contain"
      />

      <DropdownModal
        visible={showProvinsiModal}
        onClose={() => setShowProvinsiModal(false)}
        options={PROVINSI_OPTIONS}
        onSelect={setProvinsi}
        selectedValue={provinsi}
      />

      <DropdownModal
        visible={showKotaKabupatenModal}
        onClose={() => setShowKotaKabupatenModal(false)}
        options={KOTA_KABUPATEN_OPTIONS}
        onSelect={setKotaKabupaten}
        selectedValue={kotaKabupaten}
      />

    </SafeAreaView>
  );
};

export default DataAlamatScreen;