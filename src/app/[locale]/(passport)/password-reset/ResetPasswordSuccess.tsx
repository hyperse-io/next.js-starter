import { Button, Link } from '@heroui/react';
import { Icon } from '@iconify/react';

export const ResetPasswordSuccess = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <Icon icon="solar:check-circle-linear" width="24" height="24" />
      <h2 className="text-center font-bold">Password Reset</h2>
      <p className="text-center">You have successfully reset your password.</p>
      <Button
        as={Link}
        fullWidth
        className="mt-5 w-full"
        color="primary"
        href="/"
      >
        Continue Shopping
      </Button>
    </div>
  );
};
