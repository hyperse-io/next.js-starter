'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Card, CardBody, CardHeader, Divider, Spacer } from '@heroui/react';
import { useCheckoutContext } from '../Checkout/CheckoutContext';

export const OrderSummaryCard = () => {
  const tOrderSummary = useTranslations('OrderSummary');
  const tProducts = useTranslations('Products');
  const { data } = useCheckoutContext();
  const { products, subtotal, shipping, tax, total } = data;

  return (
    <div>
      {' '}
      <Card shadow="sm">
        <CardHeader>
          <h2 className="text-lg font-bold">{tProducts('title')}</h2>
        </CardHeader>
        <CardBody>
          <ul className="w-full divide-y divide-gray-100 dark:divide-gray-100/20">
            {products.map((item) => (
              <div
                key={item.name}
                className="flex w-full items-center gap-2 py-2"
              >
                <Image
                  key={item.name}
                  src={item.image}
                  alt={`${item.name}`}
                  fetchPriority="auto"
                  width={48}
                  height={48}
                  className="flex-shrink-0 rounded-sm"
                />
                <div className="flex w-full flex-col gap-1">
                  <div className="flex w-full flex-row items-center justify-between">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm">${item.price}</div>
                  </div>
                  <div className="text-xs text-gray-400">{item.desc}</div>
                </div>
              </div>
            ))}
          </ul>
        </CardBody>
      </Card>
      <Spacer y={4} />
      <Card shadow="sm">
        <CardHeader>
          <h2 className="text-lg font-bold">{tOrderSummary('title')}</h2>
        </CardHeader>
        <CardBody>
          <div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">
                {tOrderSummary('subtotal')}
              </span>
              <span className="text-sm">${subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">
                {tOrderSummary('shipping')}
              </span>
              <span className="text-sm">
                {shipping === 0 ? 'Free' : `$${shipping}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">
                {tOrderSummary('tax')}
              </span>
              <span className="text-sm">${tax}</span>
            </div>
            <Spacer y={2} />
            <Divider />
            <Spacer y={2} />
            <div className="flex justify-between font-bold">
              <span>{tOrderSummary('total')}</span>
              <span>${total}</span>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
