import { ScrollView, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/hooks/use-theme';
import { useLanguage } from '@/i18n/LanguageContext';
import { AppText as Text} from '@/components/app-text';

// Placeholder events — will be replaced by real tracked events later
const events = [
  { key: 'birth', date: '2022-03-15', icon: 'egg' as const, lib: 'material' as const },
  { key: 'firstTransfer', date: '2023-05-10', icon: 'car' as const, lib: 'ionicons' as const },
  { key: 'arrival', date: '2023-05-12', icon: 'home' as const, lib: 'ionicons' as const },
  { key: 'lastInspection', date: '2026-04-30', icon: 'clipboard' as const, lib: 'ionicons' as const },
  { key: 'nextTransfer', date: '2026-05-05', icon: 'calendar' as const, lib: 'ionicons' as const },
];

export default function AnimalHistoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useLanguage();
  const theme = useTheme();

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <Text style={[styles.title, { color: theme.title }]}>
          {t('traceabilityTimeline')} · #{id}
        </Text>

        <ScrollView contentContainerStyle={{ padding: 20 }}>
          {events.map((event, index) => (
            <View key={`${event.key}-${index}`} style={styles.row}>
              <View style={[styles.iconWrap, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
                {event.lib === 'material' ? (
                  <MaterialCommunityIcons name={event.icon as any} size={18} color={theme.title} />
                ) : (
                  <Ionicons name={event.icon as any} size={18} color={theme.title} />
                )}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.label, { color: theme.text }]}>{t(event.key as any)}</Text>
                <Text style={[styles.date, { color: theme.textSecondary }]}>{event.date}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginTop: 16, paddingHorizontal: 20 },
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginBottom: 16 },
  iconWrap: {
    width: 36, height: 36, borderRadius: 18, borderWidth: 1,
    alignItems: 'center', justifyContent: 'center',
  },
  label: { fontSize: 14, fontWeight: 'bold' },
  date: { fontSize: 12, marginTop: 2 },
});