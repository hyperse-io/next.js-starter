'use client';

import React, { useMemo } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useCheckoutContext } from '@/views/Checkout/CheckoutContext';
import { Card, CardBody, CardHeader } from '@heroui/react';
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from '@stripe/react-stripe-js';
import type { StripeElementLocale } from '@stripe/stripe-js';
import { loadStripe } from '@stripe/stripe-js';

export const CheckoutForm = () => {
  const locale = useLocale();
  const t = useTranslations('Stripe');
  const { data } = useCheckoutContext();
  const promise = useMemo(() => {
    return fetch('/api/stripe/create-checkout-session', {
      method: 'POST',
      body: JSON.stringify({ data, uiMode: 'embedded' }),
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, []);

  const stripePromise = useMemo(() => {
    return loadStripe(process.env.STRIPE_PUBLISHABLE_KEY, {
      locale: locale as StripeElementLocale,
    });
  }, [locale]);

  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-bold">{t('Payment.title')}</h2>
      </CardHeader>
      <CardBody>
        <div id="checkout" style={{ colorScheme: 'none' }}>
          <EmbeddedCheckoutProvider
            stripe={stripePromise}
            options={{
              fetchClientSecret: () => promise,
            }}
          >
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        </div>
      </CardBody>
    </Card>
  );
};
