import { Button, Link } from '@heroui/react';

export const ResetPasswordExpired = () => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-center font-bold">Link expired</h2>
        <p className="text-center text-sm">
          Looks like your password reset link has expired. Request a new one
          below and keep an eye on your inbox.
        </p>
        <Button
          color="primary"
          fullWidth
          className="w-full"
          as={Link}
          href="/forgot-password"
        >
          Resend link
        </Button>
        <p className="text-center text-sm">
          If you continue to have trouble logging in, please let us know by
          emailing{' '}
          <Link
            target="_blank"
            href="mailto:service@issilo.com"
            className="text-primary"
          >
            service@issilo.com
          </Link>
        </p>
      </div>
    </div>
  );
};
