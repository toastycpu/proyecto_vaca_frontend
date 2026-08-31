import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '@/i18n/LanguageContext';

export default function TabsLayout() {
  const { t } = useLanguage();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#C9BE9C',
        tabBarInactiveTintColor: '#8A9A94',
        tabBarStyle: {
          backgroundColor: '#0F2A2D',
          borderTopColor: '#1C3F3D',
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: t('homeTab'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t('profileTab'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}