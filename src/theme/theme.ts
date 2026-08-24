import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#874086', // Extracted from logo
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
