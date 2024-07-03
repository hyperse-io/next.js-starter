'use client';

import { useTheme } from 'next-themes';
import {
  createTheme,
  darken,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme = 'dark' } = useTheme();

  const muiTheme = createTheme({
    palette: {
      mode: theme === 'light' ? 'light' : 'dark',
      primary: {
        light: '#757ce8',
        main: '#28727e',
        dark: darken('#28727e', 0.1),
        contrastText: '#fff',
      },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor:
              theme === 'light'
                ? '#fff'
                : 'rgb(15 23 42 / var(--tw-bg-opacity))',
          },
        },
      },
    },
  });
  return <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>;
}
