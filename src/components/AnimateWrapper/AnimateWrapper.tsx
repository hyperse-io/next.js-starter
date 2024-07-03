'use client';

import { type PropsWithChildren, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export function AnimateWrapper({ children }: PropsWithChildren) {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);
  return <>{children}</>;
}
