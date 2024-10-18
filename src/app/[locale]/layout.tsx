import { type PropsWithChildren } from 'react';
import { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
import { AuthModal } from '@/components/Auth';
import { Providers } from '@/components/Providers/Providers';
import { ScrollTop } from '@/components/ScrollTop';
import { siteMetadata } from '@/data/siteMetadata';
import { locales } from '@/navigation';
import { Toaster } from '@/ui/toaster';
import { cn } from '@/utils/cn';
import '../globals.css';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: './',
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: './',
    types: {
      'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: siteMetadata.title,
    card: 'summary_large_image',
    images: [siteMetadata.socialBanner],
  },
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: PropsWithChildren<PageProps>) {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as never)) notFound();

  // https://next-intl-docs.vercel.app/blog/next-intl-3-0#static-rendering-of-server-components
  unstable_setRequestLocale(locale);

  // Receive messages provided in `i18n.ts`
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body className={cn(`${fontSans.className}`)}>
        {/* FIXM: we can put NextIntlClientProvider into Where client internationalization is required, Extract minimized messages from server-side (getMessages) */}
        <Providers>
          <NextIntlClientProvider messages={messages} locale={locale}>
            {children}
            <Toaster />
            <AuthModal />
            <ScrollTop />
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
