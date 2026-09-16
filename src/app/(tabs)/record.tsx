import { useState } from 'react';
import { View, Text, Pressable, TextInput, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { useLanguage } from '@/i18n/LanguageContext';

type IdMethod = 'number' | 'list' | 'qr';

export default function RecordIdentifyScreen() {
  const { t } = useLanguage();
  const theme = useTheme();
  const [method, setMethod] = useState<IdMethod>('number');
  const [tagInput, setTagInput] = useState('');

  const handleConfirm = () => {
    if (!tagInput) return;
    router.push({ pathname: '/record-actions/[id]', params: { id: tagInput } });
  };

  const handleNumpadPress = (digit: string) => {
    if (digit === 'del') {
      setTagInput((prev) => prev.slice(0, -1));
    } else {
      setTagInput((prev) => prev + digit);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={[styles.title, { color: theme.title }]}>{t('whatAnimal')}</Text>

          <ThemedText themeColor="textSecondary" style={styles.label}>
            {t('identifyBy')}
          </ThemedText>

          <View style={styles.methodRow}>
            <MethodButton
              icon={<Ionicons name="keypad" size={20} color={method === 'number' ? theme.buttonText : theme.text} />}
              label={t('tagNumber')}
              active={method === 'number'}
              onPress={() => setMethod('number')}
              theme={theme}
            />
            <MethodButton
              icon={<Ionicons name="list" size={20} color={method === 'list' ? theme.buttonText : theme.text} />}
              label={t('animalList')}
              active={method === 'list'}
              onPress={() => router.push('/catalog-lookup')}
              theme={theme}
            />
            <MethodButton
              icon={<MaterialCommunityIcons name="qrcode-scan" size={20} color={method === 'qr' ? theme.buttonText : theme.text} />}
              label={t('qrCode')}
              active={method === 'qr'}
              onPress={() => router.push({ pathname: '/camera', params: { mode: 'scan', returnTo: 'record' } })}
              theme={theme}
            />
          </View>

          {method === 'number' && (
            <>
              <View style={[styles.tagDisplay, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
                <Text style={[styles.tagText, { color: theme.text }]}>
                  {tagInput || t('enterTagNumber')}
                </Text>
              </View>

              <View style={styles.numpad}>
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'del', '0', 'ok'].map((key) => (
                  <Pressable
                    key={key}
                    style={[styles.numpadKey, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}
                    onPress={() => (key === 'ok' ? handleConfirm() : handleNumpadPress(key))}
                  >
                    {key === 'del' ? (
                      <Ionicons name="backspace" size={22} color={theme.text} />
                    ) : key === 'ok' ? (
                      <Ionicons name="checkmark-circle" size={26} color={theme.title} />
                    ) : (
                      <Text style={[styles.numpadText, { color: theme.text }]}>{key}</Text>
                    )}
                  </Pressable>
                ))}
              </View>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

function MethodButton({ icon, label, active, onPress, theme }: any) {
  return (
    <Pressable
      style={[
        styles.methodButton,
        { backgroundColor: active ? theme.accent : theme.card, borderColor: theme.cardBorder },
      ]}
      onPress={onPress}
    >
      {icon}
      <Text style={[styles.methodLabel, { color: active ? theme.buttonText : theme.text }]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: { padding: 20 },
  title: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  label: { fontSize: 13, marginBottom: 8 },
  methodRow: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  methodButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: 12,
  },
  methodLabel: { fontSize: 11, fontWeight: 'bold', textAlign: 'center' },
  tagDisplay: {
    borderRadius: 10,
    borderWidth: 1,
    padding: 20,
    alignItems: 'center',
    marginBottom: 50,
  },
  tagText: { fontSize: 28, fontWeight: 'bold' },
  numpad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
  },
  numpadKey: {
    width: '30%',
    aspectRatio: 1.6,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  numpadText: { fontSize: 22, fontWeight: 'bold' },
});