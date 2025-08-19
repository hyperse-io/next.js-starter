'use client';

import { useEffect, useRef, useState } from 'react';

export function useIsIntersecting<TElement extends HTMLElement>() {
  // to prevents runtime crash in IE, let's mark it true right away
  const [isIntersecting, setIsIntersecting] = useState(false);

  const ref = useRef<TElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const observer = new IntersectionObserver(([entry]) =>
      setIsIntersecting(entry?.isIntersecting || false)
    );
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, []);
  return [isIntersecting, ref] as const;
}
