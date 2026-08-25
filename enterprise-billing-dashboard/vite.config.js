import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  server: { port: 5174, host: true },
  preview: { port: 4174, host: true },
  build: { sourcemap: true, target: 'es2022' },
});
