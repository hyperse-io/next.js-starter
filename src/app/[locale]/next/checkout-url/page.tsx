import { cn } from '@heroui/react';
import { CheckoutIndex } from './widgets/CheckoutIndex';

export default async function Pages() {
  return (
    <div className={cn('min-h-[calc(100vh-110px)]')}>
      <CheckoutIndex />
    </div>
  );
}
