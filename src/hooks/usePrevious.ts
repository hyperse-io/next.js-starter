import { useRef } from 'react';
import { useSafeLayoutEffect } from './useSafeLayoutEffect';

/**
 * Gets `value` from the last render.
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();

  useSafeLayoutEffect(() => {
    ref.current = value;
  });

  return ref.current;
}
