import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

export const primaryColor = '#901c60';
export const accentColor = '#4caf50'; // Vibrant Green for progress
export const screenBackground = '#f4f4f6'; // Standard App Background

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: primaryColor,
    onPrimary: '#FFFFFF',
    primaryContainer: '#FFCC80',
    onPrimaryContainer: '#4E1800',
    secondary: '#FFB300', // Marigold / Gold
    onSecondary: '#422C00',
    secondaryContainer: '#FFE082',
    onSecondaryContainer: '#593D00',
    background: '#FFF8F1', // Soft warm background
    surface: '#FFFFFF',
    error: '#B00020',
  },
};
