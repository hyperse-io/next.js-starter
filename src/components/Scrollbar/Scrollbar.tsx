'use client';

import type { CSSProperties, FC, PropsWithChildren } from 'react';
import { useTheme } from 'next-themes';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { alpha, styled } from '@mui/material';

type ScrollbarProps = {
  style?: CSSProperties;
  className?: string;
};

export const MyScrollbar: FC<PropsWithChildren<ScrollbarProps>> = ({
  children,
  style,
  className,
}) => {
  const theme = useTheme();
  return (
    <OverlayScrollbarsComponent
      defer
      style={{ maxHeight: '100vh', height: '100%', ...style }}
      options={{
        scrollbars: {
          theme: `os-theme-${theme.theme === 'dark' ? 'light' : 'dark'}`,
        },
      }}
      className={className}
    >
      {children}
    </OverlayScrollbarsComponent>
  );
};

export const Scrollbar = styled(MyScrollbar)<ScrollbarProps>(({ theme }) => {
  const isDark = theme.palette.mode === 'dark';
  const scrollTheme = isDark ? 'light' : 'dark';
  return {
    [`& .os-theme-${scrollTheme}.os-scrollbar-vertical`]: {
      width: '8px',
    },
    [`& .os-theme-${scrollTheme}.os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle`]:
      {
        background: alpha('#357D8A', isDark ? 0.4 : 0.3),
      },
    [`& .os-theme-${scrollTheme}.os-scrollbar:hover > .os-scrollbar-track > .os-scrollbar-handle`]:
      {
        background: alpha('#357D8A', isDark ? 0.7 : 0.5),
      },
  };
});
