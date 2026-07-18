import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { de, type Dict } from './de';
import { en } from './en';

export type Lang = 'de' | 'en';

const dicts: Record<Lang, Dict> = { de, en };
const STORAGE_KEY = 'pg.lang';

function initialLang(): Lang {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'de' || saved === 'en') return saved;
  return navigator.language.startsWith('de') ? 'de' : 'en';
}

type I18nValue = {
  lang: Lang;
  t: Dict;
  setLang: (l: Lang) => void;
  toggle: () => void;
};

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  const value = useMemo<I18nValue>(() => {
    const setLang = (l: Lang) => {
      localStorage.setItem(STORAGE_KEY, l);
      document.documentElement.lang = l;
      setLangState(l);
    };
    return {
      lang,
      t: dicts[lang],
      setLang,
      toggle: () => setLang(lang === 'de' ? 'en' : 'de'),
    };
  }, [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
