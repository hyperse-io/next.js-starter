// Use type safe message keys with `next-intl`
// import type { routing } from '@/i18n/routing';
import type en from '../../messages/en.json';

declare module 'next-intl' {
  interface AppConfig {
    Messages: typeof en;
    Formats: typeof formats;
    // Locale: (typeof routing.locales)[number];
  }
}
