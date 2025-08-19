'use client';

import type { ReactNode } from 'react';
import type { ThemeProviderProps as NextThemesProviderProps } from 'next-themes';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import type { HeroUIProviderProps } from '@heroui/react';
import { HeroUIProvider, ToastProvider } from '@heroui/react';

export interface ThemeProviderProps extends HeroUIProviderProps {
  locale?: string;
  children: ReactNode;
  themeProps?: NextThemesProviderProps;
}

export function ThemeProvider({
  children,
  themeProps,
  locale,
  navigate,
}: ThemeProviderProps) {
  return (
    <HeroUIProvider
      validationBehavior="aria"
      navigate={navigate}
      locale={locale}
    >
      <NextThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={false}
        disableTransitionOnChange
        {...themeProps}
      >
        <ToastProvider placement="bottom-right" />
        {children}
      </NextThemeProvider>
    </HeroUIProvider>
  );
}
