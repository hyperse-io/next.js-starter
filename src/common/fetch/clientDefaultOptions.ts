import type { DefaultOptions } from '@apollo/client';

/**
 * https://www.apollographql.com/docs/react/api/core/ApolloClient#defaultoptions
 */
export const clientDefaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'ignore',
  },
  query: {
    // Note: we must keep this fetchPolicy, because we need to get the latest data from server
    // e.g. Step1 -> Step2 -> Step3, when we go back to Step1, choose another option, jump to Step2, we need to get the latest data from server
    // because the Query of Step2 should always need to get the latest data from server, cause of Step1 selected option is changed.
    // Step2 depends on Step1, so we need to get the latest data from server.
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  },
  mutate: {
    errorPolicy: 'all',
  },
};
