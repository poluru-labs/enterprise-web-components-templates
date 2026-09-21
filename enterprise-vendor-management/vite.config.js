import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  root: fileURLToPath(new URL('.', import.meta.url)),
  base: './',
  server: { port: 5178, host: true },
  preview: { port: 4178, host: true },
  build: { sourcemap: true, target: 'es2022' },
  test: {
    environment: 'jsdom',
    setupFiles: fileURLToPath(new URL('./src/test/setup.js', import.meta.url)),
  },
});
