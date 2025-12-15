'use client';

import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

export const useMounted = () => {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
};
