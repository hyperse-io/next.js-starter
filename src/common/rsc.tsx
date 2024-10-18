import { getCookie, setCookie } from 'cookies-next';
import { cookieActiveLocale, cookieAuthTokenKey } from '@/config/constants';
import { getCookieOptions } from '@/config/cookie';
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support';

const httpLink = new HttpLink({
  // this needs to be an absolute url, as relative urls cannot be used in SSR
  uri: process.env.NEXT_PUBLIC_SHOP_API || 'http://localhost:3001/shop-api',
  // you can disable result caching here if you want to
  // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
  // Disabling RSC fetch caching
  fetchOptions: { cache: 'force-cache' },
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

// https://github.com/apollographql/apollo-client/issues/2441
const authMiddleware = new ApolloLink((operation, forward) => {
  const { authToken, activeLanguage } = operation.getContext();
  operation.setContext(() => ({
    headers: {
      Authorization: authToken ? `Bearer ${authToken}` : '',
      languageCode: activeLanguage || 'en',
    },
  }));
  return forward(operation);
});

const withToken = setContext(async (_, prevContext) => {
  const activeLanguage =
    prevContext[cookieActiveLocale] || getCookie(cookieActiveLocale);
  const authToken = getCookie(cookieAuthTokenKey);
  return { activeLanguage, authToken };
});

export const { getClient, PreloadQuery } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        Product: {
          fields: {
            customFields: {
              merge(existing, incoming, { mergeObjects }) {
                return mergeObjects(existing, incoming);
              },
            },
          },
        },
      },
    }),
    link: ApolloLink.from([withToken, authMiddleware.concat(httpLink)]),
  });
});

export const rsc = getClient;
