import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useInterests } from '../context/InterestsContext';
import { Profile } from '../data/dummyData';

const primaryColor = '#901c60';
const primaryLight = '#fdf2f7';

export const MatchesScreen = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState<'sent' | 'favorites'>('sent');
  const {
    getSentInterestProfiles,
    getFavoritedProfiles,
    toggleInterest,
    toggleFavorite,
  } = useInterests();

  const sentProfiles = getSentInterestProfiles();
  const favoriteProfiles = getFavoritedProfiles();

  const currentList = activeTab === 'sent' ? sentProfiles : favoriteProfiles;

  const renderProfileItem = ({ item }: { item: Profile }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.85}
        onPress={() => navigation.navigate('ProfileDetails', { profile: item })}
      >
        <Image source={{ uri: item.imageUrl }} style={styles.thumbnail} />

        <View style={styles.infoCol}>
          <View style={styles.row}>
            <Text style={styles.nameText}>
              {item.marathiName || item.name}, {item.age}
            </Text>
            {item.isVerified && (
              <MaterialCommunityIcons name="check-decagram" size={16} color="#2e7d32" />
            )}
          </View>

          <Text style={styles.metaText} numberOfLines={1}>
            {item.caste} • {item.height}
          </Text>

          <Text style={styles.metaText} numberOfLines={1}>
            {item.education} • {item.profession}
          </Text>

          <View style={styles.locationRow}>
            <MaterialCommunityIcons name="map-marker-outline" size={14} color="#777" />
            <Text style={styles.locationText}>{item.location}</Text>
          </View>

          <View style={styles.badgeRow}>
            {activeTab === 'sent' ? (
              <View style={styles.statusBadgeSent}>
                <MaterialCommunityIcons name="clock-outline" size={12} color="#ffffff" />
                <Text style={styles.statusBadgeText}>प्रतिसादाची वाट पाहत आहे</Text>
              </View>
            ) : (
              <View style={styles.statusBadgeFav}>
                <MaterialCommunityIcons name="heart" size={12} color="#ffffff" />
                <Text style={styles.statusBadgeText}>शॉर्टलिस्टेड प्रोफाइल</Text>
              </View>
            )}
          </View>
        </View>

        <TouchableOpacity
          style={styles.removeBtn}
          onPress={() =>
            activeTab === 'sent' ? toggleInterest(item.id) : toggleFavorite(item.id)
          }
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons name="close-circle-outline" size={20} color="#999" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Screen Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>माझे इंटरेस्टस् आणि मॅचेस</Text>
        <Text style={styles.headerSub}>तुम्ही रस दाखवलेले आणि पसंत केलेले प्रोफाइल्स</Text>

        {/* Segment Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'sent' && styles.tabButtonActive]}
            onPress={() => setActiveTab('sent')}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons
              name="send-check"
              size={18}
              color={activeTab === 'sent' ? primaryColor : '#777'}
            />
            <Text
              style={[
                styles.tabText,
                activeTab === 'sent' ? styles.tabTextActive : styles.tabTextInactive,
              ]}
            >
              पाठवलेले इंटरेस्ट ({sentProfiles.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'favorites' && styles.tabButtonActive]}
            onPress={() => setActiveTab('favorites')}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons
              name="heart"
              size={18}
              color={activeTab === 'favorites' ? primaryColor : '#777'}
            />
            <Text
              style={[
                styles.tabText,
                activeTab === 'favorites' ? styles.tabTextActive : styles.tabTextInactive,
              ]}
            >
              शॉर्टलिस्टेड ({favoriteProfiles.length})
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* List */}
      <FlatList
        data={currentList}
        keyExtractor={item => item.id}
        renderItem={renderProfileItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons
              name={activeTab === 'sent' ? 'heart-broken-outline' : 'heart-outline'}
              size={64}
              color="#ccc"
            />
            <Text style={styles.emptyTitle}>
              {activeTab === 'sent'
                ? 'कोणतीही विनंती पाठवली नाही'
                : 'कोणतीही प्रोफाइल शॉर्टलिस्ट केली नाही'}
            </Text>
            <Text style={styles.emptySubtitle}>
              होम स्क्रीनवर जाऊन आवडत्या प्रोफाइल्सना रस दाखवा किंवा हार्ट आयकॉनवर टॅप करून शॉर्टलिस्ट करा.
            </Text>
            <TouchableOpacity
              style={styles.exploreBtn}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.exploreBtnText}>नवीन प्रोफाइल्स शोधा</Text>
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
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: primaryColor,
  },
  headerSub: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
    marginBottom: 12,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#f1f2f5',
    borderRadius: 10,
    padding: 3,
    gap: 4,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    borderRadius: 8,
    gap: 6,
  },
  tabButtonActive: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
  },
  tabTextActive: {
    color: primaryColor,
    fontWeight: 'bold',
  },
  tabTextInactive: {
    color: '#666',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 95,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eceff1',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  thumbnail: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#e0e0e0',
  },
  infoCol: {
    flex: 1,
    marginLeft: 14,
    marginRight: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  nameText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222',
  },
  metaText: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
    gap: 3,
  },
  locationText: {
    fontSize: 11,
    color: '#777',
  },
  badgeRow: {
    marginTop: 6,
  },
  statusBadgeSent: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f57c00',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    gap: 4,
  },
  statusBadgeFav: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e91e63',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    gap: 4,
  },
  statusBadgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  removeBtn: {
    padding: 6,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
    marginTop: 12,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#777',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 20,
    lineHeight: 18,
  },
  exploreBtn: {
    backgroundColor: primaryLight,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: primaryColor,
  },
  exploreBtnText: {
    color: primaryColor,
    fontSize: 13,
    fontWeight: 'bold',
  },
});

export default MatchesScreen;
