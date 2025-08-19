import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import { cacheTypePolicies } from './fetch/cacheTypePolicies';
import { clientDefaultOptions } from './fetch/clientDefaultOptions';
import { errorLink } from './fetch/errorLink';
import { getContextLink } from './fetch/getContextLink';
import { httpLink } from './fetch/httpLink';
import { setContextLink } from './fetch/setContextLink';

export const fetchClient = new ApolloClient({
  cache: new InMemoryCache({ typePolicies: cacheTypePolicies }),
  link: ApolloLink.from([getContextLink, setContextLink, errorLink, httpLink]),
  // https://www.apollographql.com/docs/react/api/core/ApolloClient#defaultoptions
  defaultOptions: clientDefaultOptions,
});
