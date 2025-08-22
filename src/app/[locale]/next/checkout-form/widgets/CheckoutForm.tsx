'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { NextIframe } from '@/components/NextPay/NextIframe';
import { Card, CardBody, CardHeader } from '@heroui/react';

export const CheckoutForm = () => {
  const t = useTranslations('Next');
  const host = window.location.host;

  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-bold">{t('Payment.title')}</h2>
      </CardHeader>
      <CardBody>
        <NextIframe url={`http://${host}/next-payment`} />
      </CardBody>
    </Card>
  );
};
