import React, { useState, useMemo, useEffect } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  FlatList,
  Keyboard,
  Platform,
} from 'react-native';
import { Appbar, TextInput, Text, Divider, TouchableRipple } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLanguage } from '../context/LanguageContext';
import { primaryColor } from '../theme/theme';
import { ALL_MAHARASHTRA_CASTES, CasteItem } from '../constants/castes';

export interface CasteSelectionModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (casteValue: string) => void;
  currentCaste?: string;
}

export const CasteSelectionModal: React.FC<CasteSelectionModalProps> = ({
  visible,
  onClose,
  onSelect,
  currentCaste,
}) => {
  const insets = useSafeAreaInsets();
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  // Reset search filter when modal is opened/closed
  useEffect(() => {
    if (!visible) {
      setSearchQuery('');
    }
  }, [visible]);

  const filteredCastes = useMemo(() => {
    const list = ALL_MAHARASHTRA_CASTES || [];
    const query = searchQuery.trim().toLowerCase();
    if (!query) return list;

    return list.filter((item) => {
      const matchMr = item.labelMr?.toLowerCase().includes(query) ?? false;
      const matchEn = item.labelEn?.toLowerCase().includes(query) ?? false;
      const matchVal = item.value?.toLowerCase().includes(query) ?? false;
      return matchMr || matchEn || matchVal;
    });
  }, [searchQuery]);

  const handleClose = () => {
    Keyboard.dismiss();
    onClose();
  };

  const handleSelect = (item: CasteItem) => {
    Keyboard.dismiss();
    onSelect(item.value);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <View style={styles.container}>
        <StatusBar style="light" />

        {/* Modal Appbar with normalized status bar height (eliminating double padding inside Modal) */}
        <Appbar.Header
          statusBarHeight={0}
          style={{ backgroundColor: primaryColor, elevation: 0 }}
        >
          <Appbar.Action
            icon="close"
            color="#ffffff"
            onPress={handleClose}
          />
          <Appbar.Content
            title={t('selectCaste')}
            titleStyle={{ color: '#ffffff', fontSize: 18, fontWeight: '600' }}
          />
        </Appbar.Header>

        {/* Search Bar */}
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
            theme={{ colors: { primary: primaryColor } }}
          />
        </View>

        {/* Caste List */}
        <FlatList
          style={{ flex: 1 }}
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
    </Modal>
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
    height: 56,
  },
  searchOutline: {
    borderRadius: 8,
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

export default CasteSelectionModal;
