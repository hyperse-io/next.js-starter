import { createCtx } from '@/utils/createCtx';

export type GlobalConfigData = {
  // settings: Array<{
  //   id: string;
  //   key: string;
  //   value: any;
  // }>;
};

export type GlobalContextState = GlobalConfigData & {
  domain: string;
};

export type GlobalContextSetter = {
  // setCurrencyCode: (code: CurrencyCode) => void;
};

export const [useGlobalConfig, AppGlobalConfigProvider] = createCtx<
  GlobalContextState & GlobalContextSetter
>('GlobalConfigContext');
