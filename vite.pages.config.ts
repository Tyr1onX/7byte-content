import {defineConfig} from 'vite';

const isGitHubPages = process.env.GITHUB_PAGES === 'true';

export default defineConfig({
  root: 'pages-preview',
  base: isGitHubPages ? '/7byte-content/' : '/',
  build: {
    outDir: '../dist',
    emptyOutDir: false,
  },
});
