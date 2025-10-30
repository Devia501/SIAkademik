import React, { useState, useEffect } from 'react';
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
import PendaftarStyles from '../../styles/PendaftarStyles';
import PendaftaranStyles from '../../styles/PendaftaranStyles';
import { pick, types } from '@react-native-documents/picker';
import LinearGradient from 'react-native-linear-gradient';

type DataAkademikNavigationProp = NativeStackNavigationProp<
  PendaftarStackParamList,
  'DataAkademik'
>;

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
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
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

const STATUS_KELULUSAN_OPTIONS = ['Sudah Lulus', 'Belum Lulus'];
const IJAZAH_TERAKHIR_OPTIONS = ['SMA', 'SMK', 'MA', 'Lainnya'];

const formatFileSize = (bytes: number | undefined): string => {
  if (!bytes) return '0 KB';
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
};

const DataAkademikScreen = () => {
  const navigation = useNavigation<DataAkademikNavigationProp>();

  const [sekolahAsal, setSekolahAsal] = useState('');
  const [statusKelulusan, setStatusKelulusan] = useState('');
  const [ijazahTerakhir, setIjazahTerakhir] = useState('');

  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showIjazahModal, setShowIjazahModal] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const [ijazahFile, setIjazahFile] = useState<PickedDocument | null>(null);
  const [sklFile, setSklFile] = useState<PickedDocument | null>(null);
  const [transkripFile, setTranskripFile] = useState<PickedDocument | null>(null);

  useEffect(() => {
    if (!showStatusModal && !showIjazahModal) {
      setOpenDropdown(null);
    }
  }, [showStatusModal, showIjazahModal]);

  const handlePickDocument = async (
    setter: React.Dispatch<React.SetStateAction<PickedDocument | null>>,
    label: string,
  ) => {
    try {
      const result = await pick({
        type: [types.pdf, types.images],
        allowMultiSelection: false,
      });
      if (result && result.length > 0) {
        const file = result[0];
        setter({
          uri: file.uri,
          name: file.name || 'Unknown',
          size: file.size || 0,
          type: file.type || '',
        });
        Alert.alert('Sukses', `${label} berhasil diunggah`);
      }
    } catch (error: any) {
      if (error?.code !== 'DOCUMENT_PICKER_CANCELED') {
        Alert.alert('Error', `Gagal mengunggah ${label}`);
      }
    }
  };

  const handleViewDocument = (doc: PickedDocument | null, title: string) => {
    if (!doc) return;
    Alert.alert(
      title,
      `Nama File: ${doc.name}\nUkuran: ${formatFileSize(doc.size)}\nTipe: ${doc.type}`,
      [{ text: 'OK', style: 'cancel' }],
    );
  };

  const handleDeleteDocument = (
    type: 'ijazah' | 'skl' | 'transkrip',
  ) => {
    const titles = {
      ijazah: 'Ijazah Terakhir',
      skl: 'SKL',
      transkrip: 'Transkrip Nilai',
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
            if (type === 'ijazah') setIjazahFile(null);
            else if (type === 'skl') setSklFile(null);
            else if (type === 'transkrip') setTranskripFile(null);
            Alert.alert('Sukses', `${titles[type]} berhasil dihapus`);
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={PendaftarStyles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
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

        {/* Progress Bar */}
        <View style={PendaftaranStyles.progressContainer}>
          <View style={PendaftaranStyles.progressBar}>
            <View style={[PendaftaranStyles.progressStep, PendaftaranStyles.progressStepActive]} />
            <View style={[PendaftaranStyles.progressStep, PendaftaranStyles.progressStepActive]} />
            <View style={[PendaftaranStyles.progressStep, PendaftaranStyles.progressStepActive]} />
            <View style={PendaftaranStyles.progressStep} />
            <View style={PendaftaranStyles.progressStep} />
          </View>
        </View>

        {/* Content */}
        <View style={PendaftaranStyles.content}>
          <View style={PendaftaranStyles.sectionContainer}>
            <View style={PendaftaranStyles.sectionHeader}>
              <View style={PendaftaranStyles.numberCircle}>
                <Text style={PendaftaranStyles.numberText}>3</Text>
              </View>
              <Text style={PendaftaranStyles.sectionTitle}>Data Akademik</Text>
            </View>

            {/* Sekolah Asal */}
            <View style={PendaftaranStyles.formGroup}>
              <Text style={PendaftaranStyles.label}>Sekolah Asal</Text>
              <TextInput
                style={PendaftaranStyles.input}
                value={sekolahAsal}
                onChangeText={setSekolahAsal}
                placeholder=""
                placeholderTextColor="#999"
              />
            </View>

            {/* Status Kelulusan */}
            <View style={PendaftaranStyles.formGroup}>
              <Text style={PendaftaranStyles.label}>Status Kelulusan</Text>
              <TouchableOpacity
                style={PendaftaranStyles.pickerContainer}
                onPress={() => {
                  setShowStatusModal(true);
                  setOpenDropdown('statusKelulusan');
                }}
              >
                <View style={PendaftaranStyles.pickerInput}>
                  <Text
                    style={[
                      PendaftaranStyles.pickerText,
                      !statusKelulusan && PendaftaranStyles.placeholderText,
                    ]}
                  >
                    {statusKelulusan || 'Sudah/Belum'}
                  </Text>
                </View>
                <Image
                  source={
                    openDropdown === 'statusKelulusan'
                      ? require('../../assets/icons/Polygon 5.png')
                      : require('../../assets/icons/Polygon 4.png')
                  }
                  style={PendaftaranStyles.dropdownIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

            {/* Ijazah Terakhir */}
            <View style={PendaftaranStyles.formGroup}>
              <Text style={PendaftaranStyles.label}>Ijazah Terakhir</Text>
              <TouchableOpacity
                style={PendaftaranStyles.pickerContainer}
                onPress={() => {
                  setShowIjazahModal(true);
                  setOpenDropdown('ijazahTerakhir');
                }}
              >
                <View style={PendaftaranStyles.pickerInput}>
                  <Text
                    style={[
                      PendaftaranStyles.pickerText,
                      !ijazahTerakhir && PendaftaranStyles.placeholderText,
                    ]}
                  >
                    {ijazahTerakhir || 'SMA/SMK/MA/Lainnya'}
                  </Text>
                </View>
                <Image
                  source={
                    openDropdown === 'ijazahTerakhir'
                      ? require('../../assets/icons/Polygon 5.png')
                      : require('../../assets/icons/Polygon 4.png')
                  }
                  style={PendaftaranStyles.dropdownIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

            {/* Upload Ijazah */}
            <View style={PendaftaranStyles.formGroup}>
              <Text style={PendaftaranStyles.label}>Upload Ijazah Terakhir</Text>
              <TouchableOpacity
                style={PendaftaranStyles.uploadButton}
                onPress={() => handlePickDocument(setIjazahFile, 'Ijazah Terakhir')}
              >
                <View style={PendaftaranStyles.uploadContent}>
                  {ijazahFile ? (
                    <View style={PendaftaranStyles.uploadedFileContainer}>
                      <Text style={PendaftaranStyles.uploadedFileName} numberOfLines={1}>
                        {ijazahFile.name}
                      </Text>
                      <Text style={PendaftaranStyles.uploadedFileSize}>
                        {formatFileSize(ijazahFile.size)}
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

              {ijazahFile && (
                <View style={PendaftaranStyles.documentActions}>
                  <TouchableOpacity
                    style={PendaftaranStyles.viewButton}
                    onPress={() => handleViewDocument(ijazahFile, 'Detail Ijazah Terakhir')}
                  >
                    <Image
                      source={require('../../assets/icons/fi-sr-eye.png')}
                      style={PendaftaranStyles.actionIcon}
                    />
                    <Text style={PendaftaranStyles.viewButtonText}>Lihat</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={PendaftaranStyles.deleteButton}
                    onPress={() => handleDeleteDocument('ijazah')}
                  >
                    <Image
                      source={require('../../assets/icons/line-md_trash.png')}
                      style={PendaftaranStyles.actionIcon}
                    />
                    <Text style={PendaftaranStyles.deleteButtonText}>Hapus</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* Upload SKL */}
            <View style={PendaftaranStyles.formGroup}>
              <Text style={PendaftaranStyles.label}>Upload SKL (Jika Ijazah belum keluar)</Text>
              <TouchableOpacity
                style={PendaftaranStyles.uploadButton}
                onPress={() => handlePickDocument(setSklFile, 'SKL')}
              >
                <View style={PendaftaranStyles.uploadContent}>
                  {sklFile ? (
                    <View style={PendaftaranStyles.uploadedFileContainer}>
                      <Text style={PendaftaranStyles.uploadedFileName} numberOfLines={1}>
                        {sklFile.name}
                      </Text>
                      <Text style={PendaftaranStyles.uploadedFileSize}>
                        {formatFileSize(sklFile.size)}
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

              {sklFile && (
                <View style={PendaftaranStyles.documentActions}>
                  <TouchableOpacity
                    style={PendaftaranStyles.viewButton}
                    onPress={() => handleViewDocument(sklFile, 'Detail SKL')}
                  >
                    <Image
                      source={require('../../assets/icons/fi-sr-eye.png')}
                      style={PendaftaranStyles.actionIcon}
                    />
                    <Text style={PendaftaranStyles.viewButtonText}>Lihat</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={PendaftaranStyles.deleteButton}
                    onPress={() => handleDeleteDocument('skl')}
                  >
                    <Image
                      source={require('../../assets/icons/line-md_trash.png')}
                      style={PendaftaranStyles.actionIcon}
                    />
                    <Text style={PendaftaranStyles.deleteButtonText}>Hapus</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* Upload Transkrip */}
            <View style={PendaftaranStyles.formGroup}>
              <Text style={PendaftaranStyles.label}>Upload Transkrip Nilai / Rapor Terakhir</Text>
              <TouchableOpacity
                style={PendaftaranStyles.uploadButton}
                onPress={() => handlePickDocument(setTranskripFile, 'Transkrip Nilai')}
              >
                <View style={PendaftaranStyles.uploadContent}>
                  {transkripFile ? (
                    <View style={PendaftaranStyles.uploadedFileContainer}>
                      <Text style={PendaftaranStyles.uploadedFileName} numberOfLines={1}>
                        {transkripFile.name}
                      </Text>
                      <Text style={PendaftaranStyles.uploadedFileSize}>
                        {formatFileSize(transkripFile.size)}
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

              {transkripFile && (
                <View style={PendaftaranStyles.documentActions}>
                  <TouchableOpacity
                    style={PendaftaranStyles.viewButton}
                    onPress={() => handleViewDocument(transkripFile, 'Detail Transkrip Nilai')}
                  >
                    <Image
                      source={require('../../assets/icons/fi-sr-eye.png')}
                      style={PendaftaranStyles.actionIcon}
                    />
                    <Text style={PendaftaranStyles.viewButtonText}>Lihat</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={PendaftaranStyles.deleteButton}
                    onPress={() => handleDeleteDocument('transkrip')}
                  >
                    <Image
                      source={require('../../assets/icons/line-md_trash.png')}
                      style={PendaftaranStyles.actionIcon}
                    />
                    <Text style={PendaftaranStyles.deleteButtonText}>Hapus</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* Next Button */}
            <TouchableOpacity
              style={PendaftaranStyles.nextButton}
              onPress={() => navigation.navigate('DataPrestasi')}
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

      {/* Dropdown Modals */}
      <DropdownModal
        visible={showStatusModal}
        onClose={() => setShowStatusModal(false)}
        options={STATUS_KELULUSAN_OPTIONS}
        onSelect={setStatusKelulusan}
        selectedValue={statusKelulusan}
      />
      <DropdownModal
        visible={showIjazahModal}
        onClose={() => setShowIjazahModal(false)}
        options={IJAZAH_TERAKHIR_OPTIONS}
        onSelect={setIjazahTerakhir}
        selectedValue={ijazahTerakhir}
      />
    </SafeAreaView>
  );
};

export default DataAkademikScreen;
