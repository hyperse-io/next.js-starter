'use client';

import { type PropsWithChildren } from 'react';
import { cacheTypePolicies } from '@/common/fetch/cacheTypePolicies';
import { errorLink } from '@/common/fetch/errorLink';
import { getContextLink } from '@/common/fetch/getContextLink';
import { setContextLink } from '@/common/fetch/setContextLink';
import { uploadLink } from '@/common/fetch/uploadHttpLink';
import { from } from '@apollo/client';
import {
  ApolloClient,
  ApolloNextAppProvider,
  InMemoryCache,
} from '@apollo/client-integration-nextjs';

// have a function to create a client for you
function makeClient() {
  return new ApolloClient({
    // use the `InMemoryCache` exported from `experimental-nextjs-app-support`
    cache: new InMemoryCache({
      typePolicies: cacheTypePolicies,
    }),
    link: from([getContextLink, setContextLink, errorLink, uploadLink]),
    connectToDevTools: process.env.NODE_ENV === 'development',
    // Note: we must keep default fetchPolicy for client, for special case, we need to get the latest data from server we can
    // override it via query context.
    // defaultOptions: clientDefaultOptions,
  });
}

// you need to create a component to wrap your app in
export function Apollo({ children }: PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
