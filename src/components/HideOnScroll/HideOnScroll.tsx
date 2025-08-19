'use client';

import { type FC, type ReactElement, useEffect } from 'react';
import { useScrollTrigger } from '@/hooks/useScrollTrigger';

type HideOnScrollProps = {
  /**
   * The children to be hidden automatically with `Slide`
   */
  children: ReactElement;
  /**
   * If providered, the `Slide` will keep its `in` state, it not it will automatically `Slide` down
   * @param trigger
   * @returns
   */
  onScrollTrigger: (trigger: boolean) => void;
};

export const HideOnScroll: FC<HideOnScrollProps> = ({
  children,
  onScrollTrigger,
}) => {
  const trigger = useScrollTrigger({});

  useEffect(() => {
    onScrollTrigger?.(trigger);
  }, [onScrollTrigger, trigger]);

  return <>{children}</>;
};
