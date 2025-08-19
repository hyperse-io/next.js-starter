import { onError } from '@apollo/client/link/error';

export const errorLink = onError((args) => {
  const { graphQLErrors, networkError } = args;
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, path }) =>
      // maybe sentry logging?
      console.log(`[GraphQL error]: Message: ${message},Path: ${path}.`)
    );
  if (networkError) console.error(`[Network error]: ${networkError}`);
});
