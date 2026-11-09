import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  StatusBar,
} from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { dummyProfiles, Profile } from '../data/dummyData';
import { useInterests } from '../context/InterestsContext';
import { useLanguage } from '../context/LanguageContext';
import { primaryColor } from '../theme/theme';

const primaryLight = '#fdf2f7';
const accentGreen = '#2e7d32';

export const HomeScreen = ({ navigation }: any) => {
  const { t, language } = useLanguage();
  const allTag = language === 'mr' ? 'सर्व' : 'All';
  const [selectedTag, setSelectedTag] = useState(allTag);
  const { favorites, sentInterests, toggleFavorite, toggleInterest } = useInterests();
  const [refreshing, setRefreshing] = useState(false);

  const filterTags = language === 'mr' 
    ? ['सर्व', 'पुणे', 'मुंबई', 'मराठा', 'ब्राह्मण', 'कुणबी']
    : ['All', 'Pune', 'Mumbai', 'Maratha', 'Brahmin', 'Kunbi'];

  // Pull to refresh simulation
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 800);
  };

  // Filter profiles based on selected tag
  const filteredProfiles = dummyProfiles.filter(profile => {
    if (selectedTag === allTag) return true;
    if (selectedTag === 'पुणे' || selectedTag === 'Pune') return profile.city === 'पुणे' || profile.location.includes('पुणे') || profile.location.includes('Pune');
    if (selectedTag === 'मुंबई' || selectedTag === 'Mumbai') return profile.city === 'मुंबई' || profile.location.includes('मुंबई') || profile.location.includes('Mumbai');
    if (selectedTag === 'मराठा' || selectedTag === 'Maratha') return profile.caste.includes('मराठा') || profile.caste.includes('Maratha');
    if (selectedTag === 'ब्राह्मण' || selectedTag === 'Brahmin') return profile.caste.includes('ब्राह्मण') || profile.caste.includes('Brahmin');
    if (selectedTag === 'कुणबी' || selectedTag === 'Kunbi') return profile.caste.includes('कुणबी') || profile.caste.includes('Kunbi');
    return true;
  });

  // Standard Matrimonial Profile Card
  const renderProfileCard = ({ item }: { item: Profile }) => {
    const isFavorited = favorites.has(item.id);
    const isInterestSent = sentInterests.has(item.id);

    return (
      <View style={styles.card}>
        {/* Photo Container */}
        <TouchableOpacity
          activeOpacity={0.95}
          onPress={() => navigation.navigate('ProfileDetails', { profile: item })}
          style={styles.imageContainer}
        >
          <Image source={{ uri: item.imageUrl }} style={styles.profileImage} />

          {/* Top Row: Verified Badge & Favorite Icon */}
          <View style={styles.imageOverlayTop}>
            {item.isVerified ? (
              <View style={styles.verifiedBadge}>
                <MaterialCommunityIcons name="check-decagram" size={14} color="#ffffff" />
                <Text style={styles.verifiedText}>{t('verifiedProfile')}</Text>
              </View>
            ) : (
              <View />
            )}

            <TouchableOpacity
              style={styles.heartButton}
              onPress={() => toggleFavorite(item.id)}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons
                name={isFavorited ? 'heart' : 'heart-outline'}
                size={22}
                color={isFavorited ? '#e91e63' : '#ffffff'}
              />
            </TouchableOpacity>
          </View>

          {/* Bottom Gradient with Name, Age & Height */}
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.85)']}
            style={styles.imageOverlayBottom}
          >
            <View style={styles.nameRow}>
              <Text style={styles.profileName}>
                {language === 'en' ? item.name : (item.marathiName || item.name)}, {item.age} {language === 'mr' ? 'वर्षे' : 'yrs'}
              </Text>
              <View style={styles.heightBadge}>
                <Text style={styles.heightText}>{item.height}</Text>
              </View>
            </View>
            {language === 'mr' && item.name && item.marathiName && (
              <Text style={styles.englishSubName}>{item.name}</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>

        {/* Profile Details Body */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.navigate('ProfileDetails', { profile: item })}
          style={styles.cardBody}
        >
          {/* Education & Profession */}
          <View style={styles.detailRow}>
            <MaterialCommunityIcons name="school-outline" size={18} color={primaryColor} style={styles.detailIcon} />
            <Text style={styles.detailText} numberOfLines={1}>
              {item.education} • {item.profession}
            </Text>
          </View>

          {/* Location */}
          <View style={styles.detailRow}>
            <MaterialCommunityIcons name="map-marker-outline" size={18} color={primaryColor} style={styles.detailIcon} />
            <Text style={styles.detailText} numberOfLines={1}>
              {item.location} {item.district ? `(${item.district})` : ''}
            </Text>
          </View>

          {/* Caste & Subcaste */}
          <View style={styles.detailRow}>
            <MaterialCommunityIcons name="account-group-outline" size={18} color={primaryColor} style={styles.detailIcon} />
            <Text style={styles.detailText} numberOfLines={1}>
              {item.caste} {item.subcaste ? `• ${item.subcaste}` : ''}
            </Text>
          </View>

          {/* Horoscope / Kundali */}
          {(item.rashi || item.manglik) && (
            <View style={styles.detailRow}>
              <MaterialCommunityIcons name="star-outline" size={18} color={primaryColor} style={styles.detailIcon} />
              <Text style={styles.detailText} numberOfLines={1}>
                {item.rashi ? `${item.rashi}` : ''}
                {item.rashi && item.manglik ? ' • ' : ''}
                {item.manglik ? `${item.manglik}` : ''}
              </Text>
            </View>
          )}

          {/* Short Bio */}
          {item.bio ? (
            <Text style={styles.bioSnippet} numberOfLines={2}>
              "{item.bio}"
            </Text>
          ) : null}
        </TouchableOpacity>

        {/* Card Action Buttons */}
        <View style={styles.cardActions}>
          {/* View Profile Button */}
          <TouchableOpacity
            style={styles.viewProfileBtn}
            onPress={() => navigation.navigate('ProfileDetails', { profile: item })}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons name="eye-outline" size={18} color={primaryColor} />
            <Text style={styles.viewProfileBtnText}>{t('viewProfile')}</Text>
          </TouchableOpacity>

          {/* Send Interest Button */}
          <TouchableOpacity
            style={[
              styles.interestBtn,
              isInterestSent ? styles.interestBtnSent : styles.interestBtnDefault,
            ]}
            onPress={() => toggleInterest(item.id)}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons
              name={isInterestSent ? 'check-circle' : 'heart'}
              size={18}
              color="#ffffff"
            />
            <Text style={styles.interestBtnText}>
              {isInterestSent ? t('interestSent') : t('sendInterest')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Clean Top Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <MaterialCommunityIcons name="cards-heart" size={28} color={primaryColor} />
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.headerTitle}>{t('appName')}</Text>
            <Text style={styles.headerSubtitle}>{t('appTagline')}</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.headerIconBtn}
            onPress={() => navigation.navigate('Search')}
          >
            <MaterialCommunityIcons name="magnify" size={24} color="#333333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIconBtn}>
            <MaterialCommunityIcons name="bell-outline" size={24} color="#333333" />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Filter Chips Bar */}
      <View style={styles.filterBar}>
        <FlatList
          data={filterTags}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item}
          contentContainerStyle={styles.filterList}
          renderItem={({ item }) => {
            const isSelected = selectedTag === item;
            return (
              <TouchableOpacity
                style={[
                  styles.filterChip,
                  isSelected ? styles.filterChipActive : styles.filterChipInactive,
                ]}
                onPress={() => setSelectedTag(item)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    isSelected ? styles.filterChipTextActive : styles.filterChipTextInactive,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* Profile Feed */}
      <FlatList
        data={filteredProfiles}
        renderItem={renderProfileCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.feedContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[primaryColor]}
            tintColor={primaryColor}
          />
        }
        ListHeaderComponent={
          <View style={styles.feedHeader}>
            <Text style={styles.feedCountText}>
              {t('availableProfiles')} ({filteredProfiles.length})
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="account-search-outline" size={60} color="#cccccc" />
            <Text style={styles.emptyTitle}>{t('noProfilesFound')}</Text>
            <Text style={styles.emptySubtitle}>
              {language === 'mr' ? 'कृपया इतर फिल्टर निवडून पुन्हा प्रयत्न करा.' : 'Please try selecting different filters.'}
            </Text>
            <TouchableOpacity
              style={styles.resetFilterBtn}
              onPress={() => setSelectedTag(allTag)}
            >
              <Text style={styles.resetFilterText}>
                {language === 'mr' ? 'सर्व प्रोफाइल्स पहा' : 'View all profiles'}
              </Text>
            </TouchableOpacity>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: primaryColor,
    letterSpacing: 0.3,
  },
  headerSubtitle: {
    fontSize: 11,
    color: '#777777',
    marginTop: 1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerIconBtn: {
    padding: 6,
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e53935',
  },

  // Filter Chips Bar
  filterBar: {
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  filterList: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
  },
  filterChipActive: {
    backgroundColor: primaryColor,
  },
  filterChipInactive: {
    backgroundColor: '#f1f2f4',
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: '600',
  },
  filterChipTextActive: {
    color: '#ffffff',
  },
  filterChipTextInactive: {
    color: '#444444',
  },

  // Feed
  feedContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 90,
  },
  feedHeader: {
    marginBottom: 10,
    paddingHorizontal: 4,
  },
  feedCountText: {
    fontSize: 13,
    color: '#666666',
    fontWeight: '600',
  },

  // Standard Profile Card
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#eceff1',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: 270,
    position: 'relative',
    backgroundColor: '#e0e0e0',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageOverlayTop: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(46, 125, 50, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  verifiedText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  heartButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageOverlayBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 14,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileName: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#ffffff',
    flex: 1,
  },
  heightBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    marginLeft: 8,
  },
  heightText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  englishSubName: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    marginTop: 2,
  },

  // Card Body
  cardBody: {
    padding: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailIcon: {
    marginRight: 10,
    width: 20,
  },
  detailText: {
    fontSize: 13,
    color: '#333333',
    flex: 1,
    lineHeight: 18,
  },
  bioSnippet: {
    fontSize: 12,
    color: '#666666',
    fontStyle: 'italic',
    lineHeight: 18,
    marginTop: 6,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f5f5f5',
  },

  // Actions
  cardActions: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 12,
  },
  viewProfileBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 11,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: primaryColor,
    backgroundColor: '#ffffff',
    gap: 6,
  },
  viewProfileBtnText: {
    color: primaryColor,
    fontSize: 14,
    fontWeight: 'bold',
  },
  interestBtn: {
    flex: 1.2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 11,
    borderRadius: 10,
    gap: 6,
  },
  interestBtnDefault: {
    backgroundColor: primaryColor,
  },
  interestBtnSent: {
    backgroundColor: accentGreen,
  },
  interestBtnText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },

  // Empty State
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 12,
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#777777',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 16,
  },
  resetFilterBtn: {
    backgroundColor: primaryLight,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: primaryColor,
  },
  resetFilterText: {
    color: primaryColor,
    fontSize: 13,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
