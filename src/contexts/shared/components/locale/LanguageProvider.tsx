import React, { useEffect } from 'react';
import { useParams, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AVAILABLE_LANGUAGES } from '@/i18n/languages';

interface LanguageProviderProps {
  children?: React.ReactNode;
  canUseParams?: boolean;
}

const LanguageProvider: React.FC<LanguageProviderProps> = ({ children, canUseParams = false }) => {
  const params = useParams<{ lang?: string }>();
  const { i18n } = useTranslation();

  useEffect(() => {
    const validLanguages = AVAILABLE_LANGUAGES.map(({ code }) => code);
    if (canUseParams && params.lang) {
      if (validLanguages.includes(params.lang)) {
        i18n.changeLanguage(params.lang);
      } else {
        i18n.changeLanguage('en');
      }
    } else {
      i18n.changeLanguage('en');
    }
  }, [params.lang, i18n, canUseParams]);

  return <>{children || <Outlet />}</>;
};

export default LanguageProvider;
