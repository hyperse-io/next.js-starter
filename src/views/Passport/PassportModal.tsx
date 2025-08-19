'use client';

import { useEffect } from 'react';
import { useLocale } from 'next-intl';
import { type ResultOf } from 'gql.tada';
import { atom, useAtom } from 'jotai';
import { graphql } from '@/common/graphql';
import { useRouteChange } from '@/hooks/useRouteChange';
import { redirect } from '@/i18n/routing';
import { type ApolloQueryResult, useMutation, useQuery } from '@apollo/client';
import { removeQueryString } from '@dimjs/utils';
import { addToast, Modal, ModalContent } from '@heroui/react';
import { SigninForm } from './SigninForm';

const ACTIVE_CUSTOMER = graphql(`
  query ActiveCustomer {
    activeCustomer {
      id
      firstName
      lastName
      phoneNumber
      emailAddress
      myTotalInvitedCustomers
      customFields {
        rewardPointsTotal
      }
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

export type ActiveCustomer = ActiveCustomerData['activeCustomer'];

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
  resolve: null | ((customer: ActiveCustomer) => void);
  refresh: null | (() => Promise<ApolloQueryResult<ActiveCustomerData>>);
  activeCustomer: ActiveCustomer;
}>({
  open: false,
  resolve: null,
  refresh: null,
  activeCustomer: null,
});

export const usePassport = () => {
  const { loading, data, refetch } = useQuery(ACTIVE_CUSTOMER, {
    fetchPolicy: 'network-only',
  });

  const [logoutMutation] = useMutation(LOGOUT_CUSTOMER);
  const [, updateAuthStatus] = useAtom(authModalAtom);
  const activeCustomer = data?.activeCustomer;
  const isAuthed = !!activeCustomer;
  const locale = useLocale();

  const refreshActiveUser = () => {
    return refetch();
  };

  const signout = () => {
    logoutMutation({}).then((result) => {
      if (result.data?.logout.success) {
        refetch();
        addToast({
          title: 'You have successfully logged out.',
          color: 'success',
        });
      } else {
        addToast({
          title: result.errors?.[0]?.message || 'Logout failed',
          color: 'danger',
        });
      }
    });
  };

  useEffect(() => {
    if (activeCustomer) {
      updateAuthStatus((prev) => ({
        ...prev,
        activeCustomer,
      }));
    }
  }, [activeCustomer, updateAuthStatus]);

  const getLoginUrl = (callbackUrl?: string) => {
    const newUrl = removeQueryString(
      callbackUrl || window.location.href,
      'callbackUrl'
    );
    return `/login?callbackUrl=${encodeURIComponent(newUrl)}`;
  };

  /**
   * if redirect is true, it will redirect to the login page
   */
  const tryLogin = (redirectLoginPage?: boolean) => {
    return new Promise<ActiveCustomer>((resolve) => {
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
        return redirect({
          href: getLoginUrl(),
          locale,
        });
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
  };

  return {
    loading,
    signout,
    tryLogin,
    activeCustomer: activeCustomer
      ? {
          ...activeCustomer,
        }
      : null,
    getLoginUrl,
    refreshActiveUser,
  };
};

export function PassportModal() {
  const [authStatus, updateAuthStatus] = useAtom(authModalAtom);

  const closeModal = () => {
    updateAuthStatus((prev) => ({
      ...prev,
      open: false,
    }));
  };

  const onUserLoginSuccess = () => {
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
  };

  useRouteChange(() => {
    closeModal();
  });

  return (
    <Modal
      size="sm"
      isOpen={authStatus.open}
      className="-z-50"
      onClose={() => {
        updateAuthStatus((prev) => ({
          ...prev,
          open: false,
          resolve: null,
          refresh: null,
        }));
      }}
    >
      <ModalContent className="p-4">
        <SigninForm onLoginSuccess={onUserLoginSuccess} />
      </ModalContent>
    </Modal>
  );
}
