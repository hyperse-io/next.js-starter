'use client';

import { type ReactNode } from 'react';
import { ReCaptchaProvider } from 'next-recaptcha-v3';
import { useIntlRouter, usePathname } from '@/i18n/routing';
import { GlobalConfigProvider } from '../GlobalConfigProvider';
import { Providers } from '../Providers/Providers';
import { Apollo } from './ApolloClient';

type ProviderWrapperProps = {
  locale: string;
  domain: string;
  children: ReactNode;
};

export function ProviderWrapper(props: ProviderWrapperProps) {
  const { children, locale, domain } = props;
  const router = useIntlRouter();
  const pathname = usePathname();
  const disableCaptcha = pathname.includes('/next-payment');
  return (
    <Providers navigate={router.push}>
      <Apollo>
        <GlobalConfigProvider locale={locale} domain={domain} globals={{}}>
          <>
            {!disableCaptcha && (
              <ReCaptchaProvider
                useEnterprise
                reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                language="en"
              >
                {children}
              </ReCaptchaProvider>
            )}
            {disableCaptcha && children}
          </>
        </GlobalConfigProvider>
      </Apollo>
    </Providers>
  );
}
