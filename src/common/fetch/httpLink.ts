import { setCookie } from 'cookies-next';
import { cookieAuthTokenKey } from '@/config/constants';
import { getCookieOptions } from '@/config/getCookieOptions';
import { HttpLink } from '@apollo/client';

export const httpLink = new HttpLink({
  // this needs to be an absolute url, as relative urls cannot be used in SSR
  uri: process.env.NEXT_PUBLIC_SHOP_API || 'http://localhost:3001/shop-api',
  // you can disable result caching here if you want to
  // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
  // Disabling RSC fetch caching
  fetchOptions: {
    credentials: 'include',
    next: {
      // (in seconds) Specify the resource should have a cache lifetime of at most n seconds.
      revalidate: 60, // 1 minute
    },
  },
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
      // NOTE: expect set cookie on server side here.
      await setCookie(cookieAuthTokenKey, token, {
        maxAge,
        expires,
      });
    }
    return response;
  },
});
