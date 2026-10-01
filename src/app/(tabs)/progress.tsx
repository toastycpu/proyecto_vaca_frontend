import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/hooks/use-theme';
import { useLanguage } from '@/i18n/LanguageContext';

const criteria = [
  { key: 'soilHealth', progress: 0.8 },
  { key: 'pastureCover', progress: 0.65 },
  { key: 'biodiversity', progress: 0.88 },
] as const;

export default function ProgressScreen() {
  const { t } = useLanguage();
  const theme = useTheme();

  const overall = Math.round(
    (criteria.reduce((sum, c) => sum + c.progress, 0) / criteria.length) * 100
  );

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: 20 }}>
          <Text style={[styles.title, { color: theme.title }]}>{t('progressTab')}</Text>

          <View style={[styles.scoreCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
            <Ionicons name="ribbon" size={32} color={theme.title} />
            <Text style={[styles.scoreText, { color: theme.title }]}>{overall}%</Text>
            <Text style={[styles.scoreLabel, { color: theme.textSecondary }]}>{t('globalEcoScore')}</Text>
          </View>

          {criteria.map((c) => (
            <View key={c.key} style={styles.criterionRow}>
              <Text style={[styles.criterionLabel, { color: theme.text }]}>{t(c.key)}</Text>
              <View style={[styles.barTrack, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
                <View style={[styles.barFill, { width: `${c.progress * 100}%`, backgroundColor: theme.accent }]} />
              </View>
              <Text style={[styles.percentLabel, { color: theme.textSecondary }]}>
                {Math.round(c.progress * 100)}%
              </Text>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  scoreCard: {
    alignItems: 'center', borderRadius: 14, borderWidth: 1, padding: 24, marginBottom: 24, gap: 4,
  },
  scoreText: { fontSize: 36, fontWeight: 'bold' },
  scoreLabel: { fontSize: 13 },
  criterionRow: { marginBottom: 16 },
  criterionLabel: { fontSize: 14, fontWeight: 'bold', marginBottom: 6 },
  barTrack: { height: 12, borderRadius: 6, borderWidth: 1, overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: 6 },
  percentLabel: { fontSize: 12, textAlign: 'right', marginTop: 4 },
});