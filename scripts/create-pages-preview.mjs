import {promises as fs} from 'node:fs';
import path from 'node:path';

const dist = path.resolve('dist');

async function walk(dir) {
  const entries = await fs.readdir(dir, {withFileTypes: true});
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(full));
    else files.push(full);
  }
  return files;
}

const files = await walk(dist);
const projectFile = files.find(file => /(^|[\\/])project-[^\\/]+\.js$/.test(file));

if (!projectFile) {
  throw new Error('Motion Canvas project bundle was not found in dist/.');
}

const projectPath = path.relative(dist, projectFile).split(path.sep).join('/');
const [owner, repo] = (process.env.GITHUB_REPOSITORY ?? 'Tyr1onX/7byte-content').split('/');
const siteBase = `https://${owner.toLowerCase()}.github.io/${repo}/`;
const projectSrc = new URL(projectPath, siteBase).href;

const html = `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>7BYTE · Episode Preview</title>
  <style>
    * { box-sizing: border-box; }
    html, body { margin: 0; min-height: 100%; background: #0d0e0c; color: #f2f0e7; font-family: Inter, "PingFang SC", "Microsoft YaHei", sans-serif; }
    body { min-height: 100vh; display: grid; place-items: center; padding: 24px; }
    main { width: min(100%, 560px); }
    header { display: flex; align-items: baseline; justify-content: space-between; gap: 16px; margin-bottom: 14px; }
    h1 { margin: 0; font-size: 18px; letter-spacing: .08em; }
    small { color: #969a90; }
    .frame { position: relative; width: 100%; aspect-ratio: 9 / 16; border: 1px solid #30332d; border-radius: 18px; overflow: hidden; background: #111210; box-shadow: 0 24px 80px rgba(0,0,0,.35); }
    motion-canvas-player { display: block; width: 100%; height: 100%; }
    .hint { position: absolute; left: 50%; bottom: 18px; translate: -50% 0; z-index: 2; pointer-events: none; padding: 7px 11px; border: 1px solid #34382f; border-radius: 999px; background: rgba(17,18,16,.82); color: #b9bcb3; font-size: 12px; white-space: nowrap; }
    p { margin: 12px 2px 0; color: #8f9389; font-size: 13px; line-height: 1.6; }
  </style>
  <script type="importmap">
    {"imports":{"@motion-canvas/core":"https://esm.sh/@motion-canvas/core@3.17.2"}}
  </script>
  <script type="module" src="https://cdn.jsdelivr.net/npm/@motion-canvas/player@3.17.2/dist/main.js"></script>
</head>
<body>
  <main>
    <header>
      <h1>7BYTE · EP.001</h1>
      <small>Pages preview</small>
    </header>
    <div class="frame">
      <motion-canvas-player src="${projectSrc}" width="1080" height="1920" quality="0.5"></motion-canvas-player>
      <div class="hint">点击画面开始播放</div>
    </div>
    <p>此页面只用于远程验收 Motion Canvas 动画，不替代本地编辑器。</p>
  </main>
</body>
</html>`;

await fs.writeFile(path.join(dist, 'index.html'), html, 'utf8');
console.log(`Pages preview created for ${projectSrc}`);
