import { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';
import type { TranslationKey } from '../types';

export function useTranslation() {
  const context = useContext(LanguageContext);
  
  // Wrapper para manter compatibilidade com código que usa string como key
  return {
    ...context,
    t: (key: keyof TranslationKey | string) => {
      return context.t(key as keyof TranslationKey);
    },
  };
}
