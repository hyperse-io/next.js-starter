'use client';

import { useEffect } from 'react';
import { LoadingBox } from '@/components/LoadingBox';
import { useSignout } from '@/hooks/useSignout';

export const Logout = () => {
  const { signout, getLoginUrl } = useSignout();

  useEffect(() => {
    signout().then(() => {
      window.location.href = getLoginUrl('/');
    });
  }, []);

  return (
    <div className="mx-auto my-4 max-w-8xl px-4 sm:px-6 lg:px-8">
      <LoadingBox loadingTxt="Logging out..." />
    </div>
  );
};
