import {defineConfig} from 'vite';
import motionCanvas from '@motion-canvas/vite-plugin';

export default defineConfig({
  plugins: [
    motionCanvas({
      project: [
        './episodes/001-what-happens-after-entering-baidu/src/project.ts',
      ],
    }),
  ],
});
