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

const TataCaraScreen = () => {
  const navigation = useNavigation();

  const steps = [
    {
      icon: '👤',
      title: 'Membuat akun',
      subtitle: 'pendaftaran',
      delay: 0,
    },
    {
      icon: '📧',
      title: 'Memperoleh email verifikasi',
      subtitle: 'akun pendaftaran',
      delay: 100,
    },
    {
      icon: '💳',
      title: 'Membayar biaya',
      subtitle: 'pendaftaran',
      delay: 200,
    },
    {
      icon: '📤',
      title: 'Log in/masuk memakai akun yang',
      subtitle: 'sudah ada dan melengkapi form atau',
      subtitle2: 'mengunggah dokumen',
      delay: 300,
    },
    {
      icon: '✓',
      title: 'Verifikasi dokumen secara',
      subtitle: 'online oleh prodi dan DPP',
      delay: 400,
    },
    {
      icon: '🎓',
      title: 'Tes Substansif/',
      subtitle: 'Seleksi oleh Prodi',
      delay: 500,
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ImageBackground
        source={require('../../assets/images/wave5.png')}
        style={styles.waveBackground}
        resizeMode="cover"
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Tata Cara Pendaftaran</Text>
          </View>
        </View>
      </ImageBackground>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Steps with connecting lines */}
        <View style={styles.stepsContainer}>
          {steps.map((step, index) => (
            <View key={index} style={styles.stepWrapper}>
              {/* Step Card */}
              <View style={styles.stepCard}>
                <View style={styles.iconContainer}>
                  <Text style={styles.stepIcon}>{step.icon}</Text>
                </View>
                <View style={styles.stepTextContainer}>
                  <Text style={styles.stepTitle}>{step.title}</Text>
                  <Text style={styles.stepSubtitle}>{step.subtitle}</Text>
                  {step.subtitle2 && (
                    <Text style={styles.stepSubtitle}>{step.subtitle2}</Text>
                  )}
                </View>
              </View>

              {/* Connecting Arrow */}
              {index < steps.length - 1 && (
                <View style={styles.arrowContainer}>
                  <View style={styles.dashedLine} />
                  <Text style={styles.arrowIcon}>↓</Text>
                </View>
              )}

              {/* Final Card - Pengumuman */}
              {index === steps.length - 1 && (
                <>
                  <View style={styles.arrowContainer}>
                    <View style={styles.dashedLine} />
                    <Text style={styles.arrowIcon}>↓</Text>
                  </View>
                  <View style={[styles.stepCard, styles.finalCard]}>
                    <View style={styles.iconContainer}>
                      <Text style={styles.stepIcon}>👤</Text>
                    </View>
                    <View style={styles.stepTextContainer}>
                      <Text style={styles.stepTitle}>Pengumuman</Text>
                      <Text style={styles.stepTitle}>Hasil Seleksi</Text>
                    </View>
                  </View>
                </>
              )}
            </View>
          ))}
        </View>

        {/* Daftar Button */}
        <TouchableOpacity style={styles.daftarButton}>
          <Text style={styles.daftarButtonText}>Daftar</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🏠</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItemActive}>
          <Text style={styles.navIconActive}>📄</Text>
          <Text style={styles.navTextActive}>Daftar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>👤</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D5C3D',
  },
  waveBackground: {
    width: '100%',
    height: 150,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 28,
    color: '#FFF',
    fontWeight: 'bold',
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
    marginRight: 40,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0D5C3D',
    backgroundColor: '#F5E6D3',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100,
  },
  stepsContainer: {
    marginBottom: 20,
  },
  stepWrapper: {
    marginBottom: 0,
  },
  stepCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5E6D3',
    borderRadius: 15,
    padding: 15,
    gap: 12,
  },
  finalCard: {
    backgroundColor: '#D4AF37',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#0D5C3D',
  },
  stepIcon: {
    fontSize: 24,
  },
  stepTextContainer: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000',
    lineHeight: 18,
  },
  stepSubtitle: {
    fontSize: 11,
    color: '#000',
    lineHeight: 16,
  },
  arrowContainer: {
    alignItems: 'center',
    paddingVertical: 8,
    position: 'relative',
  },
  dashedLine: {
    width: 2,
    height: 20,
    borderLeftWidth: 2,
    borderLeftColor: '#D4AF37',
    borderStyle: 'dashed',
  },
  arrowIcon: {
    fontSize: 20,
    color: '#D4AF37',
    fontWeight: 'bold',
    marginTop: -8,
  },
  daftarButton: {
    backgroundColor: '#D4AF37',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  daftarButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
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
  navIconActive: {
    fontSize: 24,
  },
  navTextActive: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default TataCaraScreen;