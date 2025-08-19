'use client';
import type { RefObject } from 'react';
import { useEffect, useRef, useState } from 'react';

function defaultTrigger(
  store: RefObject<number>,
  options: UseScrollTriggerOptions
) {
  const { disableHysteresis = false, threshold = 100, target } = options;
  const previous = store.current;

  if (target) {
    // Get vertical scroll
    store.current =
      (target as Window).pageYOffset !== undefined
        ? (target as Window).pageYOffset
        : (target as HTMLElement).scrollTop;
  }

  if (!disableHysteresis && previous !== undefined) {
    if (store.current < previous) {
      return false;
    }
  }

  return store.current > threshold;
}

const defaultTarget = typeof window !== 'undefined' ? window : null;

export interface UseScrollTriggerOptions {
  disableHysteresis?: boolean;
  target?: Window | Node | null;
  threshold?: number;
}

export function useScrollTrigger(options: UseScrollTriggerOptions) {
  const { target = defaultTarget, ...other } = options;
  const store = useRef<number>(0);
  const [trigger, setTrigger] = useState(() => defaultTrigger(store, other));
  useEffect(() => {
    if (target === null) {
      return setTrigger(false);
    }
    const handleScroll = () => {
      setTrigger(defaultTrigger(store, { target, ...other }));
    };

    handleScroll(); // Re-evaluate trigger when dependencies change
    target.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      target?.removeEventListener('scroll', handleScroll);
    };
  }, [target, JSON.stringify(other)]);

  return trigger;
}
