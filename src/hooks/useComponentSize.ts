import { useCallback, useLayoutEffect, useRef, useState } from 'react';

export function useComponentSize() {
  const [size, setSize] = useState({
    height: 0,
    width: 0,
  });
  const ref = useRef<any>();

  const onResize = useCallback(() => {
    if (!ref.current) {
      return;
    }

    const newHeight = ref.current.offsetHeight;
    const newWidth = ref.current.offsetWidth;

    if (newHeight !== size.height || newWidth !== size.width) {
      setSize({
        height: newHeight,
        width: newWidth,
      });
    }
  }, [size.height, size.width]);

  useLayoutEffect(() => {
    if (!ref || !ref.current) {
      return;
    }
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(ref.current);

    return () => resizeObserver.disconnect();
  }, [ref, onResize]);

  return {
    ref,
    ...size,
  };
}
