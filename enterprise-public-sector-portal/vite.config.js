import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  server: { port: 5184, host: true },
  preview: { port: 4184, host: true },
  build: { sourcemap: true, target: 'es2022' },
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
  },
});
