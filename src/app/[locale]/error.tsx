'use client';

import { useEffect } from 'react';
import type { Error500Props } from '@/views/Error/Error500';
import { Error500 } from '@/views/Error/Error500';

export default function ErrorPage({ error, reset }: Error500Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <Error500 error={error} reset={reset} />;
}
