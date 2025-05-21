// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://vbprodev.github.io/decimal-and-balanced-ternary-converter/',
  base: '/decimal-and-balanced-ternary-converter/',
  vite: {
    build: {
      assetsInlineLimit: 0, // Ensures worker files are always emitted as separate files
    },
    worker: {
      format: 'es', // Use ES modules format for workers
    },
  },
});
