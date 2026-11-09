import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Text, Button, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLanguage, Language } from '../context/LanguageContext';

export const LanguageSelectionScreen = ({ onComplete }: { onComplete?: () => void }) => {
  const theme = useTheme();
  const primaryColor = theme.colors.primary;
  const primaryLight = theme.colors.primaryContainer ? `${primaryColor}15` : '#fdf2f7';
  const { language, selectLanguage } = useLanguage();
  const [chosenLang, setChosenLang] = useState<Language>(language || 'mr');

  const handleContinue = () => {
    selectLanguage(chosenLang);
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <StatusBar style="dark" />

      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.headerContainer}>
          <Image
            source={require('../../assets/logo-transparent.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Language Selection Card Section */}
        <View style={styles.selectionSection}>
          <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
            तुमची भाषा निवडा / Choose Language
          </Text>
          <Text style={[styles.sectionSub, { color: theme.colors.onSurfaceVariant || '#777777' }]}>
            ॲप वापरण्यासाठी तुमची पसंतीची भाषा निवडा
          </Text>

          {/* Option 1: Marathi */}
          <TouchableOpacity
            style={[
              styles.langCard,
              chosenLang === 'mr'
                ? [styles.langCardSelected, { borderColor: primaryColor, backgroundColor: primaryLight }]
                : styles.langCardUnselected,
            ]}
            onPress={() => setChosenLang('mr')}
            activeOpacity={0.85}
          >
            <View
              style={[
                styles.iconBadge,
                chosenLang === 'mr'
                  ? [styles.iconBadgeSelected, { backgroundColor: primaryColor }]
                  : styles.iconBadgeUnselected,
              ]}
            >
              <Text
                style={[
                  styles.badgeChar,
                  chosenLang === 'mr' ? styles.badgeCharSelected : styles.badgeCharUnselected,
                ]}
              >
                म
              </Text>
            </View>

            <View style={styles.langTextContainer}>
              <Text style={[styles.langTitle, { color: theme.colors.onSurface }]}>मराठी</Text>
              <Text style={[styles.langDesc, { color: theme.colors.onSurfaceVariant || '#666666' }]}>
                मराठी भाषेत ॲप वापरा
              </Text>
            </View>

            <MaterialCommunityIcons
              name={chosenLang === 'mr' ? 'radiobox-marked' : 'radiobox-blank'}
              size={24}
              color={chosenLang === 'mr' ? primaryColor : '#bbb'}
            />
          </TouchableOpacity>

          {/* Option 2: English */}
          <TouchableOpacity
            style={[
              styles.langCard,
              chosenLang === 'en'
                ? [styles.langCardSelected, { borderColor: primaryColor, backgroundColor: primaryLight }]
                : styles.langCardUnselected,
            ]}
            onPress={() => setChosenLang('en')}
            activeOpacity={0.85}
          >
            <View
              style={[
                styles.iconBadge,
                chosenLang === 'en'
                  ? [styles.iconBadgeSelected, { backgroundColor: primaryColor }]
                  : styles.iconBadgeUnselected,
              ]}
            >
              <Text
                style={[
                  styles.badgeChar,
                  chosenLang === 'en' ? styles.badgeCharSelected : styles.badgeCharUnselected,
                ]}
              >
                En
              </Text>
            </View>

            <View style={styles.langTextContainer}>
              <Text style={[styles.langTitle, { color: theme.colors.onSurface }]}>English</Text>
              <Text style={[styles.langDesc, { color: theme.colors.onSurfaceVariant || '#666666' }]}>
                Use app in English
              </Text>
            </View>

            <MaterialCommunityIcons
              name={chosenLang === 'en' ? 'radiobox-marked' : 'radiobox-blank'}
              size={24}
              color={chosenLang === 'en' ? primaryColor : '#bbb'}
            />
          </TouchableOpacity>
        </View>

        {/* Footer Button */}
        <View style={styles.footer}>
          <Button
            mode="contained"
            onPress={handleContinue}
            buttonColor={primaryColor}
            textColor={theme.colors.onPrimary}
            style={styles.continueButton}
            contentStyle={styles.continueButtonContent}
            labelStyle={styles.continueButtonText}
          >
            {chosenLang === 'mr' ? 'पुढे जा (Continue)' : 'Continue'}
          </Button>

          <Text style={[styles.hintText, { color: theme.colors.onSurfaceVariant || '#888888' }]}>
            {chosenLang === 'mr'
              ? 'टीप: तुम्ही नंतर प्रोफाइलमधूनही भाषा बदलू शकता.'
              : 'Note: You can also change the language anytime from your profile.'}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  logo: {
    width: 170,
    height: 170,
  },
  selectionSection: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222222',
    textAlign: 'center',
    marginBottom: 4,
  },
  sectionSub: {
    fontSize: 13,
    color: '#777777',
    textAlign: 'center',
    marginBottom: 24,
  },
  langCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 14,
    marginBottom: 16,
    borderWidth: 1.5,
  },
  langCardSelected: {
    // Colors applied dynamically from useTheme()
  },
  langCardUnselected: {
    borderColor: '#e8e8e8',
    backgroundColor: '#fafafa',
  },
  iconBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  iconBadgeSelected: {
    // Colors applied dynamically from useTheme()
  },
  iconBadgeUnselected: {
    backgroundColor: '#e0e0e0',
  },
  badgeChar: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  badgeCharSelected: {
    color: '#ffffff',
  },
  badgeCharUnselected: {
    color: '#666666',
  },
  langTextContainer: {
    flex: 1,
  },
  langTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  langDesc: {
    fontSize: 12,
    marginTop: 2,
  },
  footer: {
    marginBottom: 10,
  },
  continueButton: {
    borderRadius: 8,
    elevation: 3,
  },
  continueButtonContent: {
    height: 56,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  hintText: {
    fontSize: 11,
    color: '#888888',
    textAlign: 'center',
    marginTop: 12,
  },
});

export default LanguageSelectionScreen;

