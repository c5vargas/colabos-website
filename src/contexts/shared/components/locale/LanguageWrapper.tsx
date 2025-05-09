import { AVAILABLE_LANGUAGES } from "@/i18n/languages";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

const LanguageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { lang } = useParams<{ lang: string }>();
  const { i18n } = useTranslation();

  useEffect(() => {
    const validLanguages = AVAILABLE_LANGUAGES.map(({ code }) => code);

    if (lang && validLanguages.includes(lang)) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  return <>{children}</>;
};

export default LanguageWrapper;