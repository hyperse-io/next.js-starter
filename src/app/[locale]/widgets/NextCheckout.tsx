'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button, Card, CardBody, CardHeader } from '@heroui/react';

export const NextCheckout = () => {
  const t = useTranslations('Next.Examples');
  const [examples] = useState<any[]>([
    {
      name: t('useForm'),
      path: '/next/checkout-form',
    },
  ]);

  return (
    <Card className="mx-auto w-full max-w-6xl">
      <CardHeader>
        <h2 className="text-2xl font-bold">Next Checkout Examples</h2>
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
    </Card>
  );
};
