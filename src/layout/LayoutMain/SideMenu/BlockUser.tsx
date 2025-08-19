'use client';

import { usePassport } from '@/views/Passport';
import { Button, Link } from '@heroui/react';

export function BlockUser() {
  const { activeCustomer } = usePassport();
  if (activeCustomer) return null;
  return (
    <div className="my-2">
      <Button
        as={Link}
        fullWidth
        color="primary"
        variant="bordered"
        href="/login"
      >
        Sign In
      </Button>
    </div>
  );
}
