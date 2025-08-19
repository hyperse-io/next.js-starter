'use client';

import { useLayoutEffect, useState } from 'react';

function measure() {
  return {
    height: window.innerHeight,
    width: window.innerWidth,
  };
}

export function useWindowSize() {
  const [size, setSize] = useState(measure());

  useLayoutEffect(() => {
    function onResize() {
      setSize(measure());
    }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return size;
}
