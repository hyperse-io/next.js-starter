'use client';

import { Card } from '@heroui/react';
import { NextCheckoutBody } from './NextCheckoutBody';
import { NextCheckoutFooter } from './NextCheckoutFooter';
import { NextCheckoutHeader } from './NextCheckoutHeader';

export type NextCheckoutFormProps = {
  body?: React.ReactNode;
  footer?: React.ReactNode;
  header?: React.ReactNode;
};

export const NextCheckoutForm = ({
  body,
  footer,
  header,
}: NextCheckoutFormProps) => {
  return (
    <Card className="w-full rounded-none p-3" shadow="lg">
      <NextCheckoutHeader>{header}</NextCheckoutHeader>
      <NextCheckoutBody>{body}</NextCheckoutBody>
      <NextCheckoutFooter>{footer}</NextCheckoutFooter>
    </Card>
  );
};
