import {
  CombinedGraphQLErrors,
  CombinedProtocolErrors,
} from '@apollo/client/errors';
import { ErrorLink } from '@apollo/client/link/error';
import { logger } from '../logger';

export const errorLink = new ErrorLink(({ error /* operation, forward*/ }) => {
  if (CombinedGraphQLErrors.is(error)) {
    error.errors.forEach(({ message, locations, path }) =>
      logger.error({
        message: `${message}, Location: ${locations}, Path: ${path}`,
        prefix: `GraphQL error`,
      })
    );
  } else if (CombinedProtocolErrors.is(error)) {
    error.errors.forEach(({ message, extensions }) =>
      logger.error({
        message: `${message}, Extensions: ${JSON.stringify(extensions)}`,
        prefix: `Protocol error`,
      })
    );
  } else {
    logger.error({
      message: `${error}`,
      prefix: `Network error`,
    });
  }

  // return forward(operation);
});
