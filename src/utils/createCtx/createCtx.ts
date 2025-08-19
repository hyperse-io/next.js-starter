'use client';

import { createContext, useContext } from 'react';

/**
 * A helper to create a Context and Provider with no upfront default value, and
 * without having to check for undefined all the time.
 */
export function createCtx<A extends object | null>(
  name?: string,
  defaultValue?: A
) {
  const ctx = createContext<A | undefined>(defaultValue);
  ctx.displayName = name;

  function useCtx() {
    const c = useContext(ctx);
    if (c === undefined) {
      throw new Error('useCtx must be inside a Provider with a value');
    }
    return c;
  }
  return [useCtx, ctx.Provider] as const; // 'as const' makes TypeScript infer a tuple
}
