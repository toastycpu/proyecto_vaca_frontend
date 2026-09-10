import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/hooks/use-theme';
import { useLanguage } from '@/i18n/LanguageContext';

export default function CatalogLookupScreen() {
  const { t } = useLanguage();
  const theme = useTheme();
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Text style={[styles.text, { color: theme.text }]}>{t('comingSoon')}</Text>
      </SafeAreaView>
    </ThemedView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 18 },
});