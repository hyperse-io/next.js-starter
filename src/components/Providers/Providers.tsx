'use client';

import { ProgressBar } from '../Progressbar';
import { ThemeProvider, type ThemeProviderProps } from './ThemeProvider';

export function Providers({
  children,
  locale,
  navigate,
  themeProps,
}: ThemeProviderProps) {
  return (
    <ThemeProvider locale={locale} navigate={navigate} themeProps={themeProps}>
      <ProgressBar>{children}</ProgressBar>
    </ThemeProvider>
  );
}
