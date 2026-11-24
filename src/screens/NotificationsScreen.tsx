import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';
import { Text, Appbar, TouchableRipple, Divider, Chip } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLanguage } from '../context/LanguageContext';
import { primaryColor, accentColor } from '../theme/theme';
import { dummyProfiles, Profile } from '../data/dummyData';

interface NotificationItem {
  id: string;
  type: 'interest' | 'view' | 'match' | 'system';
  profile?: Profile;
  titleMr: string;
  titleEn: string;
  messageMr: string;
  messageEn: string;
  timeMr: string;
  timeEn: string;
  isRead: boolean;
}

const initialNotifications: NotificationItem[] = [
  {
    id: 'n1',
    type: 'interest',
    profile: dummyProfiles[0], // Sneha Sawant
    titleMr: 'नवीन इंटरेस्ट आला!',
    titleEn: 'New Interest Received!',
    messageMr: 'स्नेहा सावंत यांनी तुमच्या प्रोफाइलमध्ये रस दाखवला आहे.',
    messageEn: 'Sneha Sawant expressed interest in your profile.',
    timeMr: '१० मिनिटांपूर्वी',
    timeEn: '10 mins ago',
    isRead: false,
  },
  {
    id: 'n2',
    type: 'view',
    profile: dummyProfiles[1], // Pooja Kulkarni
    titleMr: 'प्रोफाइल पाहिली',
    titleEn: 'Profile Viewed',
    messageMr: 'पूजा कुलकर्णी यांनी तुमची प्रोफाइल पाहिली.',
    messageEn: 'Pooja Kulkarni viewed your profile.',
    timeMr: '२ तासांपूर्वी',
    timeEn: '2 hours ago',
    isRead: false,
  },
  {
    id: 'n3',
    type: 'match',
    profile: dummyProfiles[2], // Anjali Patil
    titleMr: 'इंटरेस्ट स्वीकारला!',
    titleEn: 'Interest Accepted!',
    messageMr: 'अंजली पाटील यांनी तुमचा पाठवलेला इंटरेस्ट स्वीकारला. आता चॅट करा!',
    messageEn: 'Anjali Patil accepted your interest. You can now chat!',
    timeMr: 'काल',
    timeEn: 'Yesterday',
    isRead: true,
  },
  {
    id: 'n4',
    type: 'system',
    titleMr: 'नवीन जोडीदार शिफारसी',
    titleEn: 'New Match Recommendations',
    messageMr: 'तुमच्या पसंतीनुसार पुण्यात ५ नवीन मराठा प्रोफाइल्स उपलब्ध आहेत.',
    messageEn: '5 new matching Maratha profiles in Pune are available for you.',
    timeMr: '३ दिवस आधी',
    timeEn: '3 days ago',
    isRead: true,
  },
];

