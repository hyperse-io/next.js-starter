'use client';
import { useState } from 'react';
import { ForgotPwdCheckEmail } from './ForgotPwdCheckEmail';
import { ForgotPwdForm } from './ForgotPwdForm';

export const ForgotPwdView = () => {
  const [showCheckEmail, setShowCheckEmail] = useState('');

  const handleRequestPasswordReset = (emailAddress: string) => {
    setShowCheckEmail(emailAddress);
  };

  return (
    <div className="mx-auto my-4 flex min-h-[calc(100vh-400px)] max-w-md bg-white py-4">
      <div className="max-w-md">
        {showCheckEmail ? (
          <ForgotPwdCheckEmail emailAddress={showCheckEmail} />
        ) : (
          <ForgotPwdForm onSuccess={handleRequestPasswordReset} />
        )}
      </div>
    </div>
  );
};
