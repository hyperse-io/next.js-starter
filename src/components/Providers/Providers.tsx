import { type ReactNode } from 'react';
import { ReCaptchaProvider } from 'next-recaptcha-v3';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { Provider } from 'jotai';
import { Apollo } from './ApolloClient';
import { ThemeProvider } from './ThemeProvider';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider>
      <Apollo>
        <NextThemesProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <ThemeProvider>
            <ReCaptchaProvider
              useEnterprise
              reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
              language="en"
            >
              {children}
            </ReCaptchaProvider>
          </ThemeProvider>
        </NextThemesProvider>
      </Apollo>
    </Provider>
  );
}
