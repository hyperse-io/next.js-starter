import { type Breakpoint, useMediaQuery, useTheme } from '@mui/material';

export const useBreakPoints = (breakKey: Breakpoint): boolean => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.up(breakKey));
};
