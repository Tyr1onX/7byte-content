import {defineConfig} from 'vite';
import motionCanvas from '@motion-canvas/vite-plugin';

const isGitHubPages = process.env.GITHUB_PAGES === 'true';

export default defineConfig({
  base: isGitHubPages ? '/7byte-content/' : '/',
  plugins: [
    motionCanvas({
      project: [
        './episodes/001-what-happens-after-entering-baidu/src/project.ts',
      ],
    }),
  ],
});
