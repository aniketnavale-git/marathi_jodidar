import React from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, Alert, StatusBar } from 'react-native';
import { Text, Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { primaryColor } from '../theme/theme';

export const ProfileScreen = ({ navigation }: any) => {
  const { logout, currentUserPhone } = useAuth();
  const { t, language } = useLanguage();

  const handleLogout = () => {
    Alert.alert(
      t('logoutConfirmTitle'),
      t('logoutConfirmMsg'),
      [
        { text: t('cancel'), style: 'cancel' },
        {
          text: t('logout'),
          style: 'destructive',
          onPress: () => logout(),
        },
      ]
    );
  };

  const menuItems = language === 'mr' ? [
    { icon: 'translate', title: 'भाषा बदला (Change Language)', sub: 'मराठी किंवा English निवडा', action: 'language' },
    { icon: 'account-edit-outline', title: 'माहिती संपादित करा', sub: 'नाव, वय, शिक्षण व नोकरी' },
    { icon: 'heart-multiple-outline', title: 'अपेक्षित जोडीदार', sub: 'वय, जात, शिक्षण, उत्पन्न मर्यादा' },
    { icon: 'camera-outline', title: 'फोटो व्यवस्थापन', sub: 'नवीन फोटो जोडा किंवा बदला' },
    { icon: 'file-document-outline', title: 'कुंडली व पत्रिका', sub: 'रास, नक्षत्र, मंगळ, जन्म वेळ' },
    { icon: 'shield-check-outline', title: 'गोपनीयता आणि सुरक्षा', sub: 'फोन नंबर व फोटो दृश्यमानता' },
    { icon: 'help-circle-outline', title: 'मदत व ग्राहक सेवा', sub: 'काही अडचण असल्यास संपर्क साधा' },
  ] : [
    { icon: 'translate', title: 'Change Language (भाषा बदला)', sub: 'Select Marathi or English', action: 'language' },
    { icon: 'account-edit-outline', title: 'Edit Profile', sub: 'Name, age, education & profession' },
    { icon: 'heart-multiple-outline', title: 'Partner Preferences', sub: 'Age, caste, education, income expectations' },
    { icon: 'camera-outline', title: 'Manage Photos', sub: 'Add or change photos' },
    { icon: 'file-document-outline', title: 'Horoscope & Kundali', sub: 'Rashi, nakshatra, manglik details' },
    { icon: 'shield-check-outline', title: 'Privacy & Security', sub: 'Contact & photo visibility settings' },
    { icon: 'help-circle-outline', title: 'Help & Support', sub: 'Contact customer care' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Profile Header Card */}
        <View style={styles.profileCard}>
          <LinearGradient
            colors={[primaryColor, '#b83278']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.profileBanner}
          >
            <View>
              <Text style={styles.profileBannerEyebrow}>{language === 'mr' ? 'माझे खाते' : 'MY ACCOUNT'}</Text>
              <Text style={styles.profileBannerTitle}>{language === 'mr' ? 'माझे प्रोफाइल' : 'My Profile'}</Text>
            </View>
            <View style={styles.bannerAction}>
              <MaterialCommunityIcons name="pencil-outline" size={19} color={primaryColor} />
            </View>
          </LinearGradient>

          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80' }}
              style={styles.avatar}
            />
            <View style={styles.verifiedBadge}>
              <MaterialCommunityIcons name="check" size={14} color="#ffffff" />
            </View>
          </View>

          <View style={styles.profileStatusPill}>
            <View style={styles.onlineDot} />
            <Text style={styles.profileStatusText}>{language === 'mr' ? 'प्रोफाइल सक्रिय आहे' : 'Profile is active'}</Text>
          </View>

          <Text style={styles.userName}>अनिकेत नवले</Text>
          <Text style={styles.userProfileId}>प्रोफाइल आयडी: MJ-98213</Text>
          <Text style={styles.userSub}>B.E. Computer • Software Engineer • पुणे</Text>

          {/* Quick Stats Row */}
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>48</Text>
              <Text style={styles.statLabel}>{t('profileViews')}</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>{t('interestsSentStat')}</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>5</Text>
              <Text style={styles.statLabel}>{t('matchesStat')}</Text>
            </View>
          </View>
        </View>

        {/* Profile completion prompt */}
        <View style={styles.completionCard}>
          <View style={styles.completionTopRow}>
            <View style={styles.completionIcon}>
              <MaterialCommunityIcons name="shield-check-outline" size={22} color={primaryColor} />
            </View>
            <View style={styles.completionCopy}>
              <Text style={styles.completionTitle}>{language === 'mr' ? 'प्रोफाइल पूर्ण करा' : 'Complete your profile'}</Text>
              <Text style={styles.completionSubtitle}>{language === 'mr' ? 'अधिक चांगल्या जुळण्या मिळवा' : 'Get better matches and more responses'}</Text>
            </View>
            <Text style={styles.completionPercent}>80%</Text>
          </View>
          <View style={styles.progressTrack}>
            <View style={styles.progressFill} />
          </View>
          <View style={styles.completionLink}>
            <Text style={styles.completionLinkText}>{language === 'mr' ? 'उर्वरित माहिती भरा' : 'Finish remaining details'}</Text>
            <MaterialCommunityIcons name="arrow-right" size={17} color={primaryColor} />
          </View>
        </View>

        {/* Menu Options List */}
        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <React.Fragment key={index}>
              <TouchableOpacity 
                style={styles.menuItem} 
                activeOpacity={0.7}
                onPress={() => {
                  if (item.action === 'language') {
                    navigation.navigate('LanguageSelection');
                  }
                }}
              >
                <View style={styles.menuIconContainer}>
                  <MaterialCommunityIcons name={item.icon as any} size={22} color={primaryColor} />
                </View>
                <View style={styles.menuTextContainer}>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                  <Text style={styles.menuSub}>{item.sub}</Text>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={20} color="#ccc" />
              </TouchableOpacity>
              {index < menuItems.length - 1 && <Divider style={styles.menuDivider} />}
            </React.Fragment>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.8}>
          <MaterialCommunityIcons name="logout" size={20} color="#d32f2f" />
          <Text style={styles.logoutText}>{t('logout')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  profileCard: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  profileBanner: {
    width: '100%',
    minHeight: 104,
    marginTop: -24,
    paddingHorizontal: 20,
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  profileBannerEyebrow: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  profileBannerTitle: {
    color: '#ffffff',
    fontSize: 23,
    fontWeight: '800',
    marginTop: 5,
  },
  bannerAction: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginTop: -42,
    marginBottom: 10,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: primaryColor,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 2,
    backgroundColor: '#2e7d32',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222222',
  },
  userProfileId: {
    fontSize: 12,
    color: '#888888',
    marginTop: 2,
  },
  userSub: {
    fontSize: 13,
    color: '#555555',
    marginTop: 4,
  },
  profileStatusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#edf8ef',
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 6,
  },
  onlineDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#2e7d32',
    marginRight: 6,
  },
  profileStatusText: {
    color: '#2e7d32',
    fontSize: 11,
    fontWeight: '700',
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f4f4f4',
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: primaryColor,
  },
  statLabel: {
    fontSize: 11,
    color: '#777777',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 26,
    backgroundColor: '#eeeeee',
  },
  completionCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f0d8e5',
    shadowColor: '#42152f',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 7,
    elevation: 2,
  },
  completionTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  completionIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#fdf2f7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },
  completionCopy: {
    flex: 1,
  },
  completionTitle: {
    color: '#222222',
    fontSize: 14,
    fontWeight: '800',
  },
  completionSubtitle: {
    color: '#777777',
    fontSize: 11,
    marginTop: 3,
  },
  completionPercent: {
    color: primaryColor,
    fontSize: 14,
    fontWeight: '800',
  },
  progressTrack: {
    height: 7,
    borderRadius: 4,
    backgroundColor: '#f3e4eb',
    marginTop: 14,
    overflow: 'hidden',
  },
  progressFill: {
    width: '80%',
    height: '100%',
    borderRadius: 4,
    backgroundColor: primaryColor,
  },
  completionLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  completionLinkText: {
    color: primaryColor,
    fontSize: 12,
    fontWeight: '800',
  },
  menuSection: {
    backgroundColor: '#ffffff',
    marginTop: 16,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  menuIconContainer: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#fdf2f7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222222',
  },
  menuSub: {
    fontSize: 11,
    color: '#888888',
    marginTop: 2,
  },
  menuDivider: {
    backgroundColor: '#f5f5f5',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginTop: 20,
    marginHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ffcdd2',
    gap: 8,
  },
  logoutText: {
    color: '#d32f2f',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;

