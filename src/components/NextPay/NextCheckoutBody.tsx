'use client';

import { CardBody, Input } from '@heroui/react';

export type NextCheckoutBodyProps = {
  children?: React.ReactNode;
};

export const NextCheckoutBody = ({ children }: NextCheckoutBodyProps) => {
  return (
    <CardBody>
      {!children ? (
        <div className="flex flex-col gap-2">
          <Input label="Cardholder Name" />
          <Input label="Card Number" />
          <div className="flex flex-row gap-2">
            <Input label="Expiry Date" />
            <Input label="CVV" />
          </div>
        </div>
      ) : (
        children
      )}
    </CardBody>
  );
};
