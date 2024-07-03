import { base, defineConfig } from '@hyperse/eslint-config-hyperse';

export default defineConfig(
  [
    ...base,
    {
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-empty-object-type': 'off',
        'sonarjs/no-duplicate-string': 'off',
      },
    },
  ],
  ['**/.contentlayer', '**/config/tag-data.json']
);
