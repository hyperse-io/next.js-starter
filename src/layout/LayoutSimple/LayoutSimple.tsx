import { type ReactNode } from 'react';
import { noticebarHeight } from '@/components/NoticeBar/NoticeBar';
import type { FooterTopicLink } from '@/views/FooterBlock';
import { FooterBlock } from '@/views/FooterBlock';
import { cn } from '@heroui/react';

interface Props {
  children: ReactNode;
  footerLinks: Array<FooterTopicLink>;
}

export function LayoutSimple({ children, footerLinks }: Props) {
  return (
    <>
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
