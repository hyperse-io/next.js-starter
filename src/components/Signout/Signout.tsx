import { Button, Link } from '@heroui/react';

type SignoutProps = {
  className?: string;
};

export function Signout({ className }: SignoutProps) {
  return (
    <Button
      fullWidth
      size="sm"
      variant="shadow"
      color="primary"
      className={className}
      as={Link}
      href={'/logout'}
    >
      Sign Out
    </Button>
  );
}
