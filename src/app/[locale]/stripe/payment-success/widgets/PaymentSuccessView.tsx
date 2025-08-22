'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Button, Card, CardBody, CardHeader } from '@heroui/react';

export const PaymentSuccessView = () => {
  const t = useTranslations('Stripe.Success');
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <div className="mt-24 flex h-full w-full items-center justify-center">
      <Card className="w-xl">
        <CardHeader className="flex flex-col items-start gap-2">
          <p className="self-center text-lg font-bold">{t('title')}</p>
          <p className="w-full text-sm break-all text-gray-500">
            Session ID: {sessionId}
          </p>
          <p className="text-sm text-gray-500">
            DateTime: {new Date().toLocaleString()}
          </p>
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
