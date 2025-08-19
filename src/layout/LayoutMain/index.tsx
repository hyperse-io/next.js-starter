import { type ReactNode } from 'react';
import { noticebarHeight } from '@/components/NoticeBar/NoticeBar';
import type { FooterTopicLink } from '@/views/FooterBlock';
import { FooterBlock } from '@/views/FooterBlock';
import { cn } from '@heroui/react';
import { Header } from './Header';
import type { MegaMenuItem } from './Header/MegaMenu/MegaMenuItem';

interface Props {
  children: ReactNode;
  collections: Array<MegaMenuItem>;
  footerLinks: Array<FooterTopicLink>;
}

export function LayoutMain({ children, footerLinks, collections }: Props) {
  // get noticebar
  const noticebar = {
    title: 'this is a notice bar',
    href: '/',
    terms: [],
  };

  return (
    <>
      <Header collections={collections} noticebar={noticebar} />
      <div
        className={cn('min-h-[calc(100vh-110px)]')}
        style={{
          paddingTop: `${noticebarHeight + 60}px`,
        }}
      >
        {children}
      </div>
      <FooterBlock footerLinks={footerLinks} />
    </>
  );
}
