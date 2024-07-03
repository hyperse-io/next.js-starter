import { fileURLToPath } from 'url';
import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: 'dotenv/config',
    globals: true,
    exclude: [...configDefaults.exclude, '**/playwright/**'],
    alias: {
      '@/': fileURLToPath(new URL('./src/', import.meta.url)),
    },
    passWithNoTests: true,
  },
});
