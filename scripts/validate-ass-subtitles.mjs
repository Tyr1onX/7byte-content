import fs from 'node:fs';

const args = process.argv.slice(2);
const file = args.find(arg => !arg.startsWith('--'));
const singleLine = args.includes('--single-line');

if (!file) {
  console.error('Usage: node scripts/validate-ass-subtitles.mjs <file.ass> [--single-line]');
  process.exit(2);
}

const text = fs.readFileSync(file, 'utf8');
const dialogue = text
  .split(/\r?\n/)
  .filter(line => line.startsWith('Dialogue:'));

const errors = [];

for (const [index, line] of dialogue.entries()) {
  const n = index + 1;

  // In ASS, a real forced line break is exactly one backslash + N: \N.
  // Two backslashes serialize one visible backslash and caused the EP002 V4 bug.
  if (line.includes('\\\\N')) {
    errors.push(`Dialogue ${n}: contains \\\\N (double-escaped newline; renders a visible backslash)`);
  }

  if (singleLine && line.includes('\\N')) {
    errors.push(`Dialogue ${n}: contains a forced newline in single-line mode`);
  }

  // Any other visible backslash in subtitle text is suspicious for 7BYTE prose.
  const payload = line.split(',,').at(-1) ?? '';
  if (/\\(?!N)/.test(payload)) {
    errors.push(`Dialogue ${n}: contains an unexpected visible backslash: ${payload}`);
  }
}

if (errors.length > 0) {
  console.error('ASS subtitle validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`ASS subtitle validation passed (${dialogue.length} dialogue lines${singleLine ? ', single-line mode' : ''}).`);
