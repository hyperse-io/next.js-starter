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
    <div className="max-w-8xl mx-auto my-4 px-4 sm:px-6 lg:px-8">
      <LoadingBox loadingTxt="Logging out..." />
    </div>
  );
};
