'use client';

import type { FC, PropsWithChildren } from 'react';
import { AppProgressProvider } from '@bprogress/next';

type ProgressBarProps = {
  color?: string;
};

export const ProgressBar: FC<PropsWithChildren<ProgressBarProps>> = (props) => {
  const { children, color = 'hsl(var(--heroui-primary) / 1)' } = props;
  return (
    <AppProgressProvider
      height="3px"
      color={color}
      options={{ showSpinner: false }}
      shallowRouting
    >
      {children}
    </AppProgressProvider>
  );
};
