import { type PropsWithChildren } from 'react';
import { PublicEnvProvider } from 'next-runtime-env';

export default async function LocaleLayout({
  children,
}: PropsWithChildren<PageProps>) {
  return <PublicEnvProvider>{children}</PublicEnvProvider>;
}
