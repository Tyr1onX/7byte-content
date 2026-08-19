import {defineConfig} from 'vite';
import motionCanvas from '@motion-canvas/vite-plugin';

const isGitHubPages = process.env.GITHUB_PAGES === 'true';

export default defineConfig({
  base: isGitHubPages ? '/7byte-content/' : '/',
  plugins: [
    motionCanvas({
      project: [
        './episodes/002-wifi-full-signal/src/project.ts',
        './episodes/003-bandwidth-vs-download-speed/src/project.ts',
      ],
    }),
  ],
});
