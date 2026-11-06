import React, { useState, useMemo } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { dummyProfiles, Profile } from '../data/dummyData';
import { useLanguage } from '../context/LanguageContext';

const primaryColor = '#901c60';
const primaryLight = '#fdf2f7';

export const SearchScreen = ({ navigation }: any) => {
  const { t, language } = useLanguage();
  const allCity = language === 'mr' ? 'सर्व' : 'All';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>(allCity);

  const cities = language === 'mr' 
    ? ['सर्व', 'पुणे', 'मुंबई', 'नाशिक', 'नागपूर']
    : ['All', 'Pune', 'Mumbai', 'Nashik', 'Nagpur'];

  const filteredResults = useMemo(() => {
    return dummyProfiles.filter(profile => {
      // City filter
      if (selectedCity !== allCity) {
        const matchesCity =
          profile.city?.toLowerCase().includes(selectedCity.toLowerCase()) ||
          profile.location.toLowerCase().includes(selectedCity.toLowerCase());
        if (!matchesCity) return false;
      }

      // Query filter (searches across name, marathiName, caste, subcaste, education, profession, location)
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      return (
        profile.name.toLowerCase().includes(q) ||
        (profile.marathiName && profile.marathiName.toLowerCase().includes(q)) ||
        profile.caste.toLowerCase().includes(q) ||
        (profile.subcaste && profile.subcaste.toLowerCase().includes(q)) ||
        profile.education.toLowerCase().includes(q) ||
        profile.profession.toLowerCase().includes(q) ||
        profile.location.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, selectedCity, allCity]);

  const renderItem = ({ item }: { item: Profile }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => navigation.navigate('ProfileDetails', { profile: item })}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.thumbnail} />
      <View style={styles.infoContainer}>
        <View style={styles.nameRow}>
          <Text style={styles.nameText}>
            {item.marathiName || item.name}, {item.age}
          </Text>
          {item.isVerified && (
            <MaterialCommunityIcons name="check-decagram" size={16} color="#2e7d32" />
          )}
        </View>

        <Text style={styles.subText} numberOfLines={1}>
          {item.caste} {item.subcaste ? `(${item.subcaste})` : ''} • {item.height}
        </Text>
        <Text style={styles.subText} numberOfLines={1}>
          {item.education} • {item.profession}
        </Text>
        <View style={styles.locationRow}>
          <MaterialCommunityIcons name="map-marker-outline" size={14} color="#777" />
          <Text style={styles.locationText}>{item.location}</Text>
        </View>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={22} color="#bbb" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {language === 'mr' ? 'जोडीदार शोधा' : 'Search Matches'}
        </Text>
        <Text style={styles.headerSub}>
          {language === 'mr' ? 'नाव, जात, शिक्षण किंवा शहरावरून शोधा' : 'Search by name, caste, education or city'}
        </Text>

        {/* Search Input Box */}
        <View style={styles.searchBar}>
          <MaterialCommunityIcons name="magnify" size={22} color="#777" />
          <TextInput
            placeholder={language === 'mr' ? 'उदा. पुणे, मराठा, इंजिनिअर, स्नेहा...' : 'e.g. Pune, Maratha, Engineer, Sneha...'}
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
            clearButtonMode="while-editing"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <MaterialCommunityIcons name="close-circle" size={18} color="#999" />
            </TouchableOpacity>
          )}
        </View>

        {/* City Filter Pills */}
        <View style={styles.cityPillContainer}>
          {cities.map(city => {
            const isSelected = selectedCity === city;
            return (
              <TouchableOpacity
                key={city}
                style={[
                  styles.cityPill,
                  isSelected ? styles.cityPillActive : styles.cityPillInactive,
                ]}
                onPress={() => setSelectedCity(city)}
              >
                <Text
                  style={[
                    styles.cityPillText,
                    isSelected ? styles.cityPillTextActive : styles.cityPillTextInactive,
                  ]}
                >
                  {city}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Results List */}
      <FlatList
        data={filteredResults}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text style={styles.resultCount}>
            {language === 'mr' 
              ? `शोध निकाल: ${filteredResults.length} प्रोफाइल्स सापडल्या`
              : `Search Results: ${filteredResults.length} profiles found`}
          </Text>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="account-search" size={54} color="#ccc" />
            <Text style={styles.emptyText}>
              {language === 'mr' ? 'कोणतेही प्रोफाइल जुळले नाही' : 'No matching profiles found'}
            </Text>
            <Text style={styles.emptySubText}>
              {language === 'mr' ? 'कृपया दुसरे नाव किंवा शहर निवडून शोधा.' : 'Please try searching with another keyword or city.'}
            </Text>
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
    color: '#666666',
    marginTop: 2,
    marginBottom: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f2f5',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333333',
    padding: 0,
  },
  cityPillContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
  },
  cityPill: {
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 16,
  },
  cityPillActive: {
    backgroundColor: primaryColor,
  },
  cityPillInactive: {
    backgroundColor: '#f1f2f5',
  },
  cityPillText: {
    fontSize: 12,
    fontWeight: '600',
  },
  cityPillTextActive: {
    color: '#ffffff',
  },
  cityPillTextInactive: {
    color: '#555555',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 90,
  },
  resultCount: {
    fontSize: 12,
    color: '#777777',
    marginBottom: 10,
    fontWeight: '500',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eceff1',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  thumbnail: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#e0e0e0',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 14,
    marginRight: 6,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  nameText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222222',
  },
  subText: {
    fontSize: 12,
    color: '#666666',
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
    color: '#777777',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#555555',
    marginTop: 10,
  },
  emptySubText: {
    fontSize: 12,
    color: '#888888',
    marginTop: 4,
  },
});

export default SearchScreen;
