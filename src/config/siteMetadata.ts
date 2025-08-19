const i18nMetadata = {
  en: {
    title: `Vercel | vercel.com`,
  },
  de: {
    title: `Vercel | vercel.de`,
  },
};

export const getDomainUrl = (locale = 'en', path: string) => {
  const domainBase =
    locale === 'en' ? 'https://www.vercel.com' : 'https://www.vercel.com';
  return `${domainBase}${path}`;
};

export const siteMetadata = (locale = 'en') => {
  return {
    ...i18nMetadata[locale as keyof typeof i18nMetadata],
    title: 'Vercel',
    description: 'Vercel',
    socialBanner: getDomainUrl(locale, '/static/images/twitter-card.png'),
    siteUrl: getDomainUrl(locale, ''),
  };
};
