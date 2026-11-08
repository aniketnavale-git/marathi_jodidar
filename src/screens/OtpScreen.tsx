import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform, 
  Dimensions, 
  ScrollView,
  Animated,
  TextInput as RNTextInput,
  TouchableOpacity,
  Image
} from 'react-native';
import { Button, Text, useTheme, Title, Appbar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

export const OtpScreen = ({ route, navigation }: any) => {
  const { t } = useLanguage();
  const { mobileNumber, isExistingUser } = route.params || { mobileNumber: '', isExistingUser: false };
  
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [resendCount, setResendCount] = useState(0);
  const theme = useTheme();
  const { login } = useAuth();
  
  // Refs for auto-focusing next input
  const inputRefs = useRef<Array<RNTextInput | null>>([null, null, null, null]);

  // Entrance Animation
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

  // Countdown timer for Resend OTP
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);

  const handleResend = () => {
    if (resendCount < 2) {
      // Allow normal 60s resend for first few attempts
      setResendCount((prev) => prev + 1);
      setTimer(60);
    } else {
      // 3 attempts exhausted, lock for 1 hour
      setResendCount((prev) => prev + 1);
      setTimer(3600);
    }
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleOtpChange = (value: string, index: number) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    
    if (numericValue.length > 1) return; // Prevent pasting multiple chars in one box for now

    const newOtp = [...otp];
    newOtp[index] = numericValue;
    setOtp(newOtp);

    // Auto focus next
    if (numericValue !== '' && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Auto focus previous on backspace if current is empty
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const isOtpComplete = otp.every(digit => digit !== '');

  const handleVerify = () => {
    // Log the user into the app
    login(mobileNumber);
  };

  const handleGoToRegistration = () => {
    // Navigate to registration flow
    navigation.replace('Registration');
  };

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="dark" />

      {/* Standard Paper Theme App Bar */}
      <Appbar.Header style={{ backgroundColor: theme.colors.surface, elevation: 4 }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={t('verificationTitle')} titleStyle={{ fontWeight: 'bold' }} />
      </Appbar.Header>

      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >

        <Animated.View 
          style={[
            styles.contentContainer, 
            { 
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          {/* OTP Style Icon */}
          <View style={{ alignItems: 'center', marginBottom: 24 }}>
            <MaterialCommunityIcons name="message-lock-outline" size={80} color={theme.colors.primary} />
          </View>

          <Title style={[styles.title, { color: theme.colors.primary }]}>{t('verificationTitle')}</Title>
          <Text style={styles.subtitle}>
            {t('otpSubtitle')}{'\n'}
            <Text style={{ fontWeight: 'bold' }}>+91 {mobileNumber.replace(/(\d{5})(\d{1,5})/, '$1 $2').trim()}</Text>{' '}
            <Text 
              style={{ color: theme.colors.primary, fontWeight: 'bold', fontSize: 12, textDecorationLine: 'underline' }}
              onPress={() => navigation.goBack()}
            >
              (Change)
            </Text>
          </Text>

          {/* OTP Input Boxes */}
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <RNTextInput
                key={index}
                ref={(ref) => {
                  inputRefs.current[index] = ref;
                }}
                style={[
                  styles.otpInput,
                  { borderColor: digit ? theme.colors.primary : '#e0e0e0' }
                ]}
                value={digit}
                onChangeText={(value) => handleOtpChange(value, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                keyboardType="numeric"
                maxLength={1}
                selectTextOnFocus
              />
            ))}
          </View>

          <Button 
            mode="contained" 
            onPress={handleVerify} 
            style={styles.verifyButton}
            contentStyle={styles.verifyButtonContent}
            labelStyle={styles.verifyButtonText}
          >
            {t('verifyAndLogin')}
          </Button>

          {!isExistingUser && (
            <Button 
              mode="text" 
              onPress={handleGoToRegistration} 
              style={{ marginTop: 10 }}
              textColor={theme.colors.primary}
              labelStyle={{ fontSize: 14, fontWeight: '600' }}
            >
              {t('newRegistration')}
            </Button>
          )}

          <View style={styles.resendContainer}>
            {timer > 0 ? (
              <Text style={styles.resendText}>
                {resendCount >= 3 ? "Too many attempts. Try again in " : "Resend code in "}
                <Text style={{ fontWeight: 'bold' }}>{formatTime(timer)}</Text>
              </Text>
            ) : (
              <TouchableOpacity onPress={handleResend}>
                <Text style={[styles.resendText, { color: theme.colors.primary, fontWeight: 'bold' }]}>
                  Resend OTP
                </Text>
              </TouchableOpacity>
            )}
          </View>

        </Animated.View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    padding: 24,
    paddingTop: 40,
  },
  contentContainer: {
    padding: 10,
    marginTop: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 32,
    fontSize: 14,
    lineHeight: 22,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
    paddingHorizontal: 10,
  },
  otpInput: {
    width: '22%',
    height: 65,
    borderWidth: 1.5,
    borderRadius: 14,
    fontSize: 28,
    textAlign: 'center',
    backgroundColor: '#fcfcfc',
    color: '#333',
    fontWeight: 'bold',
  },
  verifyButton: {
    borderRadius: 30,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  verifyButtonContent: {
    paddingVertical: 8,
  },
  verifyButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  resendContainer: {
    alignItems: 'center',
    marginTop: 24,
  },
  resendText: {
    color: '#666',
    fontSize: 14,
  },
});

export default OtpScreen;
