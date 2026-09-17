import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { useLanguage } from '@/i18n/LanguageContext';
import { useAccessibility, FontScale } from '@/context/AccessibilityContext';

export default function SettingsScreen() {
  const { t, language, setLanguage } = useLanguage();
  const theme = useTheme();
  const {
    fontScale, setFontScale,
    highContrast, setHighContrast,
    readingAssist, setReadingAssist,
    largeButtons, setLargeButtons,
  } = useAccessibility();

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: 20 }}>
          <ThemedText type="subtitle" themeColor="title" style={styles.pageTitle}>
            {t('settingsTab')}
          </ThemedText>

          {/* Language */}
          <Section title={t('language')} theme={theme}>
            <View style={styles.row}>
              <SegmentButton label="Español" active={language === 'es'} onPress={() => setLanguage('es')} theme={theme} />
              <SegmentButton label="English" active={language === 'en'} onPress={() => setLanguage('en')} theme={theme} />
            </View>
          </Section>

          {/* Font size */}
          <Section title={t('fontSize')} theme={theme}>
            <View style={styles.row}>
              {(['normal', 'large', 'xlarge'] as FontScale[]).map((scale) => (
                <SegmentButton
                  key={scale}
                  label={t(scale === 'normal' ? 'fontNormal' : scale === 'large' ? 'fontLarge' : 'fontXLarge')}
                  active={fontScale === scale}
                  onPress={() => setFontScale(scale)}
                  theme={theme}
                />
              ))}
            </View>
          </Section>

          {/* Toggles */}
          <ToggleRow label={t('highContrast')} value={highContrast} onChange={setHighContrast} theme={theme} />
          <ToggleRow label={t('readingAssist')} value={readingAssist} onChange={setReadingAssist} theme={theme} />
          <ToggleRow label={t('largeButtons')} value={largeButtons} onChange={setLargeButtons} theme={theme} />
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

function Section({ title, children, theme }: any) {
  return (
    <View style={styles.section}>
      <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionTitle}>
        {title}
      </ThemedText>
      {children}
    </View>
  );
}

function SegmentButton({ label, active, onPress, theme }: any) {
  return (
    <Pressable
      style={[
        styles.segment,
        { backgroundColor: active ? theme.accent : theme.card, borderColor: theme.cardBorder },
      ]}
      onPress={onPress}
    >
      <Text style={{ color: active ? theme.buttonText : theme.text, fontWeight: 'bold' }}>{label}</Text>
    </Pressable>
  );
}

function ToggleRow({ label, value, onChange, theme }: any) {
  return (
    <Pressable
      style={[styles.toggleRow, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}
      onPress={() => onChange(!value)}
    >
      <Text style={{ color: theme.text, fontSize: 15 }}>{label}</Text>
      <View style={[styles.checkbox, { borderColor: theme.cardBorder, backgroundColor: value ? theme.accent : 'transparent' }]}>
        {value && <Ionicons name="checkmark" size={16} color={theme.buttonText} />}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  pageTitle: { textAlign: 'center', marginBottom: 20 },
  section: { marginBottom: 20 },
  sectionTitle: { marginBottom: 8, textTransform: 'uppercase' },
  row: { flexDirection: 'row', gap: 8 },
  segment: { flex: 1, borderRadius: 10, borderWidth: 1, padding: 12, alignItems: 'center' },
  toggleRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    borderRadius: 10, borderWidth: 1, padding: 14, marginBottom: 10,
  },
  checkbox: {
    width: 24, height: 24, borderRadius: 6, borderWidth: 1.5,
    alignItems: 'center', justifyContent: 'center',
  },
});