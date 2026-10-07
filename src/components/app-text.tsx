import {
  StyleProp, StyleSheet, Text, TextInput, TextInputProps, TextProps, TextStyle,
} from 'react-native';

import { useAccessibility } from '@/context/AccessibilityContext';

export function useScaledText(style: StyleProp<TextStyle>, defaultSize = 14): TextStyle {
  const { fontScaleMultiplier, readingAssist } = useAccessibility();
  const flat = StyleSheet.flatten(style) ?? {};
  const size = (flat.fontSize ?? defaultSize) * fontScaleMultiplier;

  const scaled: TextStyle = { fontSize: size };
  if (readingAssist) {
    scaled.lineHeight = size * 1.6;
    scaled.letterSpacing = 0.5;
  } else if (flat.lineHeight) {
    scaled.lineHeight = flat.lineHeight * fontScaleMultiplier;
  }
  return scaled;
}

export function AppText({ style, ...rest }: TextProps) {
  const scaled = useScaledText(style);
  return (
    <Text
      allowFontScaling={false}
      adjustsFontSizeToFit={rest.numberOfLines === 1} // single-line titles shrink instead of overflowing
      minimumFontScale={0.5}
      style={[style, scaled]}
      {...rest}
    />
  );
}

export function AppTextInput({ style, ...rest }: TextInputProps) {
  const scaled = useScaledText(style);
  return <TextInput allowFontScaling={false} style={[style, scaled]} {...rest} />;
}