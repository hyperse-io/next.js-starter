'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button, Card, CardBody, CardHeader } from '@heroui/react';

export const PaymentCancelView = () => {
  const t = useTranslations('Stripe.Canceled');
  return (
    <div className="mt-24 flex h-full w-full items-center justify-center">
      <Card className="w-xl">
        <CardHeader>
          <CardHeader className="flex flex-col items-start gap-2">
            <p className="self-center text-lg font-bold">{t('title')}</p>
            <p className="text-sm text-gray-500">
              DateTime: {new Date().toLocaleString()}
            </p>
          </CardHeader>
        </CardHeader>
        <CardBody>
          <Button color="primary" variant="flat" fullWidth as={Link} href="/">
            Back to Home
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};
