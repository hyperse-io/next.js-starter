'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { z } from 'zod';
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Spacer,
} from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import type { StripeCheckoutValue } from '@stripe/react-stripe-js/checkout';
import { PaymentElement, useCheckout } from '@stripe/react-stripe-js/checkout';

const emailSchema = z.object({
  email: z.email(),
});

const validateEmail = async (email: string, checkout: StripeCheckoutValue) => {
  const updateResult = await checkout.updateEmail(email);
  const isValid = updateResult.type !== 'error';

  return { isValid, message: !isValid ? updateResult.error.message : null };
};

export const CheckoutForm = () => {
  const t = useTranslations('Stripe');
  const checkout = useCheckout();
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState } = useForm<
    z.infer<typeof emailSchema>
  >({
    resolver: zodResolver(emailSchema),
  });

  const submit = async (data: z.infer<typeof emailSchema>) => {
    console.log(data);

    try {
      setIsLoading(true);

      if (checkout.type === 'loading') {
        setMessage('Loading...');
        setIsLoading(false);
        return;
      }
      if (checkout.type === 'error') {
        setMessage(checkout.error.message);
        setIsLoading(false);
        return;
      }
      if (checkout.type === 'success') {
        const { isValid, message } = await validateEmail(
          data.email,
          checkout.checkout
        );
        if (!isValid) {
          setMessage(message);
          setIsLoading(false);
          return;
        }

        const confirmResult = await checkout.checkout.confirm();
        console.log(confirmResult);
      }
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit(submit)}>
        <CardHeader>
          <h2 className="text-lg font-bold">{t('Payment.title')}</h2>
        </CardHeader>
        <CardBody>
          <Input
            label={t('Payment.form.email')}
            placeholder={t('Payment.form.emailPlaceholder')}
            labelPlacement="outside"
            type="email"
            {...register('email')}
            errorMessage={formState.errors.email?.message}
            isInvalid={!!formState.errors.email}
          />
          <span className="text-sm text-gray-500">
            {t('Payment.form.extraInfo')}
          </span>
        </CardBody>
        <CardBody>
          <PaymentElement id="payment-element" />
          <Spacer y={4} />
          {checkout.type === 'success' && (
            <Button
              fullWidth
              id="submit"
              type="submit"
              variant="shadow"
              color="primary"
              isLoading={isLoading}
            >
              {`${t('Payment.button')} (${checkout.checkout.total.total})`}
            </Button>
          )}
          {/* Show any error or success messages */}
          <Spacer y={4} />
          {message && (
            <Alert id="payment-message" color="danger">
              {message}
            </Alert>
          )}
        </CardBody>
      </form>
    </Card>
  );
};
