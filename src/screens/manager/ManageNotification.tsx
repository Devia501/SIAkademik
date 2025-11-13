import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  ImageBackground,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
// Import AdminStyles
import { ManagerStyles } from '../../styles/ManagerStyles'; 
import { AdminStyles } from '../../styles/AdminStyles'; 
import { ManagerStackParamList } from '../../navigation/ManagerNavigator'; 

// Definisi Tipe Navigasi
type ManageNotificationNavigationProp = NativeStackNavigationProp<
  ManagerStackParamList, 
  'ManageNotification'
>;

// Target Audience Options
const TARGET_AUDIENCE_OPTIONS = [
  'All Applicants',
  'Pending Applicants',
  'Approved Applicants',
  'Rejected Applicants',
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
      style={localStyles.modalOverlay} 
      activeOpacity={1}
      onPress={onClose}
    >
      <View style={localStyles.modalContent}>
        <ScrollView style={localStyles.modalScrollView}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                localStyles.modalOption,
                selectedValue === option && localStyles.modalOptionSelected
              ]}
              onPress={() => {
                onSelect(option);
                onClose();
              }}
            >
              <Text style={[
                localStyles.modalOptionText,
                selectedValue === option && localStyles.modalOptionTextSelected
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

const ManageNotification: React.FC = () => {
  const navigation = useNavigation<ManageNotificationNavigationProp>();
  const [targetAudience, setTargetAudience] = useState('All Applicants');
  const [messageTitle, setMessageTitle] = useState('');
  const [messageContent, setMessageContent] = useState('');
  const [showTargetAudienceModal, setShowTargetAudienceModal] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    if (!showTargetAudienceModal) {
      setOpenDropdown(null);
    }
  }, [showTargetAudienceModal]);

  const handleSendNotification = () => {
    // Validasi input
    if (!messageTitle.trim()) {
      Alert.alert('Error', 'Please enter a message title');
      return;
    }
    
    if (!messageContent.trim()) {
      Alert.alert('Error', 'Please enter message content');
      return;
    }

    // Logic untuk mengirim notifikasi
    console.log('Sending notification:', {
      targetAudience,
      messageTitle,
      messageContent
    });

    Alert.alert(
      'Success',
      'Notification sent successfully!',
      [
        {
          text: 'OK',
          onPress: () => {
            // Reset form
            setMessageTitle('');
            setMessageContent('');
            setTargetAudience('All Applicants');
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={AdminStyles.container} edges={['top', 'bottom']}>
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={localStyles.scrollContent}
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
              <Text style={AdminStyles.headerTitle}>Manage Notifications</Text>
            </View>
          </ImageBackground>
        </View>

        {/* Content Section */}
        <View style={localStyles.contentContainer}>
          {/* Broadcast Notifications Label */}
          <View style={localStyles.broadcastHeader}>
            <Text style={localStyles.broadcastText}>Broadcast Notifications</Text>
          </View>

          {/* Target Audience */}
          <View style={localStyles.formGroup}>
            <Text style={localStyles.label}>Target Audience</Text>
            <TouchableOpacity 
              style={localStyles.pickerContainer}
              onPress={() => {
                setShowTargetAudienceModal(true);
                setOpenDropdown('targetAudience');
              }}
            >
              <View style={localStyles.pickerInput}>
                <Text style={localStyles.pickerText}>
                  {targetAudience}
                </Text>
              </View>
              <Image
                source={
                  openDropdown === 'targetAudience'
                    ? require('../../assets/icons/Polygon 5.png')
                    : require('../../assets/icons/Polygon 4.png')
                }
                style={localStyles.dropdownIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          {/* Message Title */}
          <View style={localStyles.formGroup}>
            <Text style={localStyles.label}>Message Title</Text>
            <TextInput
              style={localStyles.input}
              placeholder="Important Registration Update"
              placeholderTextColor="#999"
              value={messageTitle}
              onChangeText={setMessageTitle}
            />
          </View>

          {/* Message Content */}
          <View style={localStyles.formGroup}>
            <Text style={localStyles.label}>Message Content</Text>
            <TextInput
              style={localStyles.textArea}
              placeholder="Dear applicants, please note that..."
              placeholderTextColor="#999"
              value={messageContent}
              onChangeText={setMessageContent}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
          </View>

          {/* Send Notifications Button */}
          <TouchableOpacity 
            onPress={handleSendNotification}
          >
            <LinearGradient
                colors={['#DABC4E', '#EFE3B0']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 1 }}
                style={localStyles.sendButton}
                >
                <Text style={localStyles.sendButtonText}>Sent Notifications</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Background Logo */}
      <Image
        source={require('../../assets/images/logo-ugn.png')}
        style={AdminStyles.backgroundLogo}
        resizeMode="contain"
      />

      {/* Target Audience Dropdown Modal */}
      <DropdownModal
        visible={showTargetAudienceModal}
        onClose={() => setShowTargetAudienceModal(false)}
        options={TARGET_AUDIENCE_OPTIONS}
        onSelect={setTargetAudience}
        selectedValue={targetAudience}
      />
    </SafeAreaView>
  );
};

// Style Lokal
const localStyles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 20,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  
  // Broadcast Notifications Label
  broadcastHeader: {
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
  broadcastText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffffff',
  },

  // Form Group
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFF',
    marginBottom: 8,
  },

  // Picker Container
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  pickerInput: {
    flex: 1,
  },
  pickerText: {
    fontSize: 14,
    color: '#000',
  },
  placeholderText: {
    color: '#999',
  },
  dropdownIcon: {
    width: 12,
    height: 8,
    marginLeft: 8,
  },

  // Input
  input: {
    backgroundColor: '#FFF',
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    color: '#000',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },

  // Text Area
  textArea: {
    backgroundColor: '#F5ECD7',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    color: '#000',
    borderWidth: 2,
    borderColor: '#DABC4E',
    borderStyle: 'dashed',
    minHeight: 150,
  },

  // Send Button
  sendButton: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',

  },
  sendButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffffff',
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    width: '80%',
    maxHeight: '60%',
    padding: 8,
  },
  modalScrollView: {
    maxHeight: 300,
  },
  modalOption: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalOptionSelected: {
    backgroundColor: '#F0F0F0',
  },
  modalOptionText: {
    fontSize: 14,
    color: '#000',
  },
  modalOptionTextSelected: {
    fontWeight: 'bold',
    color: '#015023',
  },
});

export default ManageNotification;