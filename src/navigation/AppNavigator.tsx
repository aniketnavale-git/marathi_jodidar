import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainTabNavigator } from './MainTabNavigator';
import { ProfileDetailsScreen } from '../screens/ProfileDetailsScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { OtpScreen } from '../screens/OtpScreen';
import { RegistrationScreen } from '../screens/RegistrationScreen';
import { RegistrationStep2Screen } from '../screens/RegistrationStep2Screen';
import { RegistrationStep3Screen } from '../screens/RegistrationStep3Screen';
import { RegistrationStep4Screen } from '../screens/RegistrationStep4Screen';
import { CasteSelectionScreen } from '../screens/CasteSelectionScreen';
import { SplashScreen } from '../screens/SplashScreen';
import { LanguageSelectionScreen } from '../screens/LanguageSelectionScreen';
import { useTheme } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  const theme = useTheme();
  const { isLoggedIn, logout } = useAuth();
  const { isLanguageSelected, language } = useLanguage();
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  if (!isLanguageSelected) {
    return <LanguageSelectionScreen />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: theme.colors.onPrimary,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      {!isLoggedIn ? (
        // Auth Stack
        <Stack.Group screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Otp" component={OtpScreen} />
          <Stack.Screen name="Registration" component={RegistrationScreen} />
          <Stack.Screen name="RegistrationStep2" component={RegistrationStep2Screen} />
          <Stack.Screen name="RegistrationStep3" component={RegistrationStep3Screen} />
          <Stack.Screen name="RegistrationStep4" component={RegistrationStep4Screen} />
          <Stack.Screen name="CasteSelection" component={CasteSelectionScreen} />
        </Stack.Group>
      ) : (
        // Main App Stack
        <Stack.Group>
          <Stack.Screen 
            name="Main" 
            component={MainTabNavigator} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="ProfileDetails" 
            component={ProfileDetailsScreen} 
            options={({ route }: any) => ({ 
              title: language === 'en'
                ? (route.params?.profile?.name || 'Profile Details')
                : (route.params?.profile?.marathiName || route.params?.profile?.name || 'प्रोफाइल तपशील'),
            })} 
          />
          <Stack.Screen 
            name="LanguageSelection" 
            component={LanguageSelectionScreen} 
            options={{ 
              title: 'भाषा निवडा / Choose Language',
            }} 
          />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
