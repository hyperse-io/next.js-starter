'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export const useAppTheme = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();

  const currentTheme = theme === 'system' ? systemTheme : theme;

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  return {
    mounted,
    setTheme,
    currentTheme,
  };
};
