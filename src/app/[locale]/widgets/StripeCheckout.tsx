'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button, Card, CardBody, CardFooter, CardHeader } from '@heroui/react';
import { Icon } from '@iconify/react/dist/iconify.js';

export const StripeCheckout = () => {
  const t = useTranslations('Stripe.Examples');
  const tDocumentation = useTranslations('Stripe.Documentation');
  const examples = [
    {
      name: t('useComponent'),
      path: '/stripe/checkout-component',
    },
    {
      name: t('useForm'),
      path: '/stripe/checkout-form',
    },
    {
      name: t('useRedirect'),
      path: '/stripe/checkout-url',
    },
  ];

  return (
    <Card className="mx-auto max-w-6xl">
      <CardHeader>
        <h2 className="text-2xl font-bold">{t('title')}</h2>
      </CardHeader>
      <CardBody className="flex flex-row flex-wrap gap-2 p-3">
        {examples.map((example) => (
          <Button
            key={example.name}
            variant="solid"
            color="primary"
            as={Link}
            href={example.path}
            className="w-fit"
          >
            {example.name}
          </Button>
        ))}
      </CardBody>
      <CardFooter className="flex flex-col gap-2 text-sm">
        <div className="block gap-2">
          <span>【 Payment Intent API 】</span>
          <span>{tDocumentation('Intent')}</span>
          <Button
            as={Link}
            size="sm"
            variant="light"
            color="primary"
            href="https://docs.stripe.com/payments/payment-intents"
            isIconOnly
            startContent={<Icon icon="lucide:link" className="size-4" />}
          ></Button>
        </div>
        <div className="block gap-2">
          <span>【 Stripe Checkout 】</span>
          <span>{tDocumentation('Checkout')}</span>
          <Button
            as={Link}
            size="sm"
            variant="light"
            color="primary"
            href="https://docs.stripe.com/payments/checkout"
            isIconOnly
            startContent={<Icon icon="lucide:link" className="size-4" />}
          ></Button>
        </div>
      </CardFooter>
    </Card>
  );
};
