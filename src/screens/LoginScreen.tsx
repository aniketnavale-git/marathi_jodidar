import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  Image, 
  KeyboardAvoidingView, 
  Platform, 
  Dimensions, 
  ScrollView,
  Animated
} from 'react-native';
import { TextInput, Button, Text, useTheme, Title } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export const LoginScreen = ({ navigation }: any) => {
  const [mobileNumber, setMobileNumber] = useState('');
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
    const numericValue = text.replace(/[^0-9]/g, '');
    if (numericValue.length <= 10) {
      setMobileNumber(numericValue);
    }
  };

  // Format for display (e.g., 98765 43210)
  const displayMobileNumber = mobileNumber.replace(/(\d{5})(\d{1,5})/, '$1 $2').trim();

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="dark" />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        
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
          {/* Decorative Icon to make it feel like a premium wedding invite */}
          <MaterialCommunityIcons name="heart-multiple-outline" size={36} color="#D4AF37" style={{ marginBottom: 16, alignSelf: 'center' }} />
          
          <Title style={[styles.title, { color: theme.colors.primary }]}>Welcome Back</Title>
          <Text style={styles.subtitle}>Sign in to find your perfect match</Text>

          <TextInput
            label="Mobile Number"
            value={displayMobileNumber}
            onChangeText={handleMobileNumberChange}
            maxLength={11} // 10 digits + 1 space
            mode="outlined"
            style={styles.input}
            outlineStyle={styles.inputOutline}
            keyboardType="phone-pad"
            left={<TextInput.Icon icon={() => <MaterialCommunityIcons name="phone" size={24} color={theme.colors.primary} />} />}
          />

          <Button 
            mode="contained" 
            onPress={() => {
              if (mobileNumber.length > 0) {
                navigation.navigate('Otp', { mobileNumber });
              }
            }} 
            style={styles.loginButton}
            contentStyle={styles.loginButtonContent}
            labelStyle={styles.loginButtonText}
          >
            Continue
          </Button>
        </Animated.View>

        <View style={styles.footer}>
          <Text style={styles.termsText}>
            By continuing, you agree to our <Text style={styles.linkText} onPress={() => {}}>Terms and Conditions</Text>
          </Text>
          <Text style={styles.supportText}>
            Need help? <Text style={styles.linkText} onPress={() => {}}>Contact Support</Text>
          </Text>
        </View>

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
    paddingTop: 80, // added more padding at top to replace circles
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  logo: {
    width: 170,
    height: 170,
  },
  contentContainer: {
    padding: 10,
    marginTop: 0,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 32,
    fontSize: 15,
  },
  input: {
    marginBottom: 24,
    backgroundColor: '#ffffff',
    fontSize: 20,
    height: 64,
  },
  inputOutline: {
    borderRadius: 12,
    borderColor: '#c0c0c0',
    borderWidth: 1.5,
  },
  loginButton: {
    borderRadius: 30,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  loginButtonContent: {
    paddingVertical: 8,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 32,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  termsText: {
    color: '#666',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 12,
  },
  supportText: {
    color: '#666',
    fontSize: 13,
    textAlign: 'center',
  },
  linkText: {
    color: '#874086',
    fontWeight: 'bold',
  },
});
