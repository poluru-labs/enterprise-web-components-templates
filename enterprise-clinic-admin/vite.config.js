import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  server: { port: 5175, host: true },
  preview: { port: 4175, host: true },
  build: { sourcemap: true, target: 'es2022' },
});
