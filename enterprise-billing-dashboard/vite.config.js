import { defineConfig } from 'vitest/config';

export default defineConfig({
  base: './',
  server: { port: 5174, host: true },
  preview: { port: 4174, host: true },
  build: { sourcemap: true, target: 'es2022' },
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
  },
});
