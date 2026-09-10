import { View, Text, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/hooks/use-theme';
import { useLanguage } from '@/i18n/LanguageContext';

const actions = [
  { key: 'weight', icon: 'scale-bathroom', lib: 'material', route: 'weight' },
  { key: 'vaccine', icon: 'medkit', lib: 'ionicons', route: 'vaccine' },
  { key: 'birth', icon: 'egg', lib: 'material', route: 'birth' },
  { key: 'move', icon: 'exit', lib: 'ionicons', route: 'move' },
  { key: 'photo', icon: 'camera', lib: 'ionicons', route: 'photo' },
  { key: 'sale', icon: 'cash', lib: 'ionicons', route: 'sale' },
] as const;

export default function RecordActionsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useLanguage();
  const theme = useTheme();

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={{ flex: 1, padding: 20 }}>
        <Text style={[styles.title, { color: theme.title }]}>#{id}</Text>
        <Text style={[styles.subtitle, { color: theme.text }]}>{t('whatToRecord')}</Text>

        <View style={styles.grid}>
          {actions.map((action) => (
            <Pressable
              key={action.key}
              style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}
              onPress={() => {
                if (action.route === 'weight') {
                    router.push({ pathname: '/record-form/[id]/weight', params: { id } });
                } else if (action.route === 'photo') {
                router.push({ pathname: '/camera', params: { mode: 'photo', animalId: id } });
                } else {
                router.push(`/record-form/${id}/${action.route}` as any);
                }
              }}
            >
              {action.lib === 'material' ? (
                <MaterialCommunityIcons name={action.icon as any} size={32} color={theme.title} />
              ) : (
                <Ionicons name={action.icon as any} size={32} color={theme.title} />
              )}
              <Text style={[styles.cardLabel, { color: theme.text }]}>{t(action.key)}</Text>
            </Pressable>
          ))}
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 4 },
  subtitle: { fontSize: 15, textAlign: 'center', marginBottom: 20 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'space-between' },
  card: {
    width: '47%',
    aspectRatio: 1.3,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 30,
  },
  cardLabel: { fontSize: 14, fontWeight: 'bold' },
});