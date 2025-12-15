import { defineConfig, reactjs } from '@hyperse/eslint-config-hyperse';

export default defineConfig(
  [
    ...reactjs,
    {
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-deprecated': 'off',
        'tailwindcss/no-custom-classname': 'off',
        'react-hooks/exhaustive-deps': 'off',
        'no-restricted-imports': [
          'error',
          {
            patterns: ['@issilo/*/*'],
          },
        ],
      },
    },
  ],
  ['**/types.d/*.ts']
);
