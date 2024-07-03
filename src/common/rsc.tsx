import { cookies } from 'next/headers';
import { cookieAuthTokenKey } from '@/config/constants';
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';

const httpLink = new HttpLink({
  // this needs to be an absolute url, as relative urls cannot be used in SSR
  uri: process.env.NEXT_PUBLIC_SHOP_API || 'http://localhost:3001/shop-api',
  // you can disable result caching here if you want to
  // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
  // Disabling RSC fetch caching
  fetchOptions: { cache: 'no-store' },
});

// https://github.com/apollographql/apollo-client/issues/2441
const authMiddleware = new ApolloLink((operation, forward) => {
  const { token } = operation.getContext();
  operation.setContext(() => ({
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  }));
  return forward(operation);
});

const withToken = setContext(async () => {
  const token = cookies().get(cookieAuthTokenKey)?.value;
  return { token };
});

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([withToken, authMiddleware.concat(httpLink)]),
  });
});

export const rsc = getClient;
