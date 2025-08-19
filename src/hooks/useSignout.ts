import { graphql } from '@/common/graphql';
import { usePathname } from '@/i18n/routing';
import { usePassport } from '@/views/Passport/PassportModal';
import { useMutation } from '@apollo/client';
import { addToast } from '@heroui/react';

const SIGN_OUT = graphql(`
  mutation logout {
    logout {
      success
    }
  }
`);

export const useSignout = () => {
  const [signOutMutation, { loading }] = useMutation(SIGN_OUT);
  const { refreshActiveUser, getLoginUrl } = usePassport();
  const pathname = usePathname();

  return {
    signout: async () => {
      const result = await signOutMutation();
      if (result.data?.logout.success) {
        refreshActiveUser();
        // If current is in account page, redirect to login page
        if (pathname.startsWith('/account')) {
          window.location.href = getLoginUrl();
          return;
        }
      } else {
        addToast({
          title: result.errors?.[0]?.message ?? 'Failed to sign out',
          color: 'danger',
        });
      }
    },
    getLoginUrl,
    loading,
  };
};
