import type { PropsWithChildren } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { LayoutMain } from '@/layout/LayoutMain';

export default async function Layout({
  children,
  params,
}: PropsWithChildren<PageProps>) {
  const { locale } = await params;
  // Enable static rendering
  setRequestLocale(locale);

  return (
    <LayoutMain footerLinks={[]} collections={[]}>
      {children}
    </LayoutMain>
  );
}
