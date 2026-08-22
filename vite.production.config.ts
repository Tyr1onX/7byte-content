import fs from 'node:fs';
import path from 'node:path';
import {defineConfig} from 'vite';
import motionCanvas from '@motion-canvas/vite-plugin';

const project = process.env.SEVENBYTE_PROJECT;
if (!project) {
  throw new Error('SEVENBYTE_PROJECT is required for a production build.');
}

const root = process.cwd();
const playerRoot = path.resolve(root, 'production-player');
const selectedProject = path.resolve(playerRoot, 'selected-project.ts');
const targetProject = path.resolve(root, project);
const importPath = path.relative(playerRoot, targetProject).split(path.sep).join('/');
const normalizedImport = importPath.startsWith('.') ? importPath : `./${importPath}`;

// Motion Canvas uses the project entry path when naming Rollup chunks. Keep the plugin
// entry stable and relative, then let that entry re-export the selected episode project.
fs.writeFileSync(
  selectedProject,
  `export {default} from ${JSON.stringify(normalizedImport)};\n`,
  'utf8',
);

export default defineConfig({
  root: playerRoot,
  base: './',
  plugins: [
    motionCanvas({
      project: ['./selected-project.ts'],
    }),
  ],
  build: {
    outDir: path.resolve(root, 'dist-production'),
    emptyOutDir: true,
  },
});
