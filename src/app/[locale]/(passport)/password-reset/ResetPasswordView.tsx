'use client';

import { type FC, useState } from 'react';
import { ResetPassword } from './ResetPassword';
import { ResetPasswordExpired } from './ResetPasswordExpired';
import { ResetPasswordSuccess } from './ResetPasswordSuccess';

export const ResetPasswordView: FC<{
  token: string;
}> = ({ token }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showExpired, setShowExpired] = useState(false);

  const handleResetSuccess = () => {
    setShowSuccess(true);
  };
  const handleResetLinkExpired = () => {
    setShowExpired(true);
  };

  return (
    <div className="mx-auto max-w-md py-4">
      <div className="max-w-md">
        {showSuccess ? (
          <ResetPasswordSuccess />
        ) : showExpired ? (
          <ResetPasswordExpired />
        ) : (
          <ResetPassword
            token={token}
            onResetSuccess={handleResetSuccess}
            onResetLinkExpired={handleResetLinkExpired}
          />
        )}
      </div>
    </div>
  );
};
