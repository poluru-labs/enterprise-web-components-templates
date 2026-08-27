import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  server: { port: 5176, host: true },
  preview: { port: 4176, host: true },
  build: { sourcemap: true, target: 'es2022' },
});
