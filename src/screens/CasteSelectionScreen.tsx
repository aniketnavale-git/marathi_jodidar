import React, { useState, useMemo } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
} from 'react-native';
import { Appbar, TextInput, Text, useTheme, Divider, TouchableRipple } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackActions } from '@react-navigation/native';
import { useLanguage } from '../context/LanguageContext';

export interface CasteItem {
  value: string;
  labelMr: string;
  labelEn: string;
}

export const ALL_MAHARASHTRA_CASTES: CasteItem[] = [
  { value: 'maratha', labelMr: 'मराठा (Maratha)', labelEn: 'Maratha' },
  { value: 'brahmin', labelMr: 'ब्राह्मण (Brahmin)', labelEn: 'Brahmin' },
  { value: 'kunbi', labelMr: 'कुणबी (Kunbi)', labelEn: 'Kunbi' },
  { value: 'mali', labelMr: 'माळी (Mali)', labelEn: 'Mali' },
  { value: 'dhangar', labelMr: 'धनगर (Dhangar)', labelEn: 'Dhangar' },
  { value: 'chambhar', labelMr: 'चांभार (Chambhar)', labelEn: 'Chambhar' },
  { value: 'mahar', labelMr: 'महार / नवबौद्ध (Mahar / Navabouddha)', labelEn: 'Mahar / Navabouddha' },
  { value: 'matang', labelMr: 'मातंग (Matang)', labelEn: 'Matang' },
  { value: 'agri', labelMr: 'आगरी (Agri)', labelEn: 'Agri' },
  { value: 'bhandari', labelMr: 'भंडारी (Bhandari)', labelEn: 'Bhandari' },
  { value: 'vanjari', labelMr: 'वंजारी (Vanjari)', labelEn: 'Vanjari' },
  { value: 'koli', labelMr: 'कोळी (Koli)', labelEn: 'Koli' },
  { value: 'sonar', labelMr: 'सोनार (Sonar)', labelEn: 'Sonar' },
  { value: 'teli', labelMr: 'तेली (Teli)', labelEn: 'Teli' },
  { value: 'lingayat', labelMr: 'लिंगायत (Lingayat)', labelEn: 'Lingayat' },
  { value: 'gurav', labelMr: 'गुरव (Gurav)', labelEn: 'Gurav' },
  { value: 'sutar', labelMr: 'सुतार (Sutar)', labelEn: 'Sutar' },
  { value: 'nhavi', labelMr: 'न्हावी / नाभिक (Nhavi / Nabhik)', labelEn: 'Nhavi / Nabhik' },
  { value: 'kumbhar', labelMr: 'कुंभार (Kumbhar)', labelEn: 'Kumbhar' },
  { value: 'koshti', labelMr: 'कोष्टी (Koshti)', labelEn: 'Koshti' },
  { value: 'shimpi', labelMr: 'शिंपी (Shimpi)', labelEn: 'Shimpi' },
  { value: 'lohar', labelMr: 'लोहार (Lohar)', labelEn: 'Lohar' },
  { value: 'vani', labelMr: 'वाणी (Vani)', labelEn: 'Vani' },
  { value: 'rajput', labelMr: 'राजपूत (Rajput)', labelEn: 'Rajput' },
  { value: 'jain', labelMr: 'जैन (Jain)', labelEn: 'Jain' },
  { value: 'marwadi', labelMr: 'मारवाडी (Marwadi)', labelEn: 'Marwadi' },
  { value: 'gujarati', labelMr: 'गुजराती (Gujarati)', labelEn: 'Gujarati' },
  { value: 'vadar', labelMr: 'वडार (Vadar)', labelEn: 'Vadar' },
  { value: 'gosavi', labelMr: 'गोसावी (Gosavi)', labelEn: 'Gosavi' },
  { value: 'bhat', labelMr: 'भाट (Bhat)', labelEn: 'Bhat' },
  { value: 'other', labelMr: 'इतर (Other)', labelEn: 'Other' },
];

