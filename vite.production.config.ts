import path from 'node:path';
import {defineConfig} from 'vite';
import motionCanvas from '@motion-canvas/vite-plugin';

const project = process.env.SEVENBYTE_PROJECT;
if (!project) {
  throw new Error('SEVENBYTE_PROJECT is required for a production build.');
}

const root = process.cwd();

export default defineConfig({
  root: path.resolve(root, 'production-player'),
  base: './',
  plugins: [
    motionCanvas({
      project: [path.resolve(root, project)],
    }),
  ],
  build: {
    outDir: path.resolve(root, 'dist-production'),
    emptyOutDir: true,
  },
});
