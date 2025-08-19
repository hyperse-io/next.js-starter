import { heroui } from '@heroui/react';

// hero.ts
const hero = heroui({
  // this has a bug while using prefix
  addCommonColors: false, // override common colors (e.g. "blue", "green", "pink").
  defaultTheme: 'light', // default theme from the themes object
  defaultExtendTheme: 'light', // default theme to extend on custom themes
  layout: {}, // common layout tokens (applied to all themes)
  themes: {
    light: {
      layout: {}, // light theme layout tokens
      colors: {}, // light theme colors
    },
    dark: {
      layout: {}, // dark theme layout tokens
      colors: {},
    },
    // ... custom themes
  },
});

export default hero as ReturnType<typeof heroui>['config'];
