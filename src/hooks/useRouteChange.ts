import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useEventCallback } from 'usehooks-ts';
import { usePrevious } from './usePrevious';

export function useRouteChange(
  onRouteChange: (locationChangeEvent: {
    location: string;
    previousLocation: string | undefined;
  }) => void
): void {
  const location = usePathname();
  const previousLocation = usePrevious(location);

  const onLocationChangeDynamic = useEventCallback(onRouteChange);

  useEffect(() => {
    if (!previousLocation) {
      return;
    }

    if (location !== previousLocation) {
      onLocationChangeDynamic({
        location,
        previousLocation,
      });
    }
  }, [location, onLocationChangeDynamic, previousLocation]);
}
