// https://github.com/apollographql/apollo-client/issues/2441
import { ApolloLink } from '@apollo/client';

export const setContextLink = new ApolloLink((operation, forward) => {
  const { authToken, activeLanguage, activeChannel } = operation.getContext();
  operation.setContext(() => ({
    headers: {
      channel: activeChannel || '',
      languageCode: activeLanguage || 'en',
      Authorization: authToken ? `Bearer ${authToken}` : '',
    },
  }));
  return forward(operation);
});
