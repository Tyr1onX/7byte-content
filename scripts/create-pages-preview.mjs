import {promises as fs} from 'node:fs';
import path from 'node:path';

const dist = path.resolve('dist');
const publicDir = path.resolve('pages-preview/public');

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
await fs.mkdir(publicDir, {recursive: true});
await fs.writeFile(
  path.join(publicDir, 'project-manifest.js'),
  `window.__SEVENBYTE_PROJECT_PATH__ = ${JSON.stringify(projectPath)};\n`,
  'utf8',
);

console.log(`Pages project manifest created for ${projectPath}`);
