import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
  TouchableOpacity,
  Alert
} from 'react-native';
import { TextInput, Button, Text, useTheme, Title } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

export const LoginScreen = ({ navigation }: any) => {
  const { t, language } = useLanguage();
  const { isUserRegistered } = useAuth();
  const [mobileNumber, setMobileNumber] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const theme = useTheme();

  // Entrance Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      })
    ]).start();
  }, [fadeAnim, slideAnim]);

  const handleMobileNumberChange = (text: string) => {
    // Only allow numeric characters
    let cleaned = text.replace(/[^0-9]/g, '');

    // Handle country code +91 or leading 0 from autofill / suggestion
    if (cleaned.length > 10) {
      if (cleaned.startsWith('91')) {
        cleaned = cleaned.slice(2);
      } else if (cleaned.startsWith('0')) {
        cleaned = cleaned.slice(1);
      } else {
        cleaned = cleaned.slice(-10);
      }
    }

    setMobileNumber(cleaned.slice(0, 10));
  };

  const handleContinue = () => {
    const cleaned = mobileNumber.replace(/[^0-9]/g, '');
    if (cleaned.length !== 10) {
      Alert.alert(t('mobileNumber'), t('enterValidPhone'));
      return;
    }

    setIsChecking(true);

    // Verify whether user is in the system or not
    setTimeout(() => {
      setIsChecking(false);
      const exists = isUserRegistered(cleaned);

      if (exists) {
        // User IS in system -> Redirect to Login OTP
        navigation.navigate('Otp', {
          mobileNumber: cleaned,
          isExistingUser: true
        });
      } else {
        // User is NOT in system -> Redirect to Create Account
        navigation.navigate('Registration', {
          mobileNumber: cleaned,
          isExistingUser: false
        });
      }
    }, 450);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top', 'bottom']}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.topSection}>
            <View style={styles.headerContainer}>
              <Image
                source={require('../../assets/logo-transparent.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

            <Animated.View
              style={[
                styles.contentContainer,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }]
                }
              ]}
            >
              {/* Decorative Icon */}
              <MaterialCommunityIcons
                name="heart-multiple-outline"
                size={36}
                color="#D4AF37"
                style={{ marginBottom: 16, alignSelf: 'center' }}
              />

              <Title style={[styles.title, { color: theme.colors.primary }]}>
                {t('welcomeTitle')}
              </Title>
              <Text style={styles.subtitle}>{t('welcomeSubtitle')}</Text>

              <TextInput
                label={t('mobileNumber')}
                value={mobileNumber}
                onChangeText={handleMobileNumberChange}
                maxLength={16}
                autoComplete="tel"
                textContentType="telephoneNumber"
                mode="outlined"
                style={styles.input}
                outlineStyle={styles.inputOutline}
                keyboardType="phone-pad"
                left={<TextInput.Icon icon={() => <MaterialCommunityIcons name="phone" size={24} color={theme.colors.primary} />} />}
              />

              <Button
                mode="contained"
                onPress={handleContinue}
                loading={isChecking}
                disabled={isChecking}
                style={styles.loginButton}
                contentStyle={styles.loginButtonContent}
                labelStyle={styles.loginButtonText}
              >
                {isChecking ? t('checkingNumber') : t('continueBtn')}
              </Button>
            </Animated.View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.termsText}>
              {language === 'mr' ? 'पुढे जाऊन, तुम्ही आमचे ' : 'By continuing, you agree to our '}
              <Text style={[styles.linkText, { color: theme.colors.primary }]} onPress={() => {}}>
                {language === 'mr' ? 'नियम व अटी (Terms & Conditions)' : 'Terms and Conditions'}
              </Text>
              {language === 'mr' ? ' मान्य करता.' : '.'}
            </Text>
            <Text style={styles.supportText}>
              {language === 'mr' ? 'काही अडचण आहे? ' : 'Need help? '}
              <Text style={[styles.linkText, { color: theme.colors.primary }]} onPress={() => {}}>
                {language === 'mr' ? 'ग्राहक सेवेशी संपर्क साधा' : 'Contact Support'}
              </Text>
            </Text>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 12,
  },
  topSection: {
    width: '100%',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  logo: {
    width: 160,
    height: 160,
  },
  contentContainer: {
    padding: 10,
    marginTop: 0,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    color: '#666666',
    marginBottom: 28,
    fontSize: 14,
    lineHeight: 20,
    paddingHorizontal: 16,
  },
  input: {
    marginBottom: 20,
    backgroundColor: '#ffffff',
    height: 56,
  },
  inputOutline: {
    borderRadius: 8,
    borderColor: '#e0e0e0',
  },
  loginButton: {
    borderRadius: 8,
    elevation: 3,
  },
  loginButtonContent: {
    height: 56,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  footer: {
    marginTop: 16,
    marginBottom: 8,
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  termsText: {
    color: '#666666',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 18,
  },
  supportText: {
    color: '#666666',
    fontSize: 13,
    textAlign: 'center',
  },
  linkText: {
    fontWeight: 'bold',
  },
});

export default LoginScreen;
