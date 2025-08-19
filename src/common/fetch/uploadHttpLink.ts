import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';
import { setCookie } from 'cookies-next';
import { cookieAuthTokenKey } from '@/config/constants';
import { getCookieOptions } from '@/config/getCookieOptions';

export const uploadLink = createUploadLink({
  // this needs to be an absolute url, as relative urls cannot be used in SSR
  uri: process.env.NEXT_PUBLIC_SHOP_API || 'http://localhost:3001/shop-api',
  // you can disable result caching here if you want to
  // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
  fetchOptions: { credentials: 'include' },
  // you can override the default `fetchOptions` on a per query basis
  // via the `context` property on the options passed as a second argument
  // to an Apollo Client data fetching hook, e.g.:
  // const { data } = useSuspenseQuery(MY_QUERY, { context: { fetchOptions: { cache: "force-cache" }}});
  fetch: async (uri, options) => {
    const headers = options?.headers || {};
    const languageCode = (headers as any)['languagecode'];
    if (languageCode) {
      uri = uri + '?languageCode=' + languageCode;
      delete (headers as any)['languagecode'];
    }
    const response = await fetch(uri, options);
    const respHeaders = response.headers;
    const token = respHeaders.get('auth-token');
    if (token) {
      const { maxAge, expires } = getCookieOptions();
      // NOTE: expect set cookie on client side here.
      await setCookie(cookieAuthTokenKey, token, {
        maxAge,
        expires,
      });
    }
    return response;
  },
});
