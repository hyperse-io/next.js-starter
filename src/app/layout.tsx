import { type ReactNode } from 'react';
import { InspectorProvider } from '@hyperse/next-inspector/client';
import '@/theme/globals.css';

type Props = {
  children: ReactNode;
};

// Since we have a root `not-found.tsx` page, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({ children }: Props) {
  return (
    <>
      {process.env.NODE_ENV === 'development' && <InspectorProvider />}
      {children}
    </>
  );
}
