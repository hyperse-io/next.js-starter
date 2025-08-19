import { getCookie } from 'cookies-next';
import {
  cookieActiveLocale,
  cookieAuthTokenKey,
  storageActiveChannelKey,
} from '@/config/constants';
import { setContext } from '@apollo/client/link/context';

export const getContextLink = setContext(async (_, prevContext) => {
  // active channel
  const activeChannel =
    prevContext[storageActiveChannelKey] ||
    (typeof window !== 'undefined'
      ? localStorage.getItem(storageActiveChannelKey)
      : '');
  // active languageCode
  const activeLanguage =
    prevContext[cookieActiveLocale] || (await getCookie(cookieActiveLocale));
  // get active authToken from cookie both on client side or server side.
  const authToken = await getCookie(cookieAuthTokenKey);
  return { activeLanguage, activeChannel, authToken };
});
