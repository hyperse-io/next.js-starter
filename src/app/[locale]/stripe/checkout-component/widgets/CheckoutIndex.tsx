'use client';

import { useMemo } from 'react';
import { useLocale } from 'next-intl';
import { useAppTheme } from '@/hooks';
import { useCheckoutContext } from '@/views/Checkout/CheckoutContext';
import { CheckoutProvider } from '@stripe/react-stripe-js';
import type { StripeElementLocale } from '@stripe/stripe-js';
import { type Appearance, loadStripe } from '@stripe/stripe-js';
import { CheckoutView } from './CheckoutView';

export const CheckoutIndex = () => {
  const locale = useLocale();
  const { data } = useCheckoutContext();
  const { currentTheme } = useAppTheme();
  const promise = useMemo(() => {
    return fetch('/api/stripe/create-checkout-session', {
      method: 'POST',
      body: JSON.stringify({ data, uiMode: 'custom' }),
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, []);

  const appearance: Appearance = {
    labels: 'floating',
    theme: currentTheme === 'dark' ? 'night' : 'flat',
    disableAnimations: true,
  };

  const stripePromise = useMemo(() => {
    return loadStripe(process.env.STRIPE_PUBLISHABLE_KEY, {
      locale: locale as StripeElementLocale,
    });
  }, [locale]);

  return (
    <CheckoutProvider
      stripe={stripePromise}
      options={{
        fetchClientSecret: () => promise,
        elementsOptions: { appearance },
      }}
    >
      <CheckoutView />
    </CheckoutProvider>
  );
};
