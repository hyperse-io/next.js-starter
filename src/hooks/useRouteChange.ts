'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { usePrevious } from './usePrevious';

export function useRouteChange(
  onRouteChange: (locationChangeEvent: {
    location: string;
    previousLocation: string | undefined;
  }) => void
): void {
  const location = usePathname();
  const previousLocation = usePrevious(location);

  useEffect(() => {
    if (!previousLocation) {
      return;
    }

    if (location !== previousLocation) {
      onRouteChange({
        location,
        previousLocation,
      });
    }
  }, [location, onRouteChange, previousLocation]);
}
