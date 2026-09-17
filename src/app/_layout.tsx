import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';

import { LanguageProvider } from '@/i18n/LanguageContext';
import { AccessibilityProvider } from '@/context/AccessibilityContext';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
  <LanguageProvider>
    <AccessibilityProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack screenOptions={{ headerShown: false }} />
        </ThemeProvider>
    </AccessibilityProvider>
  </LanguageProvider>
  );
}
