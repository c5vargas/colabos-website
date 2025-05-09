import React from 'react';
import { type LinkProps, Link, useParams } from 'react-router-dom'; 
import { useTranslation } from 'react-i18next';

export const LocalizedLink: React.FC<LinkProps> = ({ to, children, ...props }) => {
  const { lang } = useParams<{ lang?: string }>();
  const { i18n } = useTranslation();

  const currentLang = lang || i18n.language;

  const toStr = typeof to === 'string' ? to : to.pathname || '';

  let processedPath = toStr;

  const langPrefixRegex = /^\/([a-z]{2})(\/|$)/;
  const match = processedPath.match(langPrefixRegex);

  if (match) {
    processedPath = processedPath.replace(langPrefixRegex, '/');
    if (processedPath === '') processedPath = '/';
  }

  if (currentLang !== 'en') {
    if (processedPath === '/') {
      processedPath = `/${currentLang}`;
    } else {
      processedPath = `/${currentLang}${processedPath.startsWith('/') ? processedPath : `/${processedPath}`}`;
    }
  }

  const newTo = typeof to === 'string'
    ? processedPath
    : { ...to, pathname: processedPath };

  return <Link to={newTo} {...props}>{children}</Link>;
};

export default LocalizedLink;