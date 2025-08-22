import { Fragment } from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { LayoutMain } from '@/layout/LayoutMain';
import { Chip } from '@heroui/chip';
import { Divider } from '@heroui/react';
import { CardReview } from './widgets/card-review';
import { DataExample } from './widgets/DataExample';
import { NextCheckout } from './widgets/NextCheckout';
import { reviews } from './widgets/reviews';
import { StripeCheckout } from './widgets/StripeCheckout';

export default async function Pages(props: PageProps) {
  const { locale } = await props.params;
  // Enable static rendering
  setRequestLocale(locale);
  const t = await getTranslations('IndexPage');
  return (
    <LayoutMain footerLinks={[]} collections={[]}>
      <div className="flex h-full w-full flex-col items-center justify-center gap-8 overflow-auto p-12">
        <Chip color="primary" variant="flat">
          {t('title')}
        </Chip>
        <StripeCheckout />
        <Divider />
        <NextCheckout />
        <Divider />
        <DataExample />
        <Divider />
        <Fragment>
          <span className="text-2xl font-bold">
            Next.js starter best practices
          </span>
          <section className="mx-auto w-full max-w-6xl">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {reviews.map((review, index) => (
                <CardReview key={index} {...review} />
              ))}
            </div>
          </section>
        </Fragment>
      </div>
    </LayoutMain>
  );
}
