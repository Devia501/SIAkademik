import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Image,
  TextInput,
  StyleSheet,
  Dimensions,
  Modal,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PendaftarStackParamList } from '../../navigation/PendaftarNavigator';
import PendaftaranStyles from '../../styles/PendaftaranStyles';
import PendaftarStyles from '../../styles/PendaftarStyles';
import { pick, types } from '@react-native-documents/picker';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

type PendaftaranScreenNavigationProp = NativeStackNavigationProp<PendaftarStackParamList, 'PendaftaranMahasiswa'>;

const PRODI_OPTIONS = [
  'Teknik Informatika',
  'Sistem Informasi',
  'Manajemen',
  'Akuntansi',
  'Hukum',
  'Psikologi',
  'Desain Komunikasi Visual',
  'Arsitektur',
];

const JENIS_KELAMIN_OPTIONS = [
  'Laki-laki',
  'Perempuan',
];

const KEWARGANEGARAAN_OPTIONS = [
  'WNI (Warga Negara Indonesia)',
  'WNA (Warga Negara Asing)',
];

interface PickedDocument {
  uri: string;
  name: string;
  size: number;
  type: string;
}

const DropdownModal = ({ 
  visible, 
  onClose, 
  options, 
  onSelect, 
  selectedValue 
}: { 
  visible: boolean; 
  onClose: () => void; 
  options: string[]; 
  onSelect: (value: string) => void;
  selectedValue: string;
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

const formatFileSize = (bytes: number | undefined): string => {
  if (!bytes) return '0 KB';
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
};

const PendaftaranScreen = () => {
  const navigation = useNavigation<PendaftaranScreenNavigationProp>();
  
  // Form states
  const [namaLengkap, setNamaLengkap] = useState('');
  const [email, setEmail] = useState('');
  const [prodiPilihan1, setProdiPilihan1] = useState('');
  const [prodiPilihan2, setProdiPilihan2] = useState('');
  const [prodiPilihan3, setProdiPilihan3] = useState('');
  const [jenisKelamin, setJenisKelamin] = useState('');
  const [agama, setAgama] = useState('');
  const [nomorPonsel, setNomorPonsel] = useState('');
  const [tempatLahir, setTempatLahir] = useState('');
  const [tanggalLahir, setTanggalLahir] = useState('');
  const [nik, setNik] = useState('');
  const [uploadedDocument, setUploadedDocument] = useState<PickedDocument | null>(null);
  const [nomorRegistrasiAktaLahir, setNomorRegistrasiAktaLahir] = useState('');
  const [uploadedAktaKelahiran, setUploadedAktaKelahiran] = useState<PickedDocument | null>(null);
  const [nomorKartuKeluarga, setNomorKartuKeluarga] = useState('');
  const [uploadedKartuKeluarga, setUploadedKartuKeluarga] = useState<PickedDocument | null>(null);
  const [kewarganegaraan, setKewarganegaraan] = useState('');
  const [anakKeBerapa, setAnakKeBerapa] = useState('');
  const [jumlahSaudaraKandung, setJumlahSaudaraKandung] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [showProdi1Modal, setShowProdi1Modal] = useState(false);
  const [showProdi2Modal, setShowProdi2Modal] = useState(false);
  const [showProdi3Modal, setShowProdi3Modal] = useState(false);
  const [showJenisKelaminModal, setShowJenisKelaminModal] = useState(false);
  const [showKewarganegaraanModal, setShowKewarganegaraanModal] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  React.useEffect(() => {
    if (!showProdi1Modal && !showProdi2Modal && !showProdi3Modal && 
        !showJenisKelaminModal && !showKewarganegaraanModal) {
      setOpenDropdown(null);
    }
  }, [showProdi1Modal, showProdi2Modal, showProdi3Modal, showJenisKelaminModal, showKewarganegaraanModal]);

  const handleDocumentPick = async () => {
    try {
      const result = await pick({
        type: [types.pdf, types.images],
        allowMultiSelection: false,
      });

      if (result && result.length > 0) {
        const file = result[0];
        setUploadedDocument({
          uri: file.uri,
          name: file.name || 'Unknown',
          size: file.size || 0,
          type: file.type || '',
        });
        Alert.alert('Sukses', 'KTP/Kitas berhasil diunggah');
      }
    } catch (error: any) {
      if (error?.code !== 'DOCUMENT_PICKER_CANCELED') {
        Alert.alert('Error', 'Gagal mengunggah dokumen');
      }
    }
  };

  const handleAktaKelahiranPick = async () => {
    try {
      const result = await pick({
        type: [types.pdf, types.images],
        allowMultiSelection: false,
      });

      if (result && result.length > 0) {
        const file = result[0];
        setUploadedAktaKelahiran({
          uri: file.uri,
          name: file.name || 'Unknown',
          size: file.size || 0,
          type: file.type || '',
        });
        Alert.alert('Sukses', 'Akta Kelahiran berhasil diunggah');
      }
    } catch (error: any) {
      if (error?.code !== 'DOCUMENT_PICKER_CANCELED') {
        Alert.alert('Error', 'Gagal mengunggah Akta Kelahiran');
      }
    }
  };

  const handleKartuKeluargaPick = async () => {
    try {
      const result = await pick({
        type: [types.pdf, types.images],
        allowMultiSelection: false,
      });

      if (result && result.length > 0) {
        const file = result[0];
        setUploadedKartuKeluarga({
          uri: file.uri,
          name: file.name || 'Unknown',
          size: file.size || 0,
          type: file.type || '',
        });
        Alert.alert('Sukses', 'Kartu Keluarga berhasil diunggah');
      }
    } catch (error: any) {
      if (error?.code !== 'DOCUMENT_PICKER_CANCELED') {
        Alert.alert('Error', 'Gagal mengunggah Kartu Keluarga');
      }
    }
  };

  const handleViewDocument = (doc: PickedDocument | null, title: string) => {
    if (!doc) return;
    
    Alert.alert(
      title,
      `Nama File: ${doc.name}\nUkuran: ${formatFileSize(doc.size)}\nTipe: ${doc.type}`,
      [
        { text: 'OK', style: 'cancel' }
      ]
    );
  };

  const handleDeleteDocument = (type: 'ktp' | 'akta' | 'kk') => {
    const titles = {
      ktp: 'KTP/Kitas',
      akta: 'Akta Kelahiran',
      kk: 'Kartu Keluarga'
    };

    Alert.alert(
      'Hapus Dokumen',
      `Apakah Anda yakin ingin menghapus ${titles[type]}?`,
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: () => {
            if (type === 'ktp') setUploadedDocument(null);
            else if (type === 'akta') setUploadedAktaKelahiran(null);
            else if (type === 'kk') setUploadedKartuKeluarga(null);
            Alert.alert('Sukses', `${titles[type]} berhasil dihapus`);
          }
        }
      ]
    );
  };

  const handleNext = () => {
    console.log('Form submitted:', {
      namaLengkap,
      email,
      prodiPilihan1,
      prodiPilihan2,
      prodiPilihan3,
      jenisKelamin,
      agama,
      nomorPonsel,
      tempatLahir,
      tanggalLahir,
      nik,
      uploadedDocument,
      nomorRegistrasiAktaLahir,
      uploadedAktaKelahiran,
      nomorKartuKeluarga,
      uploadedKartuKeluarga,
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
                <Text style={PendaftaranStyles.numberText}>1</Text>
              </View>
              <Text style={PendaftaranStyles.sectionTitle}>Identitas Mahasiswa</Text>
            </View>

            <View style={PendaftaranStyles.formGroup}>
              <Text style={PendaftaranStyles.label}>Nama Lengkap</Text>
              <TextInput
                style={PendaftaranStyles.input}
                value={namaLengkap}
                onChangeText={setNamaLengkap}
                placeholder=""
                placeholderTextColor="#999"
              />
            </View>

            <View style={PendaftaranStyles.formGroup}>
              <Text style={PendaftaranStyles.label}>Email</Text>
              <TextInput
                style={PendaftaranStyles.input}
                value={email}
                onChangeText={setEmail}
                placeholder=""
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={PendaftaranStyles.prodiSection}>
            <View style={PendaftaranStyles.prodiCard}>
              <View style={PendaftaranStyles.prodiFormGroup}>
                <Text style={PendaftaranStyles.prodiSectionTitle}>Pilihan Program Studi</Text>
                <Text style={PendaftaranStyles.prodiLabel}>Prodi Pilihan 1</Text>
                <TouchableOpacity 
                  style={PendaftaranStyles.pickerContainer}
                  onPress={() => {
                    setShowProdi1Modal(true);
                    setOpenDropdown('prodi1');
                  }}
                >
                  <View style={PendaftaranStyles.pickerInput}>
                    <Text style={[PendaftaranStyles.pickerText, !prodiPilihan1 && PendaftaranStyles.placeholderText]}>
                      {prodiPilihan1 || 'Pilih Program Studi'}
                    </Text>
                  </View>
                  <Image
                    source={
                      openDropdown === 'prodi1'
                        ? require('../../assets/icons/Polygon 5.png')
                        : require('../../assets/icons/Polygon 4.png')
                    }
                    style={PendaftaranStyles.dropdownIcon}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>

              <View style={PendaftaranStyles.prodiFormGroup}>
                <Text style={PendaftaranStyles.prodiLabel}>Prodi Pilihan 2</Text>
                <TouchableOpacity 
                  style={PendaftaranStyles.pickerContainer}
                  onPress={() => {
                    setShowProdi2Modal(true);
                    setOpenDropdown('prodi2');
                  }}
                >
                  <View style={PendaftaranStyles.pickerInput}>
                    <Text style={[PendaftaranStyles.pickerText, !prodiPilihan2 && PendaftaranStyles.placeholderText]}>
                      {prodiPilihan2 || 'Pilih Program Studi'}
                    </Text>
                  </View>
                  <Image
                    source={
                      openDropdown === 'prodi2'
                        ? require('../../assets/icons/Polygon 5.png')
                        : require('../../assets/icons/Polygon 4.png')
                    }
                    style={PendaftaranStyles.dropdownIcon}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>

              <View style={PendaftaranStyles.prodiFormGroup}>
                <Text style={PendaftaranStyles.prodiLabel}>Prodi Pilihan 3</Text>
                <TouchableOpacity 
                  style={PendaftaranStyles.pickerContainer}
                  onPress={() => {
                    setShowProdi3Modal(true);
                    setOpenDropdown('prodi3');
                  }}
                >
                  <View style={PendaftaranStyles.pickerInput}>
                    <Text style={[PendaftaranStyles.pickerText, !prodiPilihan3 && PendaftaranStyles.placeholderText]}>
                      {prodiPilihan3 || 'Pilih Program Studi'}
                    </Text>
                  </View>
                  <Image
                    source={
                      openDropdown === 'prodi3'
                        ? require('../../assets/icons/Polygon 5.png')
                        : require('../../assets/icons/Polygon 4.png')
                    }
                    style={PendaftaranStyles.dropdownIcon}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={PendaftaranStyles.formGroup}>
            <Text style={PendaftaranStyles.label}>Jenis Kelamin</Text>
            <TouchableOpacity 
              style={PendaftaranStyles.pickerContainer}
              onPress={() => {
                setShowJenisKelaminModal(true);
                setOpenDropdown('jenisKelamin');
              }}
            >
              <View style={PendaftaranStyles.pickerInput}>
                <Text style={[PendaftaranStyles.pickerText, !jenisKelamin && PendaftaranStyles.placeholderText]}>
                  {jenisKelamin || 'Pilih Jenis Kelamin'}
                </Text>
              </View>
              <Image
                source={
                  openDropdown === 'jenisKelamin'
                    ? require('../../assets/icons/Polygon 5.png')
                    : require('../../assets/icons/Polygon 4.png')
                }
                style={PendaftaranStyles.dropdownIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <View style={PendaftaranStyles.formGroup}>
            <Text style={PendaftaranStyles.label}>Agama</Text>
            <TextInput
              style={PendaftaranStyles.input}
              value={agama}
              onChangeText={setAgama}
              placeholder=""
              placeholderTextColor="#999"
            />
          </View>

          <View style={PendaftaranStyles.formGroup}>
            <Text style={PendaftaranStyles.label}>Nomor Ponsel</Text>
            <TextInput
              style={PendaftaranStyles.input}
              value={nomorPonsel}
              onChangeText={setNomorPonsel}
              placeholder=""
              placeholderTextColor="#999"
              keyboardType="phone-pad"
            />
          </View>

          <View style={PendaftaranStyles.formGroup}>
            <Text style={PendaftaranStyles.label}>Tempat Lahir</Text>
            <TextInput
              style={PendaftaranStyles.input}
              value={tempatLahir}
              onChangeText={setTempatLahir}
              placeholder=""
              placeholderTextColor="#999"
            />
          </View>

          <View style={PendaftaranStyles.formGroup}>
            <Text style={PendaftaranStyles.label}>Tanggal Lahir</Text>
            <TextInput
              style={PendaftaranStyles.input}
              value={tanggalLahir}
              onChangeText={setTanggalLahir}
              placeholder="DD/MM/YYYY"
              placeholderTextColor="#999"
            />
          </View>

          <View style={PendaftaranStyles.formGroup}>
            <Text style={PendaftaranStyles.label}>NIK/Kitas (WNA)</Text>
            <TextInput
              style={PendaftaranStyles.input}
              value={nik}
              onChangeText={setNik}
              placeholder=""
              placeholderTextColor="#999"
              keyboardType="numeric"
            />
          </View>

          <View style={PendaftaranStyles.formGroup}>
            <Text style={PendaftaranStyles.label}>Upload KTP/Kitas (PDF/File images)</Text>
            <TouchableOpacity 
              style={PendaftaranStyles.uploadButton}
              onPress={handleDocumentPick}
            >
              <View style={PendaftaranStyles.uploadContent}>
                {uploadedDocument ? (
                  <View style={PendaftaranStyles.uploadedFileContainer}>
                    <Text style={PendaftaranStyles.uploadedFileName} numberOfLines={1}>
                      {uploadedDocument.name}
                    </Text>
                    <Text style={PendaftaranStyles.uploadedFileSize}>
                      {formatFileSize(uploadedDocument.size)}
                    </Text>
                  </View>
                ) : (
                  <View style={PendaftaranStyles.uploadIconCircle}>
                    <Image
                      source={require('../../assets/icons/ic_baseline-plus.png')}
                      style={PendaftaranStyles.uploadIcon}
                      resizeMode="contain"
                    />
                  </View>
                )}
              </View>
            </TouchableOpacity>
            {uploadedDocument && (
              <View style={PendaftaranStyles.documentActions}>
                <TouchableOpacity
                  style={PendaftaranStyles.viewButton}
                  onPress={() => handleViewDocument(uploadedDocument, 'Detail KTP/Kitas')}
                >
                  <Image
                    source={require('../../assets/icons/fi-sr-eye.png')}
                    style={PendaftaranStyles.actionIcon}
                    resizeMode="contain"
                  />
                  <Text style={PendaftaranStyles.viewButtonText}>Lihat</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={PendaftaranStyles.deleteButton}
                  onPress={() => handleDeleteDocument('ktp')}
                >
                  <Image
                    source={require('../../assets/icons/line-md_trash.png')}
                    style={PendaftaranStyles.actionIcon}
                    resizeMode="contain"
                  />
                  <Text style={PendaftaranStyles.deleteButtonText}>Hapus</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View style={PendaftaranStyles.formGroup}>
            <Text style={PendaftaranStyles.label}>Nomor Registrasi Akta Lahir</Text>
            <TextInput
              style={PendaftaranStyles.input}
              value={nomorRegistrasiAktaLahir}
              onChangeText={setNomorRegistrasiAktaLahir}
              placeholder=""
              placeholderTextColor="#999"
            />
          </View>

          <View style={PendaftaranStyles.formGroup}>
            <Text style={PendaftaranStyles.label}>Upload Akta Kelahiran (PDF/File images)</Text>
            <TouchableOpacity 
              style={PendaftaranStyles.uploadButton}
              onPress={handleAktaKelahiranPick}
            >
              <View style={PendaftaranStyles.uploadContent}>
                {uploadedAktaKelahiran ? (
                  <View style={PendaftaranStyles.uploadedFileContainer}>
                    <Text style={PendaftaranStyles.uploadedFileName} numberOfLines={1}>
                      {uploadedAktaKelahiran.name}
                    </Text>
                    <Text style={PendaftaranStyles.uploadedFileSize}>
                      {formatFileSize(uploadedAktaKelahiran.size)}
                    </Text>
                  </View>
                ) : (
                  <View style={PendaftaranStyles.uploadIconCircle}>
                    <Image
                      source={require('../../assets/icons/ic_baseline-plus.png')}
                      style={PendaftaranStyles.uploadIcon}
                      resizeMode="contain"
                    />
                  </View>
                )}
              </View>
            </TouchableOpacity>
            {uploadedAktaKelahiran && (
              <View style={PendaftaranStyles.documentActions}>
                <TouchableOpacity
                  style={PendaftaranStyles.viewButton}
                  onPress={() => handleViewDocument(uploadedAktaKelahiran, 'Detail Akta Kelahiran')}
                >
                  <Image
                    source={require('../../assets/icons/fi-sr-eye.png')}
                    style={PendaftaranStyles.actionIcon}
                    resizeMode="contain"
                  />
                  <Text style={PendaftaranStyles.viewButtonText}>Lihat</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={PendaftaranStyles.deleteButton}
                  onPress={() => handleDeleteDocument('akta')}
                >
                  <Image
                    source={require('../../assets/icons/line-md_trash.png')}
                    style={PendaftaranStyles.actionIcon}
                    resizeMode="contain"
                  />
                  <Text style={PendaftaranStyles.deleteButtonText}>Hapus</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View style={PendaftaranStyles.formGroup}>
            <Text style={PendaftaranStyles.label}>Nomor Kartu Keluarga</Text>
            <TextInput
              style={PendaftaranStyles.input}
              value={nomorKartuKeluarga}
              onChangeText={setNomorKartuKeluarga}
              placeholder=""
              placeholderTextColor="#999"
              keyboardType="numeric"
            />
          </View>

          <View style={PendaftaranStyles.formGroup}>
            <Text style={PendaftaranStyles.label}>Upload Kartu Keluarga (PDF/File images)</Text>
            <TouchableOpacity 
              style={PendaftaranStyles.uploadButton}
              onPress={handleKartuKeluargaPick}
            >
              <View style={PendaftaranStyles.uploadContent}>
                {uploadedKartuKeluarga ? (
                  <View style={PendaftaranStyles.uploadedFileContainer}>
                    <Text style={PendaftaranStyles.uploadedFileName} numberOfLines={1}>
                      {uploadedKartuKeluarga.name}
                    </Text>
                    <Text style={PendaftaranStyles.uploadedFileSize}>
                      {formatFileSize(uploadedKartuKeluarga.size)}
                    </Text>
                  </View>
                ) : (
                  <View style={PendaftaranStyles.uploadIconCircle}>
                    <Image
                      source={require('../../assets/icons/ic_baseline-plus.png')}
                      style={PendaftaranStyles.uploadIcon}
                      resizeMode="contain"
                    />
                  </View>
                )}
              </View>
            </TouchableOpacity>
            {uploadedKartuKeluarga && (
              <View style={PendaftaranStyles.documentActions}>
                <TouchableOpacity
                  style={PendaftaranStyles.viewButton}
                  onPress={() => handleViewDocument(uploadedKartuKeluarga, 'Detail Kartu Keluarga')}
                >
                  <Image
                    source={require('../../assets/icons/fi-sr-eye.png')}
                    style={PendaftaranStyles.actionIcon}
                    resizeMode="contain"
                  />
                  <Text style={PendaftaranStyles.viewButtonText}>Lihat</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={PendaftaranStyles.deleteButton}
                  onPress={() => handleDeleteDocument('kk')}
                >
                  <Image
                    source={require('../../assets/icons/line-md_trash.png')}
                    style={PendaftaranStyles.actionIcon}
                    resizeMode="contain"
                  />
                  <Text style={PendaftaranStyles.deleteButtonText}>Hapus</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View style={PendaftaranStyles.formGroup}>
            <Text style={PendaftaranStyles.label}>Kewarganegaraan</Text>
            <TouchableOpacity 
              style={PendaftaranStyles.pickerContainer}
              onPress={() => {
                setShowKewarganegaraanModal(true);
                setOpenDropdown('kewarganegaraan');
              }}
            >
              <View style={PendaftaranStyles.pickerInput}>
                <Text style={[PendaftaranStyles.pickerText, !kewarganegaraan && PendaftaranStyles.placeholderText]}>
                  {kewarganegaraan || 'Pilih Kewarganegaraan'}
                </Text>
              </View>
              <Image
                source={
                  openDropdown === 'kewarganegaraan'
                    ? require('../../assets/icons/Polygon 5.png')
                    : require('../../assets/icons/Polygon 4.png')
                }
                style={PendaftaranStyles.dropdownIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <View style={PendaftaranStyles.formGroup}>
            <Text style={PendaftaranStyles.label}>Anak ke Berapa</Text>
            <TextInput
              style={PendaftaranStyles.input}
              value={anakKeBerapa}
              onChangeText={setAnakKeBerapa}
              placeholder=""
              placeholderTextColor="#999"
              keyboardType="numeric"
            />
          </View>

          <View style={PendaftaranStyles.formGroup}>
            <Text style={PendaftaranStyles.label}>Jumlah Saudara Kandung</Text>
            <TextInput
              style={PendaftaranStyles.input}
              value={jumlahSaudaraKandung}
              onChangeText={setJumlahSaudaraKandung}
              placeholder=""
              placeholderTextColor="#999"
              keyboardType="numeric"
            />
          </View>

          <TouchableOpacity 
            style={PendaftaranStyles.nextButton}
            onPress={() => navigation.navigate('DataAlamat')}
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
      </ScrollView>

      <Image
        source={require('../../assets/images/logo-ugn.png')}
        style={PendaftarStyles.backgroundLogo}
        resizeMode="contain"
      />
      <DropdownModal
        visible={showProdi1Modal}
        onClose={() => {
          setShowProdi1Modal(false);
        }}
        options={PRODI_OPTIONS}
        onSelect={setProdiPilihan1}
        selectedValue={prodiPilihan1}
      />
      
      <DropdownModal
        visible={showProdi2Modal}
        onClose={() => {
          setShowProdi2Modal(false);
        }}
        options={PRODI_OPTIONS}
        onSelect={setProdiPilihan2}
        selectedValue={prodiPilihan2}
      />
      
      <DropdownModal
        visible={showProdi3Modal}
        onClose={() => {
          setShowProdi3Modal(false);
        }}
        options={PRODI_OPTIONS}
        onSelect={setProdiPilihan3}
        selectedValue={prodiPilihan3}
      />
      
      <DropdownModal
        visible={showJenisKelaminModal}
        onClose={() => {
          setShowJenisKelaminModal(false);
        }}
        options={JENIS_KELAMIN_OPTIONS}
        onSelect={setJenisKelamin}
        selectedValue={jenisKelamin}
      />

      <DropdownModal
        visible={showKewarganegaraanModal}
        onClose={() => {
          setShowKewarganegaraanModal(false);
        }}
        options={KEWARGANEGARAAN_OPTIONS}
        onSelect={setKewarganegaraan}
        selectedValue={kewarganegaraan}
      />
    </SafeAreaView>
  );
};

export default PendaftaranScreen;