import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAccessibility } from '@/context/AccessibilityContext';

const highContrastOverrides = {
  light: { text: '#000000', background: '#FFFFFF', textSecondary: '#000000' },
  dark: { text: '#FFFFFF', background: '#000000', textSecondary: '#FFFFFF' },
};

export function useTheme() {
  const scheme = useColorScheme();
  const theme = scheme === 'unspecified' ? 'light' : scheme;
  const { highContrast } = useAccessibility();

  const base = Colors[theme];
  return highContrast ? { ...base, ...highContrastOverrides[theme] } : base;
}