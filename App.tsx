import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { AppNavigator } from './src/navigation/AppNavigator';
import { theme } from './src/theme/theme';
import { AuthProvider } from './src/context/AuthContext';
import { InterestsProvider } from './src/context/InterestsContext';
import { LanguageProvider } from './src/context/LanguageContext';

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#f4f4f6',
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <LanguageProvider>
        <AuthProvider>
          <InterestsProvider>
            <PaperProvider theme={theme}>
              <NavigationContainer theme={navTheme}>
                <AppNavigator />
              </NavigationContainer>
              <StatusBar style="light" />
            </PaperProvider>
          </InterestsProvider>
        </AuthProvider>
      </LanguageProvider>
    </SafeAreaProvider>
  );
}
