import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { ProfileDetailsScreen } from '../screens/ProfileDetailsScreen';
import { MatchesScreen } from '../screens/MatchesScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { OtpScreen } from '../screens/OtpScreen';
import { RegistrationScreen } from '../screens/RegistrationScreen';
import { SplashScreen } from '../screens/SplashScreen';
import { useTheme, IconButton } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  const theme = useTheme();
  const { isLoggedIn, logout } = useAuth();
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
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
        </Stack.Group>
      ) : (
        // Main App Stack
        <Stack.Group>
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={({ navigation }) => ({
              title: 'Marathi Jodidar',
              headerLeft: () => (
                <IconButton
                  icon="logout"
                  iconColor={theme.colors.onPrimary}
                  size={24}
                  onPress={logout}
                />
              ),
              headerRight: () => (
                <IconButton
                  icon="heart"
                  iconColor={theme.colors.onPrimary}
                  size={24}
                  onPress={() => navigation.navigate('Matches')}
                />
              ),
            })}
          />
          <Stack.Screen 
            name="ProfileDetails" 
            component={ProfileDetailsScreen} 
            options={({ route }: any) => ({ 
              title: route.params?.profile?.name || 'Profile Details',
              headerBackTitleVisible: false,
            })} 
          />
          <Stack.Screen 
            name="Matches" 
            component={MatchesScreen} 
            options={{ title: 'Your Matches' }} 
          />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};
