import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PendaftarStackParamList } from '../../navigation/PendaftarNavigator';
import PendaftarStyles from '../../styles/PendaftarStyles';

const { width } = Dimensions.get('window');

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  PendaftarStackParamList,
  'Profile'
>;

const ProfileScreen = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        <View style={styles.topSection}>
          <ImageBackground
            source={require('../../assets/images/Rectangle 63.png')}
            style={PendaftarStyles.waveBackground}
            resizeMode="cover"
          >
            <Text style={styles.pageTitle}>Profile</Text>

            <View style={styles.profileHeader}>
              <View style={styles.avatarContainer}>
                <Image
                  source={require('../../assets/images/profile 1.png')}
                  style={styles.profileImage}
                  resizeMode="cover"
                />
                <TouchableOpacity style={styles.editIconButton}>
                  <Image
                    source={require('../../assets/icons/bxs_pencil.png')}
                    style={styles.editIcon}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>Siti Nur Azizah</Text>
                <View style={styles.roleBadge}>
                  <Image
                    source={require('../../assets/icons/material-symbols_person-rounded.png')}
                    style={styles.roleIcon}
                    resizeMode="contain"
                  />
                  <Text style={styles.roleText}>Calon Mahasiswa</Text>
                </View>
              </View>
              
            </View>
          </ImageBackground>
          
        </View>
        <View style={styles.accountSection}>
          <Text style={styles.sectionTitle}>Account</Text>
        </View>

        <View style={styles.bottomSection}>
          

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.actionButton}>
              <Image
                source={require('../../assets/icons/Intersect.png')}
                style={styles.buttonIcon}
                resizeMode="contain"
              />
              <Text style={styles.buttonText}>Change Email</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <Image
                source={require('../../assets/icons/material-symbols_lock.png')}
                style={styles.buttonIcon}
                resizeMode="contain"
              />
              <Text style={styles.buttonText}>Change Password</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View style={[PendaftarStyles.bottomNav, styles.nav]}>
        <TouchableOpacity
          style={PendaftarStyles.navItem}
          onPress={() => navigation.navigate('PendaftarDashboard')}
        >
          <Image
            source={require('../../assets/icons/material-symbols_home-rounded.png')}
            style={PendaftarStyles.navIconImage}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={PendaftarStyles.navItem}
          onPress={() => navigation.navigate('TataCara')}
        >
          <Image
            source={require('../../assets/icons/clarity_form-line.png')}
            style={PendaftarStyles.navIconImage}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity style={PendaftarStyles.navItem}
        onPress={() => navigation.navigate('StatusPendaftaranAwal')}>
          <Image
            source={require('../../assets/icons/fluent_shifts-activity.png')}
            style={PendaftarStyles.navIconImage}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity style={PendaftarStyles.navItem}>
          <View style={PendaftarStyles.navItemActive}>
            <Image
              source={require('../../assets/icons/ix_user-profile-filled.png')}
              style={PendaftarStyles.navIconImage}
              resizeMode="contain"
            />
            <Text style={PendaftarStyles.navTextActive}>Profile</Text>
          </View>
        </TouchableOpacity>
      </View>

      <Image
        source={require('../../assets/images/logo-ugn.png')}
        style={PendaftarStyles.backgroundLogo}
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
  topSection: {
    position: 'relative',
    zIndex:-1,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#DABC4E',
    marginTop: 20,
    marginLeft: 20,
    textShadowColor: '#000000ff',
    textShadowOffset: { width: 2, height: 1 },
    textShadowRadius: 1,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 28,

  },
  avatarContainer: {
    position: 'relative',
    marginTop: 20,
    marginLeft: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#070707ff',
  },
  editIconButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#DABC4E',
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIcon: {
    width: 16,
    height: 16,
    tintColor: '#000',
  },
  profileInfo: {
    flex: 1,
    marginTop: 16,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  roleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DABC4E',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 15,
    alignSelf: 'flex-start',
    gap: 6,
  },
  roleIcon: {
    width: 18,
    height: 18,
    tintColor: '#000',
  },
  roleText: {
    fontSize: 12,
    color: '#000',
  },
  bottomSection: {
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  accountSection: {
    marginTop: 20,
    marginLeft: 26,
    bottom: 130,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffffff',
    backgroundColor: '#DABC4E',
    paddingHorizontal: 36,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    borderWidth: 2,
    borderColor: '#000',
  },
  buttonContainer: {
    gap: 16,
  },
  actionButton: {
    bottom: 120,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5E6D3',
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 20,
    gap: 12,
  },
  buttonIcon: {
    width: 20,
    height: 20,
    tintColor: '#000',
    alignItems: 'center',
    marginLeft: 65,
  },
  buttonText: {
    alignItems: 'center',
    fontSize: 15,
    color: '#000',
  },
  nav: {
    bottom: 67,
  }
});

export default ProfileScreen;
