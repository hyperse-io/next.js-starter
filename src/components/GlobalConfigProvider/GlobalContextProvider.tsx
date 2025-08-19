'use client';

import { type ReactElement, useReducer } from 'react';
import { useEffect, useMemo } from 'react';
import { useLocalStorageState } from 'ahooks';
import { defaultDomain } from '@/config/region';
import type { GlobalConfigData } from './GlobalContext';
import {
  AppGlobalConfigProvider,
  type GlobalContextSetter,
  type GlobalContextState,
} from './GlobalContext';

type GlobalProviderProps = {
  children: ReactElement;
  globals: GlobalConfigData;
  locale: string;
  domain: string;
};

type AppCtxAction = {
  // type: 'SET_CURRENCY_CODE';
  // value: CurrencyCode;
};

function appReducer(
  state: GlobalContextState,
  action: AppCtxAction
): GlobalContextState {
  // if (action.type === 'SET_CURRENCY_CODE') {
  //   return {
  //     ...state,
  //     currencyCode: action.value,
  //   };
  // }
  return state;
}

const initialState: GlobalContextState = {
  // settings: [],
  domain: defaultDomain,
};

export function GlobalConfigProvider(props: GlobalProviderProps) {
  const { children, globals, locale, domain } = props;
  const initialConfig = {
    ...initialState,
    // Make sure that UK default locale is `GBP`....
    // currencyCode:
    //   defaultCurrencyCodeOfLocale[
    //     locale as keyof typeof defaultCurrencyCodeOfLocale
    //   ] || CurrencyCode.USD,
  };

  const [storageState, setConfig] = useLocalStorageState('global-setting', {
    defaultValue: initialConfig,
  });

  const [state, dispatch] = useReducer(appReducer, {
    ...initialState,
    ...storageState,
    // Make server settings override local storage settings, place at the end
    ...globals,
  });

  const stateSetter: GlobalContextSetter = useMemo(
    () => ({
      // setCurrencyCode: (value: CurrencyCode) =>
      //   dispatch({ type: 'SET_CURRENCY_CODE', value }),
    }),
    []
  );

  useEffect(() => {
    // Only update local storage when the state changes
    setConfig(state);
  }, [state]);

  const value = useMemo(
    () => ({
      ...state,
      ...stateSetter,
      ...storageState,
      domain,
    }),
    [storageState, stateSetter, state, domain]
  );

  return (
    <AppGlobalConfigProvider value={value}>{children}</AppGlobalConfigProvider>
  );
}
