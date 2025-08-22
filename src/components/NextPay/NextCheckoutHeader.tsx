'use client';

import { CardHeader } from '@heroui/react';
import { Icon } from '@iconify/react';
import { IconSkeleton } from '../IconSkeleton';

export type NextCheckoutHeaderProps = {
  children?: React.ReactNode;
};

export const NextCheckoutHeader = ({ children }: NextCheckoutHeaderProps) => {
  return (
    <CardHeader className="flex flex-row items-center gap-2">
      {!children ? (
        <>
          <IconSkeleton>
            <Icon icon="famicons:card" className="size-6" />
          </IconSkeleton>
          Card
        </>
      ) : (
        children
      )}
    </CardHeader>
  );
};
