/* eslint-disable @typescript-eslint/no-empty-object-type */
import { createCtx } from '@/utils/createCtx';

export type GlobalConfigData = {};

export type GlobalContextState = GlobalConfigData & {
  domain: string;
};

export type GlobalContextSetter = {};

export const [useGlobalConfig, AppGlobalConfigProvider] = createCtx<
  GlobalContextState & GlobalContextSetter
>('GlobalConfigContext');
