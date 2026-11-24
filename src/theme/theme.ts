import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

export const primaryColor = '#901c60';
export const accentColor = '#2e7d32'; // Vibrant Green for verified/progress
export const screenBackground = '#fef7fa'; // Soft warm background

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: primaryColor,
    onPrimary: '#ffffff',
    primaryContainer: '#ffd8e4',
    onPrimaryContainer: '#3b0021',
    secondary: '#7e5264',
    onSecondary: '#ffffff',
    secondaryContainer: '#ffd8e7',
    onSecondaryContainer: '#311020',
    tertiary: accentColor,
    onTertiary: '#ffffff',
    tertiaryContainer: '#c8e6c9',
    onTertiaryContainer: '#002107',
    background: '#fef7fa',
    onBackground: '#201a1c',
    surface: '#ffffff',
    onSurface: '#201a1c',
    surfaceVariant: '#f2dee3',
    onSurfaceVariant: '#514347',
    outline: '#837377',
    outlineVariant: '#d5c2c6',
    error: '#ba1a1a',
    onError: '#ffffff',
  },
};
