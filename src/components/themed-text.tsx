import { Platform, StyleSheet, Text, type TextProps } from 'react-native';

import { Fonts, ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useScaledText } from '@/components/app-text';

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'small' | 'smallBold' | 'subtitle' | 'link' | 'linkPrimary' | 'code';
  themeColor?: ThemeColor;
};

export function ThemedText({ style, type = 'default', themeColor, ...rest }: ThemedTextProps) {
  const theme = useTheme();

  const merged = [
    { color: theme[themeColor ?? 'text'] },
    type === 'default' && styles.default,
    type === 'title' && styles.title,
    type === 'small' && styles.small,
    type === 'smallBold' && styles.smallBold,
    type === 'subtitle' && styles.subtitle,
    type === 'link' && styles.link,
    type === 'linkPrimary' && styles.linkPrimary,
    type === 'code' && styles.code,
    style,
  ];
  const scaled = useScaledText(merged, 16);

  return (
    <Text
      allowFontScaling={false}
      adjustsFontSizeToFit={rest.numberOfLines === 1}
      minimumFontScale={0.5}
      style={[merged, scaled]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  small: { fontSize: 14, lineHeight: 20, fontWeight: 500 },
  smallBold: { fontSize: 14, lineHeight: 20, fontWeight: 700 },
  default: { fontSize: 16, lineHeight: 24, fontWeight: 500 },
  title: { fontSize: 48, fontWeight: 600, lineHeight: 52 },
  subtitle: { fontSize: 32, lineHeight: 44, fontWeight: 600 },
  link: { lineHeight: 30, fontSize: 14 },
  linkPrimary: { lineHeight: 30, fontSize: 14, color: '#3c87f7' },
  code: {
    fontFamily: Fonts.mono,
    fontWeight: Platform.select({ android: 700 }) ?? 500,
    fontSize: 12,
  },
});