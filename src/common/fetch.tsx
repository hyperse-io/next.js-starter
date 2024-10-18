import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support';

const httpLink = new HttpLink({
  // this needs to be an absolute url, as relative urls cannot be used in SSR
  uri: process.env.NEXT_PUBLIC_SHOP_API || 'http://localhost:3001/shop-api',
  // you can disable result caching here if you want to
  // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
  // Disabling RSC fetch caching
  fetchOptions: { cache: 'force-cache' },
});

// https://github.com/apollographql/apollo-client/issues/2441
const authMiddleware = new ApolloLink((operation, forward) => {
  return forward(operation);
});

export const { getClient: fetchClient, PreloadQuery } = registerApolloClient(
  () => {
    return new ApolloClient({
      cache: new InMemoryCache(),
      link: ApolloLink.from([authMiddleware.concat(httpLink)]),
    });
  }
);
