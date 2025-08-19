'use client';

import {
  NoticeBar,
  noticebarHeight,
  type NoticeBarProps,
} from '@/components/NoticeBar';
import { useScrollTrigger } from '@/hooks/useScrollTrigger';
import { cn } from '@heroui/react';
import { HeaderContent } from './HeaderContent';
import type { MegaMenuProps } from './MegaMenu';

type HeaderProps = {
  collections: MegaMenuProps['collections'];
  noticebar: null | NoticeBarProps['item'];
};

export function Header({ collections, noticebar }: HeaderProps) {
  const trigger = useScrollTrigger({
    threshold: noticebarHeight,
  });
  return (
    <div
      className={cn(
        'fixed top-0 right-0 left-0 z-[40] w-full transition-transform duration-300 ease-in-out'
      )}
      style={{
        transform: trigger
          ? `translateY(-${noticebarHeight}px)`
          : 'translateY(0)',
      }}
    >
      {noticebar ? <NoticeBar item={noticebar} /> : null}
      <HeaderContent collections={collections} noticebarHidden={trigger} />
    </div>
  );
}
