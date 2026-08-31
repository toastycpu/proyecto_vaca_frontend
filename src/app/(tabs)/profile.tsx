import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLanguage } from '@/i18n/LanguageContext';

export default function ProfileScreen() {
  const { t } = useLanguage();
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>{t('profileTab')} — coming soon</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F2A2D', alignItems: 'center', justifyContent: 'center' },
  text: { color: '#D9E2C6', fontSize: 18 },
});