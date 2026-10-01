import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/hooks/use-theme';
import { useLanguage } from '@/i18n/LanguageContext';

type Message = { id: string; from: 'user' | 'ai'; text: string };

export default function VaqueroAiScreen() {
  const { t } = useLanguage();
  const theme = useTheme();

  const [messages, setMessages] = useState<Message[]>([
    { id: 'greeting', from: 'ai', text: t('vaqueroGreeting') },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), from: 'user', text: input.trim() };
    const aiReply: Message = { id: Date.now().toString() + '-ai', from: 'ai', text: t('vaqueroComingSoon') };

    setMessages((prev) => [...prev, userMessage, aiReply]);
    setInput('');
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.header}>
            <MaterialCommunityIcons name="cow" size={28} color={theme.title} />
            <Text style={[styles.headerTitle, { color: theme.title }]}>{t('vaqueroTab')}</Text>
          </View>

          <ScrollView contentContainerStyle={styles.chatArea}>
            {messages.map((msg) => (
              <View
                key={msg.id}
                style={[
                  styles.bubble,
                  msg.from === 'ai' ? styles.bubbleAi : styles.bubbleUser,
                  {
                    backgroundColor: msg.from === 'ai' ? theme.card : theme.accent,
                    borderColor: theme.cardBorder,
                  },
                ]}
              >
                <Text style={{ color: msg.from === 'ai' ? theme.text : theme.buttonText }}>
                  {msg.text}
                </Text>
              </View>
            ))}
          </ScrollView>

          <View style={[styles.inputRow, { borderTopColor: theme.cardBorder }]}>
            <TextInput
              placeholder={t('askVaquero')}
              placeholderTextColor={theme.textSecondary}
              style={[styles.input, { backgroundColor: theme.card, borderColor: theme.cardBorder, color: theme.text }]}
              value={input}
              onChangeText={setInput}
              onSubmitEditing={handleSend}
              returnKeyType="send"
            />
            <Pressable style={[styles.sendButton, { backgroundColor: theme.accent }]} onPress={handleSend}>
              <Ionicons name="send" size={18} color={theme.buttonText} />
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 16 },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  chatArea: { flexGrow: 1, padding: 16, justifyContent: 'flex-end', gap: 8 },
  bubble: { borderRadius: 14, borderWidth: 1, padding: 14, maxWidth: '85%' },
  bubbleAi: { alignSelf: 'flex-start' },
  bubbleUser: { alignSelf: 'flex-end' },
  inputRow: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    padding: 12, borderTopWidth: 1,
  },
  input: { flex: 1, borderRadius: 10, borderWidth: 1, padding: 12 },
  sendButton: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
});