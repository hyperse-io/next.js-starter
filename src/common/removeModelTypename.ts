import { removePropertiesBy } from '@dimjs/utils';

/**
 * Remove the `__typename` property from the data before sending to the server.
 * @param data - The data to remove the `__typename` property from.
 * @returns The data without the `__typename` property.
 */
export const removeModelTypename = <T>(data: T): Omit<T, '__typename'> => {
  return removePropertiesBy(data, (_, key) => key === '__typename') as T;
};
