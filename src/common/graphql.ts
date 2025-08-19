import { initGraphQLTada } from 'gql.tada';
import type { introspection } from './graphql-env.d.ts';

export const graphql = initGraphQLTada<{
  introspection: introspection;
  disableMasking: true;
  scalars: {
    JSON: any;
    Money: number;
    DateTime: string;
  };
}>();
