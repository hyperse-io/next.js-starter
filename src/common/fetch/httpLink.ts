import { HttpLink } from '@apollo/client';
import { hpsFetch } from './hpsFetch';

/**
 * The http link includes ClientAwarenessLink & BaseHttpLink
 */
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
  fetch: hpsFetch,
});
