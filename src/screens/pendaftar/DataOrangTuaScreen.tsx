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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PendaftarStackParamList } from '../../navigation/PendaftarNavigator';
import PendaftarStyles from '../../styles/PendaftarStyles';
import PendaftaranStyles from '../../styles/PendaftaranStyles';

type DataOrangTuaNavigationProp = NativeStackNavigationProp<
  PendaftarStackParamList,
  'DataOrangTua'
>;

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

  // states for forms (separate for ayah/ibu/wali to avoid collision)
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

  const handleSubmit = () => {
    // you can validate or submit data here
    Alert.alert('Sukses', 'Data orang tua/wali tersimpan (demo).');
    navigation.navigate('SelesaiPendaftaran');
  };

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
            <View
            style={{
                flexDirection: 'row',
                alignSelf: 'center',
                backgroundColor: '#A8A350',
                borderRadius: 25,
                borderWidth: 1,
                borderColor: '#000',
                overflow: 'hidden',
            }}
            >
            <TouchableOpacity
                style={{
                flex: 1,
                backgroundColor: activeTab === 'Orang Tua' ? '#E5C363' : 'transparent',
                paddingVertical: 6,
                alignItems: 'center',
                justifyContent: 'center',
                }}
                onPress={() => setActiveTab('Orang Tua')}
            >
                <Text
                style={{
                    color: '#000',
                    fontWeight: '700',
                }}
                >
                Orang Tua
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{
                flex: 1,
                backgroundColor: activeTab === 'Wali' ? '#E5C363' : 'transparent',
                paddingVertical: 6,
                alignItems: 'center',
                justifyContent: 'center',
                }}
                onPress={() => setActiveTab('Wali')}
            >
                <Text
                style={{
                    color: '#000',
                    fontWeight: '700',
                }}
                >
                Wali
                </Text>
            </TouchableOpacity>
            </View>

            {/* Orang Tua form */}
            {activeTab === 'Orang Tua' && (
              <>
                {/* small badge showing Ayah/Ibu */}

                {/* Tabs Orang Tua / Wali */}
                <View
                style={{
                    flexDirection: 'row',
                    alignSelf: 'center',
                    backgroundColor: '#fddaace0',
                    borderRadius: 25,
                    borderWidth: 1,
                    borderColor: '#000',
                    overflow: 'hidden',
                }}
                >
                <TouchableOpacity
                    style={{
                    flex: 1,
                    backgroundColor: activeParent === 'Ayah' ? '#fddaacff' : 'transparent',
                    paddingVertical: 6,
                    alignItems: 'center',
                    justifyContent: 'center',
                    }}
                    onPress={() => setActiveParent('Ayah')}
                >
                    <Text
                    style={{
                        color: '#000',
                        fontWeight: '700',
                    }}
                    >
                    Ayah
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                    flex: 1,
                    backgroundColor: activeParent === 'Ibu' ? '#fddaacff' : 'transparent',
                    paddingVertical: 6,
                    alignItems: 'center',
                    justifyContent: 'center',
                    }}
                    onPress={() => setActiveParent('Ibu')}
                >
                    <Text
                    style={{
                        color: '#000',
                        fontWeight: '700',
                    }}
                    >
                    Ibu
                    </Text>
                </TouchableOpacity>
                </View>
                <View
                style={{
                    alignSelf: 'flex-start',
                    backgroundColor: '#C8C9A9',
                    borderWidth: 1,
                    borderColor: '#000',
                    borderRadius: 8,
                    paddingHorizontal: 12,
                    paddingVertical: 4,
                    marginTop: 20,
                }}
                >
                <Text style={{ color: '#000', fontWeight: '600' }}>{activeParent}</Text>
                </View>

                {/* fields */}
                <View style={PendaftaranStyles.formGroup}>
                  <Text style={PendaftaranStyles.label}>Nama {activeParent} Kandung</Text>
                  <TextInput
                    style={PendaftaranStyles.input}
                    value={currentForm().nama}
                    onChangeText={(val) =>
                      handleChange(activeParent === 'Ayah' ? 'ayah' : 'ibu', 'nama', val)
                    }
                  />
                </View>

                <View style={PendaftaranStyles.formGroup}>
                  <Text style={PendaftaranStyles.label}>Alamat {activeParent} Kandung</Text>
                  <TextInput
                    style={PendaftaranStyles.input}
                    value={currentForm().alamat}
                    onChangeText={(val) =>
                      handleChange(activeParent === 'Ayah' ? 'ayah' : 'ibu', 'alamat', val)
                    }
                  />
                </View>

                <View style={PendaftaranStyles.formGroup}>
                  <Text style={PendaftaranStyles.label}>Nomor Ponsel {activeParent} Kandung</Text>
                  <TextInput
                    style={PendaftaranStyles.input}
                    keyboardType="phone-pad"
                    value={currentForm().nomor}
                    onChangeText={(val) =>
                      handleChange(activeParent === 'Ayah' ? 'ayah' : 'ibu', 'nomor', val)
                    }
                  />
                </View>

                <View style={PendaftaranStyles.formGroup}>
                  <Text style={PendaftaranStyles.label}>Pekerjaan {activeParent} Kandung</Text>
                  <TextInput
                    style={PendaftaranStyles.input}
                    value={currentForm().pekerjaan}
                    onChangeText={(val) =>
                      handleChange(activeParent === 'Ayah' ? 'ayah' : 'ibu', 'pekerjaan', val)
                    }
                  />
                </View>

                <View style={PendaftaranStyles.formGroup}>
                  <Text style={PendaftaranStyles.label}>Pendidikan {activeParent} Kandung</Text>
                  <TextInput
                    style={PendaftaranStyles.input}
                    value={currentForm().pendidikan}
                    onChangeText={(val) =>
                      handleChange(activeParent === 'Ayah' ? 'ayah' : 'ibu', 'pendidikan', val)
                    }
                  />
                </View>

                <View style={PendaftaranStyles.formGroup}>
                  <Text style={PendaftaranStyles.label}>Penghasilan {activeParent} Kandung</Text>
                  <TouchableOpacity
                    style={PendaftaranStyles.pickerContainer}
                    onPress={() => {
                      setShowPenghasilanModal(true);
                      setOpenDropdown('penghasilan');
                    }}
                  >
                    <View style={PendaftaranStyles.pickerInput}>
                      <Text
                        style={[
                          PendaftaranStyles.pickerText,
                          !(currentForm().penghasilan) && PendaftaranStyles.placeholderText,
                        ]}
                      >
                        {currentForm().penghasilan || 'Pilih Penghasilan'}
                      </Text>
                    </View>

                    <Image
                      source={
                        openDropdown === 'penghasilan'
                          ? require('../../assets/icons/Polygon 5.png')
                          : require('../../assets/icons/Polygon 4.png')
                      }
                      style={PendaftaranStyles.dropdownIcon}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
              </>
            )}

            {/* Wali form */}
            {activeTab === 'Wali' && (
              <>
                <View style={PendaftaranStyles.formGroup}>
                  <Text style={PendaftaranStyles.label}>Nama Wali</Text>
                  <TextInput
                    style={PendaftaranStyles.input}
                    value={wali.nama}
                    onChangeText={(val) => handleChange('wali', 'nama', val)}
                  />
                </View>

                <View style={PendaftaranStyles.formGroup}>
                  <Text style={PendaftaranStyles.label}>Alamat Wali</Text>
                  <TextInput
                    style={PendaftaranStyles.input}
                    value={wali.alamat}
                    onChangeText={(val) => handleChange('wali', 'alamat', val)}
                  />
                </View>

                <View style={PendaftaranStyles.formGroup}>
                  <Text style={PendaftaranStyles.label}>Nomor Ponsel Wali</Text>
                  <TextInput
                    style={PendaftaranStyles.input}
                    keyboardType="phone-pad"
                    value={wali.nomor}
                    onChangeText={(val) => handleChange('wali', 'nomor', val)}
                  />
                </View>

                <View style={PendaftaranStyles.formGroup}>
                  <Text style={PendaftaranStyles.label}>Pekerjaan Wali</Text>
                  <TextInput
                    style={PendaftaranStyles.input}
                    value={wali.pekerjaan}
                    onChangeText={(val) => handleChange('wali', 'pekerjaan', val)}
                  />
                </View>

                <View style={PendaftaranStyles.formGroup}>
                  <Text style={PendaftaranStyles.label}>Pendidikan Wali</Text>
                  <TextInput
                    style={PendaftaranStyles.input}
                    value={wali.pendidikan}
                    onChangeText={(val) => handleChange('wali', 'pendidikan', val)}
                  />
                </View>

                <View style={PendaftaranStyles.formGroup}>
                  <Text style={PendaftaranStyles.label}>Penghasilan Wali</Text>
                  <TouchableOpacity
                    style={PendaftaranStyles.pickerContainer}
                    onPress={() => {
                      setShowPenghasilanModal(true);
                      setOpenDropdown('penghasilan');
                    }}
                  >
                    <View style={PendaftaranStyles.pickerInput}>
                      <Text
                        style={[
                          PendaftaranStyles.pickerText,
                          !wali.penghasilan && PendaftaranStyles.placeholderText,
                        ]}
                      >
                        {wali.penghasilan || 'Pilih Penghasilan'}
                      </Text>
                    </View>

                    <Image
                      source={
                        openDropdown === 'penghasilan'
                          ? require('../../assets/icons/Polygon 5.png')
                          : require('../../assets/icons/Polygon 4.png')
                      }
                      style={PendaftaranStyles.dropdownIcon}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
              </>
            )}

            {/* Selesai */}
            <TouchableOpacity
              style={{
                backgroundColor: '#E5C363',
                borderRadius: 25,
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 10,
                marginTop: 30,
              }}
              onPress={handleSubmit}
            >
              <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16 }}>Selesai</Text>
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

      {/* Dropdown modal for penghasilan */}
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
    </SafeAreaView>
  );
};

export default DataOrangTuaScreen;
