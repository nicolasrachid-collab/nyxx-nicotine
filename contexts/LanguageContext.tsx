import { createContext, useState, useMemo, useEffect, type ReactNode } from 'react';
import type { Language, TranslationKey } from '../types';
import { translations } from '../i18n/translations';

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof TranslationKey) => string;
}

export const LanguageContext = createContext<LanguageContextValue>({
  language: 'pt',
  setLanguage: () => {},
  t: () => '',
});

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Carregar idioma salvo do localStorage ou usar padrão
    if (typeof window === 'undefined') return 'pt';
    const saved = localStorage.getItem('language') as Language;
    return saved && ['pt', 'en', 'es'].includes(saved) ? saved : 'pt';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
  };

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: (key: keyof TranslationKey) => translations[language]?.[key] || key,
    }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
