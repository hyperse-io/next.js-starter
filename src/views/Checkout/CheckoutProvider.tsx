'use client';
import { useReducer } from 'react';
import { getRandomProducts } from '@/hooks/useMockProducts';
import { CheckoutContextProvider } from './CheckoutContext';

function appReducer(state: any): any {
  return {
    ...state,
    mockData: getRandomProducts(),
  };
}

export const CheckoutProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state] = useReducer(appReducer, {
    mockData: getRandomProducts(),
  });

  return (
    <CheckoutContextProvider value={{ data: state.mockData }}>
      {children}
    </CheckoutContextProvider>
  );
};
