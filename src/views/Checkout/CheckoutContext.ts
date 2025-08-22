import { createCtx } from '@/utils/createCtx';
import type { UseMockProductsResult } from '../../hooks/useMockProducts';

type CheckoutContextState = {
  data: UseMockProductsResult;
};

export const [useCheckoutContext, CheckoutContextProvider] =
  createCtx<CheckoutContextState>('CheckoutContext');
