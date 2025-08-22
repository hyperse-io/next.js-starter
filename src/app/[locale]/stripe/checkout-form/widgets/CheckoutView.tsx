import { OrderSummaryCard } from '@/views/OrderSummary/OrderSummaryCard';
import { CheckoutForm } from './CheckoutForm';

export const CheckoutView = () => {
  return (
    <div className="grid grid-cols-1 gap-12 py-12 md:grid-cols-2">
      <OrderSummaryCard />
      <CheckoutForm />
    </div>
  );
};
