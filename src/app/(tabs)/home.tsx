import { ScrollView, View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

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
  const { t } = useLanguage();

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>VAQUERO</Text>

        {/* Herd Summary */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t('herdSummary')}</Text>
          <View style={styles.statRow}>
            <Ionicons name="people" size={18} color="#C9BE9C" />
            <Text style={styles.statLabel}>{t('totalAnimals')}</Text>
            <Text style={styles.statValue}>{herd.total}</Text>
          </View>
          <View style={styles.statRow}>
            <Ionicons name="leaf" size={18} color="#C9BE9C" />
            <Text style={styles.statLabel}>{t('activeOnFarm')}</Text>
            <Text style={styles.statValue}>{herd.active}</Text>
          </View>
          <View style={styles.statRow}>
            <Ionicons name="car" size={18} color="#C9BE9C" />
            <Text style={styles.statLabel}>{t('inTransit')}</Text>
            <Text style={styles.statValue}>{herd.inTransit}</Text>
          </View>
          <View style={styles.statRow}>
            <Ionicons name="time" size={18} color="#C9BE9C" />
            <Text style={styles.statLabel}>{t('lastUpdate')}</Text>
            <Text style={styles.statValue}>{herd.lastUpdateMinutes} {t('minAgo')}</Text>
          </View>
          <View style={styles.statRow}>
            <Ionicons name="warning" size={18} color="#E0B23C" />
            <Text style={styles.statLabel}>{t('movementAlerts')}</Text>
            <Text style={styles.statValue}>{herd.alerts}</Text>
          </View>
        </View>

        {/* Selected Animal */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t('selectedAnimal')}</Text>
          <View style={styles.animalRow}>
            <View style={styles.animalAvatar}>
              <Ionicons name="paw" size={32} color="#0F2A2D" />
            </View>
            <Text style={styles.animalName}>{animal.name}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>{t('tagId')}</Text>
            <Text style={styles.detailValue}>{animal.tagId}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>{t('breed')}</Text>
            <Text style={styles.detailValue}>{animal.breed}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>{t('weight')}</Text>
            <Text style={styles.detailValue}>{animal.weight}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>{t('age')}</Text>
            <Text style={styles.detailValue}>{animal.age} {t('years')}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>{t('origin')}</Text>
            <Text style={styles.detailValue}>{animal.origin}</Text>
          </View>
        </View>

        {/* Traceability Timeline */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t('traceabilityTimeline')}</Text>
          {timeline.map((item) => (
            <View key={item.key} style={styles.timelineRow}>
              <Ionicons name={item.icon} size={18} color="#C9BE9C" />
              <View style={styles.timelineText}>
                <Text style={styles.timelineLabel}>{t(item.key as any)}</Text>
                <Text style={styles.timelineDate}>{item.date}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Map placeholder */}
        <View style={[styles.card, styles.mapPlaceholder]}>
          <Ionicons name="location" size={24} color="#C9BE9C" />
          <Text style={styles.mapText}>{animal.origin}</Text>
        </View>

        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>{t('viewFullHistory')}</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#0F2A2D' },
  scrollContainer: { padding: 20, paddingBottom: 40 },
  title: {
    color: '#C9BE9C',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: 2,
  },
  card: {
    backgroundColor: '#102830',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1C3F3D',
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    color: '#C9BE9C',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 8,
  },
  statLabel: { color: '#D9E2C6', flex: 1, fontSize: 14 },
  statValue: { color: '#D9E2C6', fontWeight: 'bold', fontSize: 14 },
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
    backgroundColor: '#C9BE9C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  animalName: { color: '#D9E2C6', fontSize: 18, fontWeight: 'bold' },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#1C3F3D',
  },
  detailLabel: { color: '#8A9A94', fontSize: 13 },
  detailValue: { color: '#D9E2C6', fontSize: 13, fontWeight: 'bold' },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 12,
  },
  timelineText: { flex: 1 },
  timelineLabel: { color: '#D9E2C6', fontSize: 14, fontWeight: 'bold' },
  timelineDate: { color: '#8A9A94', fontSize: 12, marginTop: 2 },
  mapPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
    gap: 8,
  },
  mapText: { color: '#D9E2C6', fontSize: 14 },
  button: {
    backgroundColor: '#4A7340',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
  },
  buttonText: { color: '#D9E2C6', fontWeight: 'bold', fontSize: 16 },
});