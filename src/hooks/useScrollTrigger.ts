import { type MutableRefObject, useEffect, useRef, useState } from 'react';

export interface UseScrollTriggerOptions {
  disableHysteresis?: boolean;
  target?: Window | null;
  threshold?: number;
  getTrigger?: typeof defaultTrigger;
}

function defaultTrigger(
  store: MutableRefObject<any>,
  options: UseScrollTriggerOptions
) {
  const { disableHysteresis = false, threshold = 100, target } = options;
  const previous = store.current;

  if (target) {
    // Get vertical scroll
    store.current =
      target.pageYOffset !== undefined
        ? target.pageYOffset
        : target.scrollY !== undefined
          ? target.scrollY
          : target.document.documentElement.scrollTop;
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

export default function useScrollTrigger(
  options: UseScrollTriggerOptions = {}
) {
  const {
    getTrigger = defaultTrigger,
    target = defaultTarget,
    ...other
  } = options;
  const store = useRef();
  const [trigger, setTrigger] = useState(() => getTrigger(store, other));

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
