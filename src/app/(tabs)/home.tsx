import { ScrollView, View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/hooks/use-theme';
import { useLanguage } from '@/i18n/LanguageContext';

// Placeholder data — replace with real backend data later
const herd = {
  total: 42,
  active: 38,
  inTransit: 4,
  lastUpdateMinutes: 5,
  alerts: 1,
};

const animal = {
  name: 'Nelore #1234',
  tagId: '1234 (Amarilla)',
  breed: 'Nelore',
  weight: '510 KG',
  age: '4',
  origin: 'Finca El Paraíso',
};

const timeline = [
  { key: 'birth', date: '2022-03-15', icon: 'paw' as const },
  { key: 'firstTransfer', date: '2023-05-10', icon: 'car' as const },
  { key: 'arrival', date: '2023-05-12', icon: 'home' as const },
  { key: 'lastInspection', date: '2026-04-30', icon: 'clipboard' as const },
  { key: 'nextTransfer', date: '2026-05-05', icon: 'calendar' as const },
];

export default function HomeScreen() {
  const { t, language, setLanguage } = useLanguage();
  const theme = useTheme();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  return (
    <ThemedView style={styles.mainContainer}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Pressable style={styles.langToggle} onPress={toggleLanguage}>
            <ThemedText type="small" themeColor="title" style={styles.langToggleText}>
              {language === 'en' ? 'ES' : 'EN'}
            </ThemedText>
          </Pressable>

          <Text style={[styles.title, { color: theme.title }]}>VAQUERO</Text>

          {/* Herd Summary */}
          <ThemedView type="card" style={styles.card}>
            <ThemedText type="smallBold" themeColor="title" style={styles.cardTitle}>
              {t('herdSummary')}
            </ThemedText>
            <View style={styles.statRow}>
              <Ionicons name="people" size={18} color={theme.title} />
              <ThemedText style={styles.statLabel}>{t('totalAnimals')}</ThemedText>
              <ThemedText style={styles.statValue}>{herd.total}</ThemedText>
            </View>
            <View style={styles.statRow}>
              <Ionicons name="leaf" size={18} color={theme.title} />
              <ThemedText style={styles.statLabel}>{t('activeOnFarm')}</ThemedText>
              <ThemedText style={styles.statValue}>{herd.active}</ThemedText>
            </View>
            <View style={styles.statRow}>
              <Ionicons name="car" size={18} color={theme.title} />
              <ThemedText style={styles.statLabel}>{t('inTransit')}</ThemedText>
              <ThemedText style={styles.statValue}>{herd.inTransit}</ThemedText>
            </View>
            <View style={styles.statRow}>
              <Ionicons name="time" size={18} color={theme.title} />
              <ThemedText style={styles.statLabel}>{t('lastUpdate')}</ThemedText>
              <ThemedText style={styles.statValue}>{herd.lastUpdateMinutes} {t('minAgo')}</ThemedText>
            </View>
            <View style={styles.statRow}>
              <Ionicons name="warning" size={18} color={theme.warning} />
              <ThemedText style={styles.statLabel}>{t('movementAlerts')}</ThemedText>
              <ThemedText style={styles.statValue}>{herd.alerts}</ThemedText>
            </View>
          </ThemedView>

          {/* Selected Animal */}
          <ThemedView type="card" style={styles.card}>
            <ThemedText type="smallBold" themeColor="title" style={styles.cardTitle}>
              {t('selectedAnimal')}
            </ThemedText>
            <View style={styles.animalRow}>
              <View style={[styles.animalAvatar, { backgroundColor: theme.avatarBg }]}>
                <Ionicons name="paw" size={32} color={theme.avatarIcon} />
              </View>
              <ThemedText style={styles.animalName}>{animal.name}</ThemedText>
            </View>

            <View style={[styles.detailRow, { borderBottomColor: theme.cardBorder }]}>
              <ThemedText themeColor="textSecondary" style={styles.detailLabel}>{t('tagId')}</ThemedText>
              <ThemedText style={styles.detailValue}>{animal.tagId}</ThemedText>
            </View>
            <View style={[styles.detailRow, { borderBottomColor: theme.cardBorder }]}>
              <ThemedText themeColor="textSecondary" style={styles.detailLabel}>{t('breed')}</ThemedText>
              <ThemedText style={styles.detailValue}>{animal.breed}</ThemedText>
            </View>
            <View style={[styles.detailRow, { borderBottomColor: theme.cardBorder }]}>
              <ThemedText themeColor="textSecondary" style={styles.detailLabel}>{t('weight')}</ThemedText>
              <ThemedText style={styles.detailValue}>{animal.weight}</ThemedText>
            </View>
            <View style={[styles.detailRow, { borderBottomColor: theme.cardBorder }]}>
              <ThemedText themeColor="textSecondary" style={styles.detailLabel}>{t('age')}</ThemedText>
              <ThemedText style={styles.detailValue}>{animal.age} {t('years')}</ThemedText>
            </View>
            <View style={[styles.detailRow, { borderBottomColor: theme.cardBorder }]}>
              <ThemedText themeColor="textSecondary" style={styles.detailLabel}>{t('origin')}</ThemedText>
              <ThemedText style={styles.detailValue}>{animal.origin}</ThemedText>
            </View>
          </ThemedView>

          {/* Traceability Timeline */}
          <ThemedView type="card" style={styles.card}>
            <ThemedText type="smallBold" themeColor="title" style={styles.cardTitle}>
              {t('traceabilityTimeline')}
            </ThemedText>
            {timeline.map((item) => (
              <View key={item.key} style={styles.timelineRow}>
                <Ionicons name={item.icon} size={18} color={theme.title} />
                <View style={styles.timelineText}>
                  <ThemedText type="smallBold" style={styles.timelineLabel}>
                    {t(item.key as any)}
                  </ThemedText>
                  <ThemedText themeColor="textSecondary" style={styles.timelineDate}>
                    {item.date}
                  </ThemedText>
                </View>
              </View>
            ))}
          </ThemedView>

          {/* Map placeholder */}
          <ThemedView type="card" style={[styles.card, styles.mapPlaceholder]}>
            <Ionicons name="location" size={24} color={theme.title} />
            <ThemedText style={styles.mapText}>{animal.origin}</ThemedText>
          </ThemedView>

          <Pressable style={[styles.button, { backgroundColor: theme.accent }]}>
            <Text style={[styles.buttonText, { color: theme.buttonText }]}>
              {t('viewFullHistory')}
            </Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1 },
  scrollContainer: { padding: 20, paddingBottom: 40 },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: 2,
  },
  card: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: { marginBottom: 12 },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 8,
  },
  statLabel: { flex: 1, fontSize: 14 },
  statValue: { fontWeight: 'bold', fontSize: 14 },
  animalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  animalAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animalName: { fontSize: 18, fontWeight: 'bold' },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
  },
  detailLabel: { fontSize: 13 },
  detailValue: { fontSize: 13, fontWeight: 'bold' },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 12,
  },
  timelineText: { flex: 1 },
  timelineLabel: { fontSize: 14 },
  timelineDate: { fontSize: 12, marginTop: 2 },
  mapPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
    gap: 8,
  },
  mapText: { fontSize: 14 },
  button: {
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
  },
  buttonText: { fontWeight: 'bold', fontSize: 16 },
  langToggle: { alignSelf: 'flex-end', padding: 8, marginBottom: 8 },
  langToggleText: { fontWeight: 'bold' },
});