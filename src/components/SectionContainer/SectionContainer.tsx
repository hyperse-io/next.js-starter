import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export function SectionContainer({ children }: Props) {
  return (
    <section className="mx-auto container px-4 sm:px-6">{children}</section>
  );
}
