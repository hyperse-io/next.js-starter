import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import { SectionContainer } from '../SectionContainer/SectionContainer';

interface Props {
  children: ReactNode;
}

const inter = Inter({
  subsets: ['latin'],
});

export const LayoutWrapper = ({ children }: Props) => {
  return (
    <SectionContainer>
      <div
        className={`${inter.className} flex h-screen flex-col justify-between font-sans`}
      >
        <Header />
        <main className="mb-auto">{children}</main>
        <Footer />
      </div>
    </SectionContainer>
  );
};
