import { registerApolloClient } from '@apollo/client-integration-nextjs';
import { fetchClient } from './fetchClient';

export const { getClient, PreloadQuery } = registerApolloClient(() => {
  return fetchClient;
});

export const rsc = getClient;
