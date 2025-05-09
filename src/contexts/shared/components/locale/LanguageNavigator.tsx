import React from 'react';
import { AVAILABLE_LANGUAGES } from '@/i18n/languages';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

interface LanguageNavigatorProps {
  className?: string;
}

const LanguageNavigator: React.FC<LanguageNavigatorProps> = ({ className }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { i18n } = useTranslation();
  const { lang } = useParams<{ lang?: string }>();

  const languages = [...AVAILABLE_LANGUAGES];

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    let pathWithoutLang = location.pathname;

    if (lang && pathWithoutLang.startsWith(`/${lang}`)) {
      pathWithoutLang = pathWithoutLang.substring(lang.length + 1) || '/';
    }

    let newPath: string;
    if (language === 'en') {
      newPath = pathWithoutLang;
    } else {
      newPath = `/${language}${pathWithoutLang === '/' ? '' : pathWithoutLang}`;
    }

    if (!newPath.startsWith('/')) {
      newPath = '/' + newPath;
    }

    navigate(newPath);
  };

  const currentLanguage = i18n.language || 'en';

  return (
    <div className={className}>
      <select
        value={currentLanguage}
        onChange={(e) => changeLanguage(e.target.value)}
        className="bg-white border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {languages.map((language) => (
          <option key={language.code} value={language.code}>
            {language.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageNavigator;