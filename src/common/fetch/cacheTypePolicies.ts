import { type TypePolicies } from '@apollo/client';

export const cacheTypePolicies: TypePolicies = {
  UnionMain: {
    merge: false,
  },
  OrderLineCustomFields: {
    merge: false,
  },
  Product: {
    merge: false,
  },
  ProductCustomFields: {
    merge: false,
  },
  ProductVariant: {
    merge: false,
  },
  ProductVariantCustomFields: {
    merge: false,
  },
  Collection: {
    merge: false,
  },
  CollectionCustomFields: {
    merge: false,
  },
  CustomerCustomFields: {
    merge: false,
  },
  Facet: {
    merge: false,
  },
  FacetValue: {
    merge: false,
  },
  FacetValueCustomFields: {
    merge: false,
  },
  LensProcessOption: {
    // https://www.apollographql.com/docs/react/caching/cache-configuration#customizing-identifier-generation-globally
    // cause of we have duplicated id in LensProcessOption(T4), we need to use parentId to identify the unique item
    keyFields: ['id', 'parentId'],
  },
};
