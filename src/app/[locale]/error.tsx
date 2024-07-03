'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { LayoutWrapper } from '@/components/LayoutWrapper';
import { Link } from '@/navigation';

type Props = {
  error: Error;
  reset(): void;
};

export default function Error({ error, reset }: Props) {
  const t = useTranslations('Error');

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <LayoutWrapper>
      <main className="grid min-h-full place-items-center  px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-lg font-semibold text-primary">Error</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            {t('title')}
          </h1>
          <p className="mt-6 text-base leading-7 text-secondary">
            {t.rich('description', {
              p: (chunks) => <p className="mt-4">{chunks}</p>,
              retry: (chunks) => (
                <button
                  className="text-white underline underline-offset-2"
                  onClick={reset}
                  type="button"
                >
                  {chunks}
                </button>
              ),
            })}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/"
              className="inline-block w-fit rounded-md bg-[#357D8A] px-3  py-1 font-semibold text-white"
            >
              Go back home
            </Link>
            <Link
              href="/faq"
              className="inline-block w-fit rounded-md bg-[#357D8A] px-3 py-1 font-semibold text-white"
            >
              Contact support <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </main>
    </LayoutWrapper>
  );
}
