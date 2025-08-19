import type { FC } from 'react';
import { SocialLogin } from '@/views/Passport/SocialLogin';
import { Button, Link } from '@heroui/react';
import { Icon } from '@iconify/react';

interface ForgotPwdCheckEmailProps {
  emailAddress: string;
}

export const ForgotPwdCheckEmail: FC<ForgotPwdCheckEmailProps> = ({
  emailAddress,
}) => {
  return (
    <div className="space-y-4">
      <div className="mx-auto mb-2 flex max-w-md items-center justify-center gap-2">
        <Icon icon="mdi-light:email" width="24" height="24" />
        <h4 className="text-center font-bold">Hi, Check your email</h4>
      </div>
      <div>
        <p className="text-center">
          We have sent a password recover instructions to your email
        </p>
        <p className="text-primary text-center">{emailAddress}</p>
      </div>
      <Button as={Link} href="/login" fullWidth color="primary">
        Sign in{' '}
      </Button>
      <SocialLogin />
    </div>
  );
};
