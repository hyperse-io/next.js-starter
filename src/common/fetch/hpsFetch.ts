import { setCookie } from 'cookies-next';
import { channelTokenKey, cookieAuthTokenKey } from '@/config/constants';
import { getCookieOptions } from '@/config/getCookieOptions';
import type { BaseHttpLink } from '@apollo/client/link/http';
import { modifyQueryString } from '@dimjs/utils';

/**
 * A custom fetch function that sets the cookie on the client side.
 * @param uri - The URI to fetch.
 * @param options - The options to fetch.
 * @returns The response from the fetch.
 */
export const hpsFetch: BaseHttpLink.Options['fetch'] = async (uri, options) => {
  const headers = options?.headers || {};
  const languageCode = (headers as any)['languagecode'];
  const channelToken = (headers as any)['channeltoken'];
  if (languageCode) {
    uri = uri + '?languageCode=' + languageCode;
  }
  delete (headers as any)['languagecode'];

  if (channelToken) {
    // hardcode `channel` to match `vendure-plugin-admin`, req.cookies.channel
    uri = modifyQueryString(uri.toString(), {
      [channelTokenKey]: channelToken,
    });
  }

  delete (headers as any)['channeltoken'];

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
};
