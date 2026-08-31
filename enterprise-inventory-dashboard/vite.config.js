import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  server: { port: 5183, host: true },
  preview: { port: 4183, host: true },
  build: { sourcemap: true, target: 'es2022' },
});
