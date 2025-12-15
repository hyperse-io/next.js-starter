import { type RefObject, useEffect, useRef, useState } from 'react';

export interface UseScrollTriggerOptions {
  disableHysteresis?: boolean;
  target?: Window | null;
  threshold?: number;
  getTrigger?: typeof defaultTrigger;
}

function getScrollY(target: Window | null | undefined): number {
  if (!target) return 0;

  return target.pageYOffset !== undefined
    ? target.pageYOffset
    : target.scrollY !== undefined
      ? target.scrollY
      : target.document.documentElement.scrollTop;
}

function defaultTrigger(
  store: RefObject<any>,
  options: UseScrollTriggerOptions
) {
  const { disableHysteresis = false, threshold = 100, target } = options;
  const previous = store.current;

  if (target) {
    store.current = getScrollY(target);
  }

  if (
    !disableHysteresis &&
    previous !== undefined &&
    store.current < previous
  ) {
    return false;
  }

  return store.current > threshold;
}

const defaultTarget = typeof window !== 'undefined' ? window : null;

function getInitialTrigger(
  target: Window | null | undefined,
  threshold: number = 100
): boolean {
  return getScrollY(target) > threshold;
}

export function useScrollTrigger(options: UseScrollTriggerOptions = {}) {
  const {
    getTrigger = defaultTrigger,
    target = defaultTarget,
    ...other
  } = options;
  const { threshold = 100 } = other;
  const store = useRef(undefined);

  const [trigger, setTrigger] = useState(() =>
    getInitialTrigger(target, threshold)
  );

  // No error
  const opts: AddEventListenerOptions & EventListenerOptions = {
    passive: true,
  };

  useEffect(() => {
    const handleScroll = () => {
      setTrigger(getTrigger(store, { target, ...other }));
    };

    handleScroll(); // Re-evaluate trigger when dependencies change
    target?.addEventListener('scroll', handleScroll, opts);
    return () => {
      target?.removeEventListener('scroll', handleScroll, opts);
    };
    // See Option 3. https://github.com/facebook/react/issues/14476#issuecomment-471199055
  }, [target, getTrigger, JSON.stringify(other)]);

  return trigger;
}