const primaryColor = '#901c60';

export const CasteSelectionScreen = ({ route, navigation }: any) => {
  const insets = useSafeAreaInsets();
  const { t, language } = useLanguage();
  const { currentCaste } = route?.params || {};
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCastes = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return ALL_MAHARASHTRA_CASTES;

    return ALL_MAHARASHTRA_CASTES.filter((item) => {
      const matchMr = item.labelMr.toLowerCase().includes(query);
      const matchEn = item.labelEn.toLowerCase().includes(query);
      const matchVal = item.value.toLowerCase().includes(query);
      return matchMr || matchEn || matchVal;
    });
  }, [searchQuery]);

  const handleSelect = (item: CasteItem) => {
    // Brief delay so ripple animation is visually enjoyed
    setTimeout(() => {
      navigation.dispatch(
        StackActions.popTo('RegistrationStep2', { selectedCaste: item.value }, { merge: true })
      );
    }, 120);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* App Bar matching Step 2 */}
      <Appbar.Header style={{ backgroundColor: primaryColor, elevation: 0 }}>
        <Appbar.BackAction color="#ffffff" onPress={() => navigation.goBack()} />
        <Appbar.Content
          title={t('selectCaste')}
          titleStyle={{ color: '#ffffff', fontSize: 18, fontWeight: '600' }}
        />
      </Appbar.Header>

      {/* Search Input Box */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder={t('searchCaste')}
          value={searchQuery}
          onChangeText={setSearchQuery}
          mode="outlined"
          style={styles.searchInput}
          outlineStyle={styles.searchOutline}
          left={<TextInput.Icon icon="magnify" color="#888" />}
          right={
            searchQuery.length > 0 ? (
              <TextInput.Icon icon="close-circle" color="#888" onPress={() => setSearchQuery('')} />
            ) : null
          }
          autoFocus={false}
          theme={{ colors: { primary: primaryColor } }}
        />
      </View>

      {/* Caste List */}
      <FlatList
        data={filteredCastes}
        keyExtractor={(item) => item.value}
        keyboardShouldPersistTaps="handled"
        ItemSeparatorComponent={() => <Divider style={styles.divider} />}
        contentContainerStyle={[styles.listContent, { paddingBottom: 40 + insets.bottom }]}
        renderItem={({ item }) => {
          const isSelected = currentCaste === item.value;
          const displayLabel = language === 'mr' ? item.labelMr : item.labelEn;

          return (
            <TouchableRipple
              style={[styles.listItem, isSelected && { backgroundColor: '#fdf2f7' }]}
              onPress={() => handleSelect(item)}
              rippleColor="rgba(144, 28, 96, 0.15)"
            >
              <View style={styles.listItemRow}>
                <Text
                  style={[
                    styles.itemText,
                    isSelected && { color: primaryColor, fontWeight: 'bold' },
                  ]}
                >
                  {displayLabel}
                </Text>
                <MaterialCommunityIcons
                  name={isSelected ? 'radiobox-marked' : 'radiobox-blank'}
                  size={22}
                  color={isSelected ? primaryColor : '#bbbbbb'}
                />
              </View>
            </TouchableRipple>
          );
        }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="magnify-remove-outline" size={48} color="#bbbbbb" />
            <Text style={styles.emptyText}>{t('noCasteFound')}</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: '#ffffff',
  },
  searchInput: {
    backgroundColor: '#ffffff',
    height: 50,
  },
  searchOutline: {
    borderRadius: 10,
    borderColor: '#d0d0d0',
  },
  listContent: {
    paddingBottom: 24,
  },
  listItem: {
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  listItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  itemText: {
    fontSize: 16,
    color: '#222222',
  },
  divider: {
    backgroundColor: '#f0f0f0',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
    gap: 8,
  },
  emptyText: {
    fontSize: 15,
    color: '#888888',
  },
});

export default CasteSelectionScreen;

