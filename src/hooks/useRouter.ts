import { useRouter as useProgressBarRouter } from '@bprogress/next';
import { useIntlRouter } from '../i18n/routing';

/**
 * We wrap next-intl router, Expose the router from next-nprogress-bar, it should be used in `client`
 * @example
 * ```tsx
 * import { useProgressRouter } from '@/i18n/useProgressRouter';
 * const router = useProgressRouter();
 * router.push('/');
 * ```
 */
export const useRouter = () => {
  return useProgressBarRouter({
    customRouter: useIntlRouter,
  });
};
