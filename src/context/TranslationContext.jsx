import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const LANGUAGE_KEY = 'app_language';
const SUPPORTED_LANGUAGES = ['en', 'hi'];
const FALLBACK_TRANSLATIONS = {
  en: {
    topbarTitle: 'Littera Quiz Platform',
    languageSelect: 'Select language',
    languageOptions: 'Language options',
    english: 'English',
    hindi: 'Hindi',
  },
  hi: {
    topbarTitle: 'लिटेरा क्विज प्लेटफॉर्म',
    languageSelect: 'भाषा चुनें',
    languageOptions: 'भाषा विकल्प',
    english: 'अंग्रेजी',
    hindi: 'हिंदी',
  },
};

const TranslationContext = createContext(null);

export function TranslationProvider({ children }) {
  const [language, setLanguage] = useState('en');
  const [translations, setTranslations] = useState(FALLBACK_TRANSLATIONS);

  useEffect(() => {
    let isMounted = true;
    
    //for development 
    // const baseUrl = import.meta?.env?.BASE_URL || '/';

    //for production (Build)
    const baseUrl = import.meta?.env?.BASE_URL || '/quiz/';

    const loadTranslations = async () => {
      try {
        const [enResponse, hiResponse] = await Promise.all([
          fetch(`${baseUrl}en.json`),
          fetch(`${baseUrl}hi.json`),
        ]);

        if (!enResponse.ok || !hiResponse.ok) {
          throw new Error('Translation files failed to load');
        }

        const [enData, hiData] = await Promise.all([
          enResponse.json(),
          hiResponse.json(),
        ]);

        if (isMounted) {
          setTranslations({
            en: enData,
            hi: hiData,
          });
        }
      } catch (error) {
        console.error('Failed to load translation files:', error);
      }
    };

    loadTranslations();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem(LANGUAGE_KEY);
    if (saved && SUPPORTED_LANGUAGES.includes(saved)) {
      setLanguage(saved);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LANGUAGE_KEY, language);
  }, [language]);

  const value = useMemo(() => {
    const t = (key, valuesOrFallback) => {
      let text = translations[language]?.[key] || translations.en?.[key] || (typeof valuesOrFallback === 'string' ? valuesOrFallback : key);

      if (valuesOrFallback && typeof valuesOrFallback === 'object') {
        Object.entries(valuesOrFallback).forEach(([name, value]) => {
          text = text.replaceAll(`{${name}}`, value);
        });
      }

      return text;
    };
    return { language, setLanguage, t };
  }, [language, translations]);

  return <TranslationContext.Provider value={value}>{children}</TranslationContext.Provider>;
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within TranslationProvider');
  }
  return context;
}
