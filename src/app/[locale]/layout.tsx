import { type PropsWithChildren } from 'react';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { ProviderWrapper } from '@/components/ProviderWrapper';
import { defaultDomain } from '@/config/region';
import { routing } from '@/i18n/routing';
import { fonts } from '@/theme/fonts';
import { cn } from '@heroui/react';

export default async function LocaleLayout({
  children,
  params,
}: PropsWithChildren<PageProps>) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const domainLocale = (routing.domains || []).find(
    (d) => d.defaultLocale === locale
  );

  const domainName = domainLocale ? domainLocale.domain : defaultDomain;
  const domain = `https://${domainName.replace(/(?:https|http)?:\/\//, '')}`;

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body
        className={cn(
          'text-foreground bg-background min-h-screen font-sans antialiased',
          fonts.sans.variable,
          fonts.mono.variable
        )}
      >
        <NextIntlClientProvider>
          <ProviderWrapper locale={locale} domain={domain}>
            {children}
          </ProviderWrapper>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
