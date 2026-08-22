import path from 'node:path';
import {defineConfig} from 'vite';
import motionCanvas from '@motion-canvas/vite-plugin';

const project = process.env.SEVENBYTE_PROJECT;
if (!project) {
  throw new Error('SEVENBYTE_PROJECT is required for a production build.');
}

const root = process.cwd();

// Motion Canvas resolves project entry paths from the repository/config context,
// not from an arbitrary Vite player root. Build the selected episode bundle here,
// then merge it into the standalone production player in the workflow.
export default defineConfig({
  root,
  base: './',
  plugins: [
    motionCanvas({
      project,
    }),
  ],
  build: {
    outDir: path.resolve(root, 'dist-production-project'),
    emptyOutDir: true,
  },
});
