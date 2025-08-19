import type { Metadata } from 'next';
import type { AlternateURLs } from 'next/dist/lib/metadata/types/alternative-urls-types';
import { siteMetadata } from '@/config/siteMetadata';

interface PageSEOProps {
  title: string;
  description?: string;
  image?: string;
  params: { locale: string };
  alternates?: null | AlternateURLs;
  [key: string]: any;
}

export function genPageMetadata({
  title,
  description,
  image,
  params: { locale },
  alternates,
  ...restProps
}: PageSEOProps): Metadata {
  return {
    title,
    description: description || siteMetadata(locale).description,
    openGraph: {
      // https://www.vercel.com/catalog/about
      url: './',
      title: `${title} | ${siteMetadata(locale).title}`,
      description: description || siteMetadata(locale).description,
      siteName: siteMetadata(locale).title,
      images: image ? [image] : [siteMetadata(locale).socialBanner],
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${siteMetadata(locale).title}`,
      site: '@issilo',
      creator: '@issilo',
      images: image ? [image] : [siteMetadata(locale).socialBanner],
    },
    alternates,
    ...restProps,
  };
}
