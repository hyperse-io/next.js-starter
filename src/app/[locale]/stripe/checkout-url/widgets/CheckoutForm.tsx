'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useCheckoutContext } from '@/views/Checkout/CheckoutContext';
import { Button, Card, CardBody, CardHeader } from '@heroui/react';
export const CheckoutForm = () => {
  const t = useTranslations('Stripe');
  const { data } = useCheckoutContext();
  const [isLoading, setIsLoading] = useState(false);

  const onCheckout = () => {
    setIsLoading(true);
    fetch('/api/stripe/checkout-redirect', {
      method: 'POST',
      body: JSON.stringify({ data }),
    })
      .then((res) => res.json())
      .then((resp) => {
        if (resp?.url) {
          window.location.href = resp.url as string;
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-bold">{t('Payment.title')}</h2>
      </CardHeader>
      <CardBody>
        <Button
          onPress={onCheckout}
          fullWidth
          variant="shadow"
          color="primary"
          isLoading={isLoading}
        >
          {t('Payment.button')}
        </Button>
      </CardBody>
    </Card>
  );
};
