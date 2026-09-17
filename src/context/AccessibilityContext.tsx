import { createContext, useContext, useState, ReactNode } from 'react';

export type FontScale = 'normal' | 'large' | 'xlarge';

type AccessibilityContextType = {
  fontScale: FontScale;
  setFontScale: (scale: FontScale) => void;
  highContrast: boolean;
  setHighContrast: (value: boolean) => void;
  readingAssist: boolean; // extra line height + letter spacing
  setReadingAssist: (value: boolean) => void;
  largeButtons: boolean; // stored now, not yet wired into every screen
  setLargeButtons: (value: boolean) => void;
  fontScaleMultiplier: number;
};

const scaleMultipliers: Record<FontScale, number> = {
  normal: 1,
  large: 1.15,
  xlarge: 1.3,
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [fontScale, setFontScale] = useState<FontScale>('normal');
  const [highContrast, setHighContrast] = useState(false);
  const [readingAssist, setReadingAssist] = useState(false);
  const [largeButtons, setLargeButtons] = useState(false);

  return (
    <AccessibilityContext.Provider
      value={{
        fontScale,
        setFontScale,
        highContrast,
        setHighContrast,
        readingAssist,
        setReadingAssist,
        largeButtons,
        setLargeButtons,
        fontScaleMultiplier: scaleMultipliers[fontScale],
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}