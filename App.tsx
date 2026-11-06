import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { AppNavigator } from './src/navigation/AppNavigator';
import { theme } from './src/theme/theme';
import { AuthProvider } from './src/context/AuthContext';
import { InterestsProvider } from './src/context/InterestsContext';
import { LanguageProvider } from './src/context/LanguageContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <LanguageProvider>
        <AuthProvider>
          <InterestsProvider>
            <PaperProvider theme={theme}>
              <NavigationContainer>
                <AppNavigator />
              </NavigationContainer>
              <StatusBar style="auto" />
            </PaperProvider>
          </InterestsProvider>
        </AuthProvider>
      </LanguageProvider>
    </SafeAreaProvider>
  );
}