export const NotificationsScreen = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const { t, language } = useLanguage();
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [activeFilter, setActiveFilter] = useState<'all' | 'interest' | 'view'>('all');
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 600);
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, isRead: true })));
  };

  const handlePressItem = (item: NotificationItem) => {
    // Mark as read
    setNotifications((prev) =>
      prev.map((n) => (n.id === item.id ? { ...n, isRead: true } : n))
    );

    if (item.profile) {
      navigation.navigate('ProfileDetails', { profile: item.profile });
    }
  };

  const filteredList = notifications.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.type === activeFilter;
  });

  const getIconForType = (type: NotificationItem['type']) => {
    switch (type) {
      case 'interest':
        return { name: 'heart', color: '#e91e63', bg: '#fce4ec' };
      case 'view':
        return { name: 'eye-outline', color: '#1976d2', bg: '#e3f2fd' };
      case 'match':
        return { name: 'check-decagram', color: '#2e7d32', bg: '#e8f5e9' };
      default:
        return { name: 'bell-outline', color: primaryColor, bg: '#fdf2f7' };
    }
  };

  const renderItem = ({ item }: { item: NotificationItem }) => {
    const iconConfig = getIconForType(item.type);
    const title = language === 'mr' ? item.titleMr : item.titleEn;
    const msg = language === 'mr' ? item.messageMr : item.messageEn;
    const time = language === 'mr' ? item.timeMr : item.timeEn;

    return (
      <TouchableRipple
        style={[styles.card, !item.isRead && styles.cardUnread]}
        onPress={() => handlePressItem(item)}
        rippleColor="rgba(144, 28, 96, 0.1)"
      >
        <View style={styles.cardRow}>
          {/* Avatar or Icon Badge */}
          {item.profile ? (
            <View style={styles.avatarWrapper}>
              <Image source={{ uri: item.profile.imageUrl }} style={styles.avatar} />
              <View style={[styles.miniTypeBadge, { backgroundColor: iconConfig.color }]}>
                <MaterialCommunityIcons name={iconConfig.name as any} size={11} color="#ffffff" />
              </View>
            </View>
          ) : (
            <View style={[styles.iconCircle, { backgroundColor: iconConfig.bg }]}>
              <MaterialCommunityIcons name={iconConfig.name as any} size={24} color={iconConfig.color} />
            </View>
          )}

          {/* Text Content */}
          <View style={styles.contentCol}>
            <View style={styles.titleRow}>
              <Text style={[styles.titleText, !item.isRead && styles.titleTextUnread]}>
                {title}
              </Text>
              {!item.isRead && <View style={styles.unreadDot} />}
            </View>
            <Text style={styles.msgText} numberOfLines={2}>
              {msg}
            </Text>
            <Text style={styles.timeText}>{time}</Text>
          </View>
        </View>
      </TouchableRipple>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <Appbar.Header style={{ backgroundColor: primaryColor, elevation: 0 }}>
        <Appbar.Content
          title={
            <View>
              <Text style={styles.headerTitle}>{t('notificationsTitle')}</Text>
              <Text style={styles.headerSubtitle}>{t('notificationsSubtitle')}</Text>
            </View>
          }
        />
        <Appbar.Action
          icon="check-all"
          color="#ffffff"
          onPress={handleMarkAllRead}
          accessibilityLabel={t('markAllAsRead')}
        />
      </Appbar.Header>

      {/* Filter Tabs */}
      <View style={styles.filterRow}>
        <Chip
          selected={activeFilter === 'all'}
          onPress={() => setActiveFilter('all')}
          style={[styles.chip, activeFilter === 'all' && styles.chipActive]}
          textStyle={[styles.chipText, activeFilter === 'all' && styles.chipTextActive]}
          showSelectedOverlay
        >
          {language === 'mr' ? 'सर्व' : 'All'}
        </Chip>
        <Chip
          selected={activeFilter === 'interest'}
          onPress={() => setActiveFilter('interest')}
          style={[styles.chip, activeFilter === 'interest' && styles.chipActive]}
          textStyle={[styles.chipText, activeFilter === 'interest' && styles.chipTextActive]}
          showSelectedOverlay
        >
          {language === 'mr' ? 'इंटरेस्ट' : 'Interests'}
        </Chip>
        <Chip
          selected={activeFilter === 'view'}
          onPress={() => setActiveFilter('view')}
          style={[styles.chip, activeFilter === 'view' && styles.chipActive]}
          textStyle={[styles.chipText, activeFilter === 'view' && styles.chipTextActive]}
          showSelectedOverlay
        >
          {language === 'mr' ? 'व्ह्यूज' : 'Views'}
        </Chip>
      </View>

      {/* Notifications List */}
      <FlatList
        data={filteredList}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <Divider style={{ backgroundColor: '#eeeeee' }} />}
        contentContainerStyle={[styles.listContent, { paddingBottom: 80 + insets.bottom }]}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[primaryColor]} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="bell-sleep-outline" size={64} color="#cccccc" />
            <Text style={styles.emptyTitle}>{t('noNotificationsTitle')}</Text>
            <Text style={styles.emptySubtitle}>{t('noNotificationsSubtitle')}</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f6',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '600',
  },
  headerSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
  },
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    gap: 8,
  },
  chip: {
    backgroundColor: '#f4f4f6',
    borderRadius: 16,
    height: 36,
  },
  chipActive: {
    backgroundColor: primaryColor,
  },
  chipText: {
    fontSize: 13,
    color: '#555555',
  },
  chipTextActive: {
    color: '#ffffff',
    fontWeight: '600',
  },
  listContent: {
    backgroundColor: '#ffffff',
  },
  card: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#ffffff',
  },
  cardUnread: {
    backgroundColor: '#fdf7fa',
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e0e0e0',
  },
  miniTypeBadge: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentCol: {
    flex: 1,
    marginLeft: 14,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  titleText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222222',
    flex: 1,
  },
  titleTextUnread: {
    color: primaryColor,
    fontWeight: 'bold',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: primaryColor,
    marginLeft: 6,
  },
  msgText: {
    fontSize: 13,
    color: '#666666',
    lineHeight: 18,
    marginBottom: 4,
  },
  timeText: {
    fontSize: 11,
    color: '#999999',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 30,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#444444',
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#888888',
    textAlign: 'center',
    marginTop: 6,
  },
});

export default NotificationsScreen;
