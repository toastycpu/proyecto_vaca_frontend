import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/hooks/use-theme';
import { useLanguage } from '@/i18n/LanguageContext';

const PREVIOUS_WEIGHT = 382.0; // placeholder — replace with real lookup later

export default function WeightFormScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useLanguage();
  const theme = useTheme();
  const [weight, setWeight] = useState('');

  const numericWeight = parseFloat(weight.replace(',', '.')) || 0;
  const gain = numericWeight - PREVIOUS_WEIGHT;

  const handleNumpadPress = (digit: string) => {
    if (digit === 'del') {
      setWeight((prev) => prev.slice(0, -1));
    } else {
      setWeight((prev) => prev + digit);
    }
  };

  const handleSave = () => {
    // TODO: write to local offline store, queue for sync
    console.log('Saved weight for animal', id, numericWeight);
    router.push('/(tabs)/record'); // returns to identify screen, ready for next animal
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={{ flex: 1, padding: 20 }}>
        <Text style={[styles.title, { color: theme.title }]}>{t('weight')} · #{id}</Text>

        <View style={[styles.display, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
          <Text style={[styles.displayText, { color: theme.text }]}>{weight || '0'} kg</Text>
        </View>

        <Text style={[styles.meta, { color: theme.textSecondary }]}>
          {t('previous')}: {PREVIOUS_WEIGHT.toFixed(1)} kg
        </Text>
        {numericWeight > 0 && (
          <Text style={[styles.meta, { color: gain >= 0 ? theme.accent : theme.warning }]}>
            {t('gain')}: {gain >= 0 ? '+' : ''}{gain.toFixed(1)} kg
          </Text>
        )}

        <View style={styles.numpad}>
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', ',', '0', 'del'].map((key) => (
            <Pressable
              key={key}
              style={[styles.numpadKey, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}
              onPress={() => handleNumpadPress(key)}
            >
              {key === 'del' ? (
                <Ionicons name="backspace" size={20} color={theme.text} />
              ) : (
                <Text style={[styles.numpadText, { color: theme.text }]}>{key}</Text>
              )}
            </Pressable>
          ))}
        </View>

        <Pressable style={[styles.saveButton, { backgroundColor: theme.accent }]} onPress={handleSave}>
          <Text style={[styles.saveText, { color: theme.buttonText }]}>{t('save')}</Text>
        </Pressable>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 16 },
  display: {
    borderRadius: 10,
    borderWidth: 1,
    padding: 24,
    alignItems: 'center',
    marginBottom: 8,
  },
  displayText: { fontSize: 32, fontWeight: 'bold' },
  meta: { fontSize: 14, textAlign: 'center', marginBottom: 4 },
  numpad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  numpadKey: {
    width: '30%',
    aspectRatio: 1.6,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numpadText: { fontSize: 20, fontWeight: 'bold' },
  saveButton: { borderRadius: 10, padding: 16, alignItems: 'center' },
  saveText: { fontWeight: 'bold', fontSize: 16 },
});