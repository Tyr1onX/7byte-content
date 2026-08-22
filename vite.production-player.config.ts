import path from 'node:path';
import {defineConfig} from 'vite';

const root = process.cwd();

// The player shell is intentionally built without the Motion Canvas Vite plugin.
// It loads the already-built project bundle through project-manifest.json.
export default defineConfig({
  root: path.resolve(root, 'production-player'),
  base: './',
  build: {
    outDir: path.resolve(root, 'dist-production'),
    emptyOutDir: true,
  },
});
