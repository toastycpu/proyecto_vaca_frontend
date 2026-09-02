/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#1C3F3D',
    textSecondary: '#60646C',
    background: '#F5F5F0',
    backgroundElement: '#FFFFFF',
    backgroundSelected: '#E0E1E6',
    card: '#FFFFFF',
    cardBorder: '#E0E1E6',
    title: '#4A7340',
    accent: '#4A7340',
    buttonText: '#FFFFFF',
    avatarBg: '#4A7340',
    avatarIcon: '#FFFFFF',
    warning: '#B8860B',
  },
  dark: {
    text: '#D9E2C6',
    textSecondary: '#8A9A94',
    background: '#0F2A2D',
    backgroundElement: '#102830',
    backgroundSelected: '#1C3F3D',
    card: '#102830',
    cardBorder: '#1C3F3D',
    title: '#C9BE9C',
    accent: '#4A7340',
    buttonText: '#D9E2C6',
    avatarBg: '#C9BE9C',
    avatarIcon: '#0F2A2D',
    warning: '#E0B23C',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
