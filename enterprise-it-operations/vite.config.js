import { defineConfig } from 'vite';

export default defineConfig({
  root: new URL('.', import.meta.url).pathname,
  base: './',
  server: { port: 5188, host: '127.0.0.1', strictPort: true },
  preview: { port: 4188, host: '127.0.0.1' },
  build: { sourcemap: true, target: 'es2022' },
  test: {
    environment: 'jsdom',
    setupFiles: new URL('./src/test/setup.js', import.meta.url).pathname,
  },
});
