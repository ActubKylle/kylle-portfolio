import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// `npm run build` runs two builds: the browser bundle into build/, then a
// server bundle into build-server/ that scripts/prerender.js uses to write
// static HTML for every page.
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  build: {
    outDir: isSsrBuild ? 'build-server' : 'build',
    copyPublicDir: !isSsrBuild,
  },
  server: { port: 3000 },
  preview: { port: 4173 },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js',
  },
}));
