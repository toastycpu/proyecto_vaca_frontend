import { FlatList, Pressable, Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/hooks/use-theme';
import { useLanguage } from '@/i18n/LanguageContext';

// Placeholder data — replace with real backend/offline data later
const animals = [
  { id: '1234', name: 'Nelore #1234', breed: 'Nelore', weight: '510 KG' },
  { id: '1235', name: 'Nelore #1235', breed: 'Nelore', weight: '480 KG' },
  { id: '1236', name: 'Brahman #1236', breed: 'Brahman', weight: '530 KG' },
];

export default function CatalogLookupScreen() {
  const { t } = useLanguage();
  const theme = useTheme();

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <Text style={[styles.title, { color: theme.title }]}>{t('whatAnimal')}</Text>
        <FlatList
          data={animals}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <Pressable
              style={[styles.row, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}
              onPress={() =>
                router.push({ pathname: '/record-actions/[id]', params: { id: item.id } })
              }
            >
              <View style={[styles.avatar, { backgroundColor: theme.avatarBg }]}>
                <MaterialCommunityIcons name="cow" size={28} color={theme.avatarIcon} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.name, { color: theme.text }]}>{item.name}</Text>
                <Text style={[styles.sub, { color: theme.textSecondary }]}>
                  {item.breed} · {item.weight}
                </Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={22} color={theme.textSecondary} />
            </Pressable>
          )}
        />
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginTop: 16 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    marginBottom: 12,
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: { fontWeight: 'bold', fontSize: 15 },
  sub: { fontSize: 13, marginTop: 2 },
});