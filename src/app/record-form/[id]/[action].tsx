import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/hooks/use-theme';
import { useLanguage } from '@/i18n/LanguageContext';

export default function GenericFormStub() {
  const { id, action } = useLocalSearchParams<{ id: string; action: string }>();
  const { t } = useLanguage();
  const theme = useTheme();
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Text style={[styles.title, { color: theme.title }]}>{action} · #{id}</Text>
        <Text style={[styles.text, { color: theme.text }]}>{t('comingSoon')}</Text>
      </SafeAreaView>
    </ThemedView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  title: { fontSize: 20, fontWeight: 'bold' },
  text: { fontSize: 16 },
});