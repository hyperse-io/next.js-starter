import { type Metadata } from 'next';
import { AnimateWrapper } from '@/components/AnimateWrapper';
import { LayoutWrapper } from '@/components/LayoutWrapper';
import { genPageMetadata } from '@/config/seo';
import { strCapitalizeAll } from '@dimjs/utils';

export const metadata: Metadata = genPageMetadata({
  title: 'Tailwind CSS Color Generator',
});

export default function Home() {
  return (
    <LayoutWrapper>
      <AnimateWrapper>
        <div data-aos="fade-up">{strCapitalizeAll('hyperse')}</div>
        <div data-aos="fade-up">next.js starter infrastructure</div>
      </AnimateWrapper>
    </LayoutWrapper>
  );
}
