import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  RefreshControl,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import {
  Appbar,
  Card,
  Chip,
  Button,
  IconButton,
  Surface,
  Text,
  useTheme,
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { dummyProfiles, Profile } from '../data/dummyData';
import { useInterests } from '../context/InterestsContext';
import { useLanguage } from '../context/LanguageContext';

const { width } = Dimensions.get('window');
const BANNER_WIDTH = width - 32;

export const HomeScreen = ({ navigation }: any) => {
  const theme = useTheme();
  const { t, language } = useLanguage();
  const isMr = language === 'mr';

  const { favorites, toggleFavorite } = useInterests();
  const [refreshing, setRefreshing] = useState(false);
  const offerEndsAt = useRef(Date.now() + 24 * 60 * 60 * 1000).current;
  const [offerSecondsLeft, setOfferSecondsLeft] = useState(() => Math.max(0, Math.floor((offerEndsAt - Date.now()) / 1000)));

  useEffect(() => {
    const updateCountdown = () => {
      setOfferSecondsLeft(Math.max(0, Math.floor((offerEndsAt - Date.now()) / 1000)));
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [offerEndsAt]);

  const formatOfferCountdown = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  // Smart 16:9 Demo Image Banners Data
  const banners = useMemo(() => [
    {
      id: '1',
      image: { uri: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200&auto=format&fit=crop&q=80' },
      route: 'Matches',
    },
    {
      id: '2',
      image: { uri: 'https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?w=1200&auto=format&fit=crop&q=80' },
      route: 'Search',
    },
    {
      id: '3',
      image: { uri: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200&auto=format&fit=crop&q=80' },
      route: 'Matches',
    },
    {
      id: '4',
      image: { uri: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&auto=format&fit=crop&q=80' },
      route: 'Search',
    },
  ], []);

  const bannerRef = useRef<FlatList>(null);
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);

  // Auto-scroll moving banner effect
  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(() => {
      setActiveBannerIndex(prevIndex => {
        const nextIndex = (prevIndex + 1) % banners.length;
        bannerRef.current?.scrollToIndex({ index: nextIndex, animated: true });
        return nextIndex;
      });
    }, 3500);

    return () => clearInterval(timer);
  }, [banners.length]);

  const handleBannerScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollOffset / BANNER_WIDTH);
    if (index >= 0 && index < banners.length && index !== activeBannerIndex) {
      setActiveBannerIndex(index);
    }
  };

  // Quick Daily Recommendations (Story style avatars)
  const dailyRecommendations = useMemo(() => {
    return dummyProfiles.slice(0, 5);
  }, []);

  // Pull to refresh simulation
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 700);
  };

  const filteredProfiles = dummyProfiles;

  // Match score generator based on profile index
  const getMatchScore = (id: string) => {
    const num = parseInt(id, 10) || 1;
    return 98 - (num % 5) * 2;
  };

  // Profile Card Component
  const renderProfileCard = ({ item }: { item: Profile }) => {
    const isFavorited = favorites.has(item.id);
    const displayName = isMr ? (item.marathiName || item.name) : item.name;

    return (
      <Card
        mode="elevated"
        elevation={2}
        style={[styles.profileCard, { backgroundColor: theme.colors.surface }]}
        onPress={() => navigation.navigate('ProfileDetails', { profile: item })}
      >
        {/* Profile Image with Top and Bottom Overlays */}
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: item.imageUrl }}
            style={styles.profileImage}
            resizeMode="cover"
          />

          {/* Top Overlays: Verified & Match Score + Favorite Heart */}
          <View style={styles.imageOverlayTop}>
            <View style={styles.topBadgesRow}>
              {item.isVerified && (
                <Surface style={[styles.verifiedBadge, { backgroundColor: theme.colors.tertiary }]} elevation={2}>
                  <MaterialCommunityIcons name="check-decagram" size={14} color={theme.colors.onTertiary} />
                  <Text style={[styles.verifiedText, { color: theme.colors.onTertiary }]}>
                    {isMr ? 'व्हेरिफाइड' : 'Verified'}
                  </Text>
                </Surface>
              )}
            </View>

            {/* Favorite Heart Button */}
            <Surface style={styles.heartSurface} elevation={3}>
              <IconButton
                icon={isFavorited ? 'heart' : 'heart-outline'}
                iconColor={isFavorited ? '#e91e63' : theme.colors.onSurfaceVariant}
                size={22}
                style={styles.heartBtn}
                onPress={() => toggleFavorite(item.id)}
              />
            </Surface>
          </View>

          {/* Bottom Gradient with Name */}
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.88)']}
            style={styles.imageOverlayBottom}
          >
            <View style={styles.nameRow}>
              <Text variant="titleLarge" style={styles.profileName} numberOfLines={1}>
                {displayName}
              </Text>
            </View>

            {isMr && item.name && item.marathiName && (
              <Text style={styles.englishSubName}>{item.name}</Text>
            )}
          </LinearGradient>
        </View>

        {/* Card Content: Matrimonial Details */}
        <Card.Content style={styles.cardContent}>
          {/* Education & Profession */}
          <View style={styles.detailRow}>
            <View style={styles.detailIconWrapper}>
              <MaterialCommunityIcons name="school-outline" size={17} color={theme.colors.primary} />
            </View>
            <Text variant="bodyMedium" style={[styles.detailText, { color: theme.colors.onSurface }]} numberOfLines={1}>
              <Text style={[styles.detailHighlight, { color: theme.colors.onSurface }]}>{item.profession}</Text>
              {item.education ? ` • ${item.education}` : ''}
            </Text>
          </View>

          {/* Caste & Subcaste */}
          <View style={styles.detailRow}>
            <View style={styles.detailIconWrapper}>
              <MaterialCommunityIcons name="account-group-outline" size={17} color={theme.colors.primary} />
            </View>
            <Text variant="bodyMedium" style={[styles.detailText, { color: theme.colors.onSurface }]} numberOfLines={1}>
              {item.caste} {item.subcaste ? `• ${item.subcaste}` : ''}
            </Text>
          </View>

          {/* Location */}
          <View style={styles.detailRow}>
            <View style={styles.detailIconWrapper}>
              <MaterialCommunityIcons name="map-marker-outline" size={17} color={theme.colors.primary} />
            </View>
            <Text variant="bodyMedium" style={[styles.detailText, { color: theme.colors.onSurface }]} numberOfLines={1}>
              {item.location} {item.district ? `(${item.district})` : ''}
            </Text>
          </View>

          {/* Horoscope / Kundali (if present) */}
          {(item.rashi || item.manglik) && (
            <View style={styles.detailRow}>
              <View style={styles.detailIconWrapper}>
                <MaterialCommunityIcons name="star-four-points-outline" size={17} color={theme.colors.primary} />
              </View>
              <Text variant="bodyMedium" style={[styles.detailText, { color: theme.colors.onSurface }]} numberOfLines={1}>
                {item.rashi ? `${item.rashi}` : ''}
                {item.rashi && item.manglik ? ' • ' : ''}
                {item.manglik ? `${item.manglik}` : ''}
              </Text>
            </View>
          )}

          {/* Bio Snippet */}
          {item.bio ? (
            <Surface style={[styles.bioSurface, { backgroundColor: theme.colors.surfaceVariant }]} elevation={0}>
              <Text variant="bodySmall" style={[styles.bioText, { color: theme.colors.onSurfaceVariant }]} numberOfLines={2}>
                "{item.bio}"
              </Text>
            </Surface>
          ) : null}
        </Card.Content>

        {/* Simple details for quick understanding */}
        <Card.Content style={styles.simpleCardContent}>
          <View style={styles.simpleInfoRow}>
            <View style={styles.simpleInfoItem}>
              <MaterialCommunityIcons name="calendar-account-outline" size={21} color={theme.colors.primary} />
              <View style={styles.simpleInfoText}>
                <Text style={styles.simpleInfoLabel}>{isMr ? 'वय' : 'Age'}</Text>
                <Text style={[styles.simpleInfoValue, { color: theme.colors.onSurface }]}>{item.age} {isMr ? 'वर्षे' : 'years'}</Text>
              </View>
            </View>
            <View style={styles.simpleInfoItem}>
              <MaterialCommunityIcons name="human-male-height" size={21} color={theme.colors.primary} />
              <View style={styles.simpleInfoText}>
                <Text style={styles.simpleInfoLabel}>{isMr ? 'उंची' : 'Height'}</Text>
                <Text style={[styles.simpleInfoValue, { color: theme.colors.onSurface }]}>{item.height}</Text>
              </View>
            </View>
          </View>
          <View style={styles.simpleInfoRow}>
            <View style={styles.simpleInfoItem}>
              <MaterialCommunityIcons name="briefcase-outline" size={21} color={theme.colors.primary} />
              <View style={styles.simpleInfoText}>
                <Text style={styles.simpleInfoLabel}>{isMr ? 'काम' : 'Work'}</Text>
                <Text style={[styles.simpleInfoValue, { color: theme.colors.onSurface }]} numberOfLines={1}>{item.profession}</Text>
              </View>
            </View>
            <View style={styles.simpleInfoItem}>
              <MaterialCommunityIcons name="map-marker-outline" size={21} color={theme.colors.primary} />
              <View style={styles.simpleInfoText}>
                <Text style={styles.simpleInfoLabel}>{isMr ? 'ठिकाण' : 'Location'}</Text>
                <Text style={[styles.simpleInfoValue, { color: theme.colors.onSurface }]} numberOfLines={1}>{item.location}</Text>
              </View>
            </View>
          </View>
        </Card.Content>

        {/* Card Actions: View Profile & Chat */}
        <View style={styles.cardActions}>
          <Button
            mode="outlined"
            icon="eye-outline"
            textColor={theme.colors.primary}
            style={[styles.viewProfileBtn, { borderColor: theme.colors.primary }]}
            contentStyle={styles.btnContent}
            onPress={() => navigation.navigate('ProfileDetails', { profile: item })}
          >
            {isMr ? 'प्रोफाइल पाहा' : 'View Profile'}
          </Button>

          <Button
            mode="contained"
            icon="message-text-outline"
            buttonColor={theme.colors.tertiary}
            textColor={theme.colors.onTertiary}
            style={styles.chatBtn}
            contentStyle={styles.btnContent}
            onPress={() => navigation.navigate('Chat')}
          >
            {isMr ? 'चॅट करा' : 'Chat'}
          </Button>
        </View>
      </Card>
    );
  };

  // Header of the Feed: Greeting + Daily Story Avatars + Quick Search Bar + Filter Chips
  const renderListHeader = () => {
    return (
      <View style={styles.feedHeaderContainer}>
        {offerSecondsLeft > 0 && (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate('Plan')}
            accessibilityLabel={isMr ? 'स्वागत ऑफर उघडा' : 'Open welcome offer'}
          >
            <LinearGradient
              colors={['#9c1c5b', '#e91e63']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.offerBanner}
            >
              <View style={styles.offerCopy}>
                <Text style={styles.offerEyebrow}>{isMr ? 'स्वागत ऑफर' : 'WELCOME OFFER'}</Text>
                <Text style={styles.offerTitle}>{isMr ? 'प्रीमियम प्लॅनवर खास सवलत' : 'Special savings on Premium'}</Text>
                <Text style={styles.offerSubtitle}>{isMr ? 'ऑफर संपण्यापूर्वी आत्ताच घ्या' : 'Claim it before the offer ends'}</Text>
              </View>
              <View style={styles.offerTimer}>
                <MaterialCommunityIcons name="clock-fast" size={18} color="#ffffff" />
                <Text style={styles.offerTimerText}>{formatOfferCountdown(offerSecondsLeft)}</Text>
                <Text style={styles.offerTimerLabel}>{isMr ? 'उरलेला वेळ' : 'LEFT'}</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        )}

        {/* Smart 16:9 Image Banner Carousel with Padding on Both Sides */}
        <View style={styles.carouselContainer}>
          <FlatList
            ref={bannerRef}
            data={banners}
            keyExtractor={item => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            snapToInterval={BANNER_WIDTH}
            snapToAlignment="center"
            decelerationRate="fast"
            getItemLayout={(_, index) => ({
              length: BANNER_WIDTH,
              offset: BANNER_WIDTH * index,
              index,
            })}
            onScrollToIndexFailed={({ index }) => {
              bannerRef.current?.scrollToOffset({ offset: BANNER_WIDTH * index, animated: true });
            }}
            onMomentumScrollEnd={handleBannerScroll}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.92}
                onPress={() => navigation.navigate(item.route)}
                style={[styles.heroBannerContainer, { width: BANNER_WIDTH, aspectRatio: 16 / 9 }]}
              >
                <Surface
                  style={[
                    styles.heroBannerSurface,
                    {
                      width: BANNER_WIDTH,
                      aspectRatio: 16 / 9,
                      borderColor: theme.colors.outlineVariant,
                    },
                  ]}
                  elevation={2}
                >
                  <Image
                    source={item.image}
                    style={styles.bannerImage}
                    resizeMode="cover"
                  />
                </Surface>
              </TouchableOpacity>
            )}
          />

          {/* Carousel Pagination Dots */}
          <View style={styles.paginationDotsRow}>
            {banners.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.paginationDot,
                  activeBannerIndex === i
                    ? [styles.paginationDotActive, { backgroundColor: theme.colors.primary }]
                    : styles.paginationDotInactive,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Daily Recommendations / Story Avatars */}
        <View style={styles.storiesSection}>
          <View style={styles.storiesHeader}>
            <Text style={[styles.sectionHeading, { color: theme.colors.onSurface }]}>
              {isMr ? 'आजचे खास अनुरूप (Daily Matches)' : 'Today\'s Top Picks'}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Matches')}>
              <Text style={[styles.viewAllText, { color: theme.colors.primary }]}>
                {isMr ? 'सर्व पहा >' : 'View All >'}
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.storiesList}>
            {dailyRecommendations.map((profile) => (
              <TouchableOpacity
                key={profile.id}
                style={styles.storyItem}
                onPress={() => navigation.navigate('ProfileDetails', { profile })}
                activeOpacity={0.8}
              >
                <View style={[styles.storyRing, { borderColor: theme.colors.primary, backgroundColor: theme.colors.surface }]}>
                  <Image source={{ uri: profile.imageUrl }} style={styles.storyAvatar} />
                  {profile.isVerified && (
                    <View style={[styles.storyVerifiedDot, { backgroundColor: theme.colors.tertiary }]}>
                      <MaterialCommunityIcons name="check" size={10} color={theme.colors.onTertiary} />
                    </View>
                  )}
                </View>
                <Text style={[styles.storyName, { color: theme.colors.onSurface }]} numberOfLines={1}>
                  {isMr ? (profile.marathiName?.split(' ')[0] || profile.name.split(' ')[0]) : profile.name.split(' ')[0]}
                </Text>
                <Text style={[styles.storyScore, { color: theme.colors.tertiary }]}>{getMatchScore(profile.id)}% Match</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

      </View>
    );
  };

  // Footer Component
  const renderListFooter = () => {
    return (
      <View style={styles.footerContainer}>
        <Surface
          style={[
            styles.trustFooterSurface,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.outlineVariant,
            },
          ]}
          elevation={1}
        >
          <MaterialCommunityIcons name="handshake-outline" size={32} color={theme.colors.primary} />
          <Text style={[styles.trustFooterTitle, { color: theme.colors.primary }]}>
            {isMr ? 'विश्वासू मराठी जोडीदार' : 'Marathi Jodidar Promise'}
          </Text>
          <Text style={[styles.trustFooterSubtitle, { color: theme.colors.onSurfaceVariant }]}>
            {isMr
              ? '१००% पडताळणी केलेले प्रोफाइल्स • संपूर्ण गोपनीयतेची हमी • लाखो आनंदी कुटुंबे'
              : '100% Verified Profiles • Complete Privacy Guaranteed • Trusted by Families'}
          </Text>
        </Surface>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} />

      {/* Top App Bar with Paper Theme Colors */}
      <Appbar.Header style={{ backgroundColor: theme.colors.primary }}>
        <Appbar.Content
          title={t('appName')}
          titleStyle={[styles.appbarTitle, { color: theme.colors.onPrimary }]}
        />

        <Appbar.Action
          icon="magnify"
          color={theme.colors.onPrimary}
          accessibilityLabel={t('appBarSearch')}
          onPress={() => navigation.getParent()?.navigate('Search')}
        />
        <Appbar.Action
          icon="bell-badge-outline"
          color={theme.colors.onPrimary}
          onPress={() => navigation.navigate('Notifications')}
        />
      </Appbar.Header>

      {/* Feed List */}
      <FlatList
        data={filteredProfiles}
        renderItem={renderProfileCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.feedContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderListHeader()}
        ListFooterComponent={filteredProfiles.length > 0 ? renderListFooter : null}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.primary]}
            tintColor={theme.colors.primary}
          />
        }
        ListEmptyComponent={
          <Surface style={[styles.emptyCard, { backgroundColor: theme.colors.surface }]} elevation={1}>
            <MaterialCommunityIcons name="account-search-outline" size={64} color={theme.colors.outline} />
            <Text variant="titleMedium" style={[styles.emptyTitle, { color: theme.colors.onSurface }]}>
              {t('noProfilesFound')}
            </Text>
            <Text variant="bodyMedium" style={[styles.emptySubtitle, { color: theme.colors.onSurfaceVariant }]}>
              {isMr
                ? 'निवडलेल्या निकषानुसार प्रोफाइल्स सापडल्या नाहीत. कृपया फिल्टर बदला.'
                : 'No profiles match your selected filters. Please adjust your criteria.'}
            </Text>
            <Button
              mode="contained"
              icon="refresh"
              buttonColor={theme.colors.primary}
              textColor={theme.colors.onPrimary}
              style={styles.resetBtn}
              onPress={onRefresh}
            >
              {isMr ? 'रिफ्रेश करा' : 'Refresh'}
            </Button>
          </Surface>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  // App Bar
  logoIcon: {
    marginLeft: 12,
    marginRight: 4,
  },
  appbarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 0.3,
  },

  // Feed Header Container
  feedHeaderContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },


  offerBanner: {
    minHeight: 104,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  offerCopy: {
    flex: 1,
    paddingRight: 12,
  },
  offerEyebrow: {
    color: '#ffd5e7',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  offerTitle: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '800',
    marginTop: 4,
  },
  offerSubtitle: {
    color: '#ffe8f1',
    fontSize: 11,
    marginTop: 4,
  },
  offerTimer: {
    minWidth: 76,
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.18)',
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  offerTimerText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
    marginTop: 2,
  },
  offerTimerLabel: {
    color: '#ffe8f1',
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginTop: 2,
  },

  // Smart 16:9 Image Banner Carousel
  carouselContainer: {
    marginBottom: 16,
  },
  heroBannerContainer: {
    borderRadius: 14,
    overflow: 'hidden',
  },
  heroBannerSurface: {
    borderRadius: 14,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#e8e8e8',
    borderWidth: 1.5,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  paginationDotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    gap: 6,
  },
  paginationDot: {
    height: 5,
    borderRadius: 3,
  },
  paginationDotActive: {
    width: 20,
  },
  paginationDotInactive: {
    width: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.18)',
  },

  // Stories Section (Daily Matches)
  storiesSection: {
    marginBottom: 16,
  },
  storiesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionHeading: {
    fontSize: 14,
    fontWeight: '700',
  },
  viewAllText: {
    fontSize: 12,
    fontWeight: '600',
  },
  storiesList: {
    gap: 14,
    paddingVertical: 2,
  },
  storyItem: {
    alignItems: 'center',
    width: 68,
  },
  storyRing: {
    width: 58,
    height: 58,
    borderRadius: 29,
    borderWidth: 2.5,
    padding: 2,
    position: 'relative',
  },
  storyAvatar: {
    width: '100%',
    height: '100%',
    borderRadius: 26,
  },
  storyVerifiedDot: {
    position: 'absolute',
    bottom: -1,
    right: -1,
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#ffffff',
  },
  storyName: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 5,
    textAlign: 'center',
  },
  storyScore: {
    fontSize: 9,
    fontWeight: '700',
  },

  // Feed Content
  feedContent: {
    paddingBottom: 24,
  },

  // Profile Card
  profileCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 18,
    overflow: 'hidden',
  },
  imageWrapper: {
    position: 'relative',
    height: 290,
    width: '100%',
    backgroundColor: '#eaeaea',
  },
  profileImage: {
    width: '100%',
    height: '100%',
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
  topBadgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  verifiedText: {
    fontSize: 11,
    fontWeight: '700',
  },
  heartSurface: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartBtn: {
    margin: 0,
  },
  imageOverlayBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingTop: 36,
    paddingBottom: 12,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileName: {
    color: '#ffffff',
    fontWeight: '800',
    flex: 1,
    marginRight: 8,
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  englishSubName: {
    color: '#e4e4e4',
    fontSize: 12,
    marginTop: 2,
  },
  // Card Content Details
  cardContent: {
    display: 'none',
    paddingTop: 12,
    paddingBottom: 8,
    gap: 7,
  },
  simpleCardContent: {
    paddingTop: 14,
    paddingBottom: 10,
    gap: 12,
  },
  simpleInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  simpleInfoItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 0,
  },
  simpleInfoText: {
    flex: 1,
    marginLeft: 8,
    minWidth: 0,
  },
  simpleInfoLabel: {
    color: '#777777',
    fontSize: 11,
    marginBottom: 2,
  },
  simpleInfoValue: {
    fontSize: 13,
    fontWeight: '700',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailIconWrapper: {
    width: 24,
    alignItems: 'center',
    marginRight: 8,
  },
  detailText: {
    flex: 1,
    fontSize: 13,
  },
  detailHighlight: {
    fontWeight: '700',
  },
  bioSurface: {
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 3,
  },
  bioText: {
    fontStyle: 'italic',
    lineHeight: 18,
  },

  // Card Actions
  cardActions: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    paddingHorizontal: 16,
    paddingBottom: 14,
    paddingTop: 6,
    gap: 10,
  },
  viewProfileBtn: {
    borderRadius: 10,
    flex: 1,
  },
  chatBtn: {
    borderRadius: 10,
    flex: 1,
  },
  btnContent: {
    height: 40,
  },

  // Empty State
  emptyCard: {
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 20,
  },
  emptyTitle: {
    fontWeight: '700',
    marginTop: 16,
  },
  emptySubtitle: {
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 20,
  },
  resetBtn: {
    borderRadius: 10,
    paddingHorizontal: 8,
  },

  // Trust Footer
  footerContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 20,
  },
  trustFooterSurface: {
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
  },
  trustFooterTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginTop: 8,
  },
  trustFooterSubtitle: {
    fontSize: 11,
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 16,
  },
});
