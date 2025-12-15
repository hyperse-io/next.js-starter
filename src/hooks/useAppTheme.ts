'use client';

import { useTheme } from 'next-themes';
import { useMounted } from './useMounted';

export const useAppTheme = () => {
  const mounted = useMounted();
  const { theme, setTheme, systemTheme } = useTheme();

  const currentTheme = theme === 'system' ? systemTheme : theme;

  return {
    mounted,
    setTheme,
    currentTheme,
  };
};
