'use client';

import { useEffect } from 'react';
import { type ResultOf } from 'gql.tada';
import { atom, useAtom } from 'jotai';
import { useEventCallback } from 'usehooks-ts';
import { graphql } from '@/common/graphql';
import { useRouter } from '@/navigation';
import { toast } from '@/ui/use-toast';
import { type ApolloQueryResult, useMutation, useQuery } from '@apollo/client';
import { removeQueryString } from '@dimjs/utils';
import { MyDialog } from '../MyDialog';
import { LoginForm } from './LoginForm';

const ACTIVE_CUSTOMER = graphql(`
  query ActiveCustomer {
    activeCustomer {
      id
      firstName
      lastName
      phoneNumber
      emailAddress
    }
  }
`);
const LOGOUT_CUSTOMER = graphql(`
  mutation logout {
    logout {
      success
    }
  }
`);
type ActiveCustomerData = ResultOf<typeof ACTIVE_CUSTOMER>;

/**
 * @example
 * ```tsx
 *
 * const Submit = () => {
 *   return (
 *     <AuthModalButton>
 *       <Button>submit</Button>
 *     </AuthModalButton>
 *   );
 * };
 * ```
 */

const authModalAtom = atom<{
  open: boolean;
  resolve: null | ((customer: ActiveCustomerData['activeCustomer']) => void);
  refresh: null | (() => Promise<ApolloQueryResult<ActiveCustomerData>>);
  activeCustomer: ActiveCustomerData['activeCustomer'];
}>({
  open: false,
  resolve: null,
  refresh: null,
  activeCustomer: null,
});

export const useAuth = () => {
  const { loading, data, refetch } = useQuery(ACTIVE_CUSTOMER);
  const [logoutMutation] = useMutation(LOGOUT_CUSTOMER);

  const [, updateAuthStatus] = useAtom(authModalAtom);
  const activeCustomer = data?.activeCustomer;
  const isAuthed = !!activeCustomer;
  const router = useRouter();

  const refreshActiveUser = useEventCallback(() => {
    return refetch();
  });

  const signout = useEventCallback(() => {
    logoutMutation({}).then((result) => {
      if (result.data?.logout.success) {
        refetch();
        toast({
          title: 'Logout ',
          description: `You have successfully logged out.`,
        });
      } else {
        toast({
          title: 'Logout',
          description: result.errors?.[0]?.message || 'Logout failed',
        });
      }
    });
  });

  useEffect(() => {
    if (activeCustomer) {
      updateAuthStatus((prev) => ({
        ...prev,
        activeCustomer,
      }));
    }
  }, [activeCustomer, updateAuthStatus]);

  const redirectToLoginPage = useEventCallback(() => {
    const newUrl = removeQueryString(window.location.href, 'callbackUrl');
    return router.push(`/login?callbackUrl=${encodeURIComponent(newUrl)}`);
  });
  /**
   * if redirect is true, it will redirect to the login page
   */
  const tryLogin = useEventCallback((redirectLoginPage?: boolean) => {
    return new Promise<ActiveCustomerData['activeCustomer']>((resolve) => {
      if (isAuthed) {
        updateAuthStatus((prev) => {
          return {
            ...prev,
            open: false,
            resolve: null,
            refetch: null,
            activeCustomer,
          };
        });
        return resolve(activeCustomer);
      }

      // redirect to login page
      if (redirectLoginPage) {
        return redirectToLoginPage();
      }

      updateAuthStatus((prev) => {
        return {
          ...prev,
          open: true,
          resolve,
          refresh: refreshActiveUser,
        };
      });
    });
  });

  return {
    loading,
    signout,
    tryLogin,
    activeCustomer,
    redirectToLoginPage,
  };
};

export function AuthModal() {
  const [authStatus, updateAuthStatus] = useAtom(authModalAtom);
  const onUserLoginSuccess = useEventCallback(() => {
    authStatus.refresh?.().then((result) => {
      const activeCustomer = result.data.activeCustomer;
      updateAuthStatus((prev) => ({
        ...prev,
        open: false,
        resolve: null,
        refresh: null,
        activeCustomer,
      }));
      authStatus.resolve?.(activeCustomer);
    });
  });

  return (
    <MyDialog
      className="z-[500] backdrop-saturate-150 dark:bg-hyperse-gradient"
      open={authStatus.open}
      onClose={() => {
        updateAuthStatus((prev) => ({
          ...prev,
          open: false,
          resolve: null,
          refresh: null,
        }));
      }}
    >
      <div className="sm:max-w-[425px]">
        <LoginForm onLoginDone={onUserLoginSuccess} showFooterLinks={false} />
      </div>
    </MyDialog>
  );
}
