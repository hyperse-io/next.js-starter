'use client';

import { useTransition } from 'react';
import { useParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from '@/hooks/useRouter';
import { routing, usePathname } from '@/i18n/routing';
import { Select, SelectItem } from '@heroui/react';

type LocaleSwitcherProps = {
  className?: string;
};
export const LocaleSwitcher = ({ className }: LocaleSwitcherProps) => {
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();
  const t = useTranslations('LocaleSwitcher');
  return (
    <Select
      selectedKeys={[locale]}
      isLoading={isPending}
      className={className}
      items={routing.locales.map((locale) => ({
        key: locale,
        label: locale,
      }))}
      onSelectionChange={(e) => {
        const nextLocale = e.currentKey;
        startTransition(() => {
          router.replace({ pathname, params } as any, { locale: nextLocale });
        });
      }}
    >
      {(item) => (
        <SelectItem key={item.key}>
          {t('locale', { locale: item.key })}
        </SelectItem>
      )}
    </Select>
  );
};
