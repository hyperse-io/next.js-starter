'use client';

import { type PropsWithChildren } from 'react';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';
import { getCookie, setCookie } from 'cookies-next';
import {
  cookieActiveLocale,
  cookieAuthTokenKey,
  storageActiveChannelKey,
} from '@/config/constants';
import { getCookieOptions } from '@/config/cookie';
import { ApolloLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import {
  ApolloClient,
  ApolloNextAppProvider,
  InMemoryCache,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support';

// have a function to create a client for you
function makeClient() {
  const uploadLink = createUploadLink({
    // this needs to be an absolute url, as relative urls cannot be used in SSR
    uri: process.env.NEXT_PUBLIC_SHOP_API || 'http://localhost:3001/shop-api',
    // you can disable result caching here if you want to
    // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
    fetchOptions: { credentials: 'include' },
    // you can override the default `fetchOptions` on a per query basis
    // via the `context` property on the options passed as a second argument
    // to an Apollo Client data fetching hook, e.g.:
    // const { data } = useSuspenseQuery(MY_QUERY, { context: { fetchOptions: { cache: "force-cache" }}});
    fetch: (uri, options) => {
      const headers = options?.headers || {};
      const languageCode = (headers as any)['languagecode'];
      if (languageCode) {
        uri = uri + '?languageCode=' + languageCode;
        delete (headers as any)['languagecode'];
      }
      return fetch(uri, options).then((response) => {
        const respHeaders = response.headers;
        const token = respHeaders.get('auth-token');
        if (token) {
          const { maxAge, expires } = getCookieOptions();
          setCookie(cookieAuthTokenKey, token, {
            maxAge,
            expires,
          });
        }
        return response;
      });
    },
  });

  const withContext = setContext(async () => {
    const activeChannel = localStorage.getItem(storageActiveChannelKey);
    const activeLanguage = getCookie(cookieActiveLocale);
    const authToken = getCookie(cookieAuthTokenKey);
    return { activeLanguage, activeChannel, authToken };
  });

  const contextMiddleware = new ApolloLink((operation, forward) => {
    const { authToken, activeLanguage, activeChannel } = operation.getContext();
    operation.setContext(() => ({
      headers: {
        Authorization: authToken ? `Bearer ${authToken}` : '',
        channel: activeChannel || '',
        languageCode: activeLanguage || 'en',
      },
    }));
    return forward(operation);
  });

  return new ApolloClient({
    // use the `InMemoryCache`, not the normal `InMemoryCache`
    cache: new InMemoryCache(),
    link:
      typeof window === 'undefined'
        ? from([
            // in a SSR environment, if you use multipart features like
            // @defer, you need to decide how to handle these.
            // This strips all interfaces with a `@defer` directive from your queries.
            new SSRMultipartLink({
              stripDefer: true,
            }),
            withContext,
            contextMiddleware.concat(uploadLink),
          ])
        : from([withContext, contextMiddleware.concat(uploadLink)]),
    connectToDevTools: process.env.NODE_ENV === 'development',
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
