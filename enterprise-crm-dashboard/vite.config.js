import { defineConfig } from 'vitest/config';

export default defineConfig({
  base: './',
  server: { port: 5179, host: true },
  preview: { port: 4179, host: true },
  build: { sourcemap: true, target: 'es2022' },
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
  },
});
