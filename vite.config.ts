import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    chunkSizeWarningLimit: 2048,
    sourcemap: true,
  },
  plugins: [react(), tsconfigPaths()],
  css: {
    postcss: {
      plugins: [autoprefixer],
    },
  },
  server: {
    host: true,
    open: false,
  },
});
