'use client';

import { addToast, Button, CardHeader } from '@heroui/react';
import { Icon } from '@iconify/react';
import { IconSkeleton } from '../IconSkeleton';

export type NextCheckoutFooterProps = {
  children?: React.ReactNode;
};

export const NextCheckoutFooter = ({ children }: NextCheckoutFooterProps) => {
  const handlePay = () => {
    console.log('pay');
    addToast({
      title: 'Pay',
      description: 'Paying...',
      color: 'primary',
    });
  };
  return (
    <CardHeader className="flex flex-row items-center gap-2">
      {!children ? (
        <Button
          color="primary"
          fullWidth
          variant="flat"
          startContent={
            <IconSkeleton>
              <Icon icon="famicons:card" className="size-6" />
            </IconSkeleton>
          }
          onPress={handlePay}
        >
          Pay
        </Button>
      ) : (
        children
      )}
    </CardHeader>
  );
};
