import { defineConfig, nextjs } from '@hyperse/eslint-config-hyperse';

export default defineConfig([
  ...nextjs,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-deprecated': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      'tailwindcss/no-custom-classname': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'sonarjs/prefer-read-only-props': 'off',
      'react/no-unknown-property': 'off',
      'no-restricted-imports': [
        'error',
        {
          patterns: ['@issilo/*/*'],
        },
      ],
    },
  },
]);
