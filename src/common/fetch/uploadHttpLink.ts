import { ApolloLink } from '@apollo/client';
import { ClientAwarenessLink } from '@apollo/client/link/client-awareness';
import { UploadHttpLink } from '@hyperse/apollo-upload-client';
import { hpsFetch } from './hpsFetch';

// This is a terminating link that wraps the `HttpLink` internals and should be the last link in the chain
export const uploadHttpLink = new UploadHttpLink({
  // this needs to be an absolute url, as relative urls cannot be used in SSR
  uri: process.env.NEXT_PUBLIC_SHOP_API || 'http://localhost:3001/shop-api',
  // you can disable result caching here if you want to
  // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
  fetchOptions: { credentials: 'include' },
  // you can override the default `fetchOptions` on a per query basis
  // via the `context` property on the options passed as a second argument
  // to an Apollo Client data fetching hook, e.g.:
  // const { data } = useSuspenseQuery(MY_QUERY, { context: { fetchOptions: { cache: "force-cache" }}});
  fetch: hpsFetch,
});

export const uploadLink = ApolloLink.from([
  new ClientAwarenessLink(),
  uploadHttpLink,
]);
