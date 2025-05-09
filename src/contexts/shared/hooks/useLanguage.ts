import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AVAILABLE_LANGUAGES } from '@/i18n/languages';

export const useLanguage = () => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('user-language');
    if (savedLanguage) {
      changeLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = async (langCode: string) => {
    try {
      if (i18n.language === langCode) {
        return;
      }

      await i18n.changeLanguage(langCode);
      setCurrentLanguage(langCode);
      localStorage.setItem('user-language', langCode);
    } catch (error) {
      console.error('Error al cambiar el idioma:', error);
    }
  };

  return {
    currentLanguage,
    availableLanguages: AVAILABLE_LANGUAGES,
    changeLanguage,
  };
};
