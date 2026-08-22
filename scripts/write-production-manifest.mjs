import fs from 'node:fs/promises';
import path from 'node:path';

const dist = path.resolve(process.argv[2] ?? 'dist-production');

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
const projects = files.filter(file => /(^|[\\/])project-[^\\/]+\.js$/.test(file));

if (projects.length !== 1) {
  throw new Error(`Expected exactly one Motion Canvas project bundle, found ${projects.length}: ${projects.join(', ')}`);
}

const project = `./${path.relative(dist, projects[0]).split(path.sep).join('/')}`;
await fs.writeFile(
  path.join(dist, 'project-manifest.json'),
  JSON.stringify({project}, null, 2) + '\n',
  'utf8',
);
console.log(`Production project manifest: ${project}`);
