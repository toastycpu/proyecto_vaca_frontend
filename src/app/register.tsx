import { useState } from 'react';
import {
  TextInput, Pressable, StyleSheet, Text,
  ScrollView, KeyboardAvoidingView, Platform, Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useLanguage } from '@/i18n/LanguageContext';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  const handleRegister = () => {
    if (password !== confirmPassword) {
      Alert.alert(
        language === 'en' ? 'Passwords do not match' : 'Las contraseñas no coinciden'
      );
      return;
    }
    // TODO: hook up real registration later
    console.log('Register pressed', { email, password });
    router.replace('/');
  };

  return (
    <ThemedView style={styles.mainContainer}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >
            <Pressable style={styles.langToggle} onPress={toggleLanguage}>
              <ThemedText type="small" style={styles.langToggleText}>
                {language === 'en' ? 'ES' : 'EN'}
              </ThemedText>
            </Pressable>

            <ThemedView style={styles.container}>
              <Text style={styles.title}>
                {t('appTitle')}
              </Text>
              <ThemedText type="small" style={styles.subtitle}>
                {t('createAccount')}
              </ThemedText>

              <TextInput
                placeholder={t('email')}
                placeholderTextColor="#888888"
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                autoCapitalize="none"
              />

              <TextInput
                placeholder={t('password')}
                placeholderTextColor="#888888"
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                secureTextEntry
              />

              <TextInput
                placeholder={t('confirmPassword')}
                placeholderTextColor="#888888"
                style={styles.input}
                onChangeText={setConfirmPassword}
                value={confirmPassword}
                secureTextEntry
              />

              <Pressable style={styles.button} onPress={handleRegister}>
                <ThemedText style={styles.buttonText}>{t('register')}</ThemedText>
              </Pressable>

              <Pressable onPress={() => router.replace('/')}>
                <ThemedText style={styles.linkText}>{t('alreadyHaveAccount')}</ThemedText>
              </Pressable>
            </ThemedView>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1 },
  safeArea: { flex: 1 },
  scrollContainer: { flexGrow: 1, justifyContent: 'center' },
  container: { padding: Spacing.four, width: '100%' },
  title: {
    color: '#C9BE9C',
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    letterSpacing: 3,
  },
  subtitle: { textAlign: 'center', marginBottom: Spacing.four },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#dddddd',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    color: '#000',
  },
  button: {
    backgroundColor: '#C9BE9C',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  linkText: {
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 15,
    fontSize: 20,
  },
  langToggle: {
    alignSelf: 'flex-end',
    padding: Spacing.two,
    marginRight: Spacing.two,
    marginTop: Spacing.two,
  },
  langToggleText: {
    fontWeight: 'bold',
  },
});