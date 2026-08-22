import fs from 'node:fs/promises';
import path from 'node:path';

const episodeDir = process.argv[2];
const vttPath = process.argv[3];
const timingPath = process.argv[4] ?? 'output/timing.json';
const outPath = process.argv[5] ?? 'output/subtitles.ass';
if (!episodeDir || !vttPath) {
  throw new Error('usage: node scripts/vtt-to-ass.mjs <episode-dir> <vtt> [timing-json] [output-ass]');
}

const config = JSON.parse(await fs.readFile(path.join(episodeDir, 'production.json'), 'utf8'));
const timing = JSON.parse(await fs.readFile(timingPath, 'utf8'));
const vtt = await fs.readFile(vttPath, 'utf8');

const parseTime = value => {
  const parts = value.trim().split(':').map(Number);
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  return parts[0] * 60 + parts[1];
};
const assTime = seconds => {
  const cs = Math.max(0, Math.round(seconds * 100));
  const h = Math.floor(cs / 360000);
  const m = Math.floor((cs % 360000) / 6000);
  const s = Math.floor((cs % 6000) / 100);
  const c = cs % 100;
  return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}.${String(c).padStart(2, '0')}`;
};
const clean = value => value
  .replace(/<[^>]+>/g, '')
  .replace(/\{+/g, '〔')
  .replace(/\}+/g, '〕')
  .replace(/\s+/g, ' ')
  .trim();
const wrap = value => {
  if (value.length <= 26) return value;
  const punctuation = ['，', '。', '；', '：', '、', ',', ';', ':'];
  const middle = Math.floor(value.length / 2);
  let best = -1;
  let distance = Infinity;
  for (let i = 0; i < value.length; i += 1) {
    if (!punctuation.includes(value[i])) continue;
    const d = Math.abs(i - middle);
    if (d < distance) { best = i + 1; distance = d; }
  }
  if (best < 8 || best > value.length - 8) best = middle;
  return `${value.slice(0, best)}\\N${value.slice(best)}`;
};

const suppressBefore = timing.T[config.suppressSubtitleBeforePhase ?? 0] ?? 0;
const suppressAfter = timing.T[config.suppressSubtitleAtOrAfterPhase ?? timing.T.length] ?? timing.audioDuration;

const cues = [];
const lines = vtt.replace(/\r/g, '').split('\n');
for (let i = 0; i < lines.length; i += 1) {
  if (!lines[i].includes('-->')) continue;
  const [rawStart, rawEnd] = lines[i].split('-->').map(part => part.trim().split(/\s+/)[0]);
  const text = [];
  i += 1;
  while (i < lines.length && lines[i].trim() !== '') {
    text.push(lines[i]);
    i += 1;
  }
  const start = parseTime(rawStart);
  const end = parseTime(rawEnd);
  if (end <= suppressBefore || start >= suppressAfter) continue;
  const body = clean(text.join(''));
  if (!body) continue;
  cues.push({start: Math.max(start, suppressBefore), end: Math.min(end, suppressAfter), text: wrap(body)});
}

const header = `[Script Info]\nScriptType: v4.00+\nPlayResX: ${config.width}\nPlayResY: ${config.height}\nScaledBorderAndShadow: yes\nWrapStyle: 2\n\n[V4+ Styles]\nFormat: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding\nStyle: Default,Noto Sans CJK SC,46,&H00F4F1E8,&H00F4F1E8,&H00202020,&H00000000,-1,0,0,0,100,100,0,0,1,2.4,0,2,110,110,48,1\n\n[Events]\nFormat: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text\n`;
const events = cues.map(cue => `Dialogue: 0,${assTime(cue.start)},${assTime(cue.end)},Default,,0,0,0,,${cue.text}`).join('\n');

await fs.mkdir(path.dirname(outPath), {recursive: true});
await fs.writeFile(outPath, header + events + '\n', 'utf8');
console.log(`Generated ${cues.length} subtitle cues: ${outPath}`);
