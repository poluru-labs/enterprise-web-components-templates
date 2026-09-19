import { defineConfig } from 'vite';

export default defineConfig({
  root: new URL('.', import.meta.url).pathname,
  base: './',
  server: { port: 5178, host: true },
  preview: { port: 4178, host: true },
  build: { sourcemap: true, target: 'es2022' },
  test: {
    environment: 'jsdom',
    setupFiles: new URL('./src/test/setup.js', import.meta.url).pathname,
  },
});
