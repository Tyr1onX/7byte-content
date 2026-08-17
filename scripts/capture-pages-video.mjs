import fs from 'node:fs/promises';
import path from 'node:path';
import {chromium} from 'playwright';

const url = process.env.CAPTURE_URL ?? 'http://127.0.0.1:4173/7byte-content/?capture=1';
const durationMs = Number(process.env.CAPTURE_DURATION_MS ?? 100500);
const output = path.resolve(process.env.CAPTURE_OUTPUT ?? 'output/ep001-silent.webm');

await fs.mkdir(path.dirname(output), {recursive: true});

const browser = await chromium.launch({
  headless: true,
  args: ['--autoplay-policy=no-user-gesture-required'],
});

try {
  const page = await browser.newPage({
    viewport: {width: 1080, height: 1920},
    deviceScaleFactor: 1,
  });

  page.on('console', message => {
    console.log(`[browser:${message.type()}] ${message.text()}`);
  });
  page.on('pageerror', error => {
    console.error('[browser:pageerror]', error);
  });

  await page.goto(url, {waitUntil: 'networkidle', timeout: 60000});
  await page.waitForFunction(
    () => document.querySelector('#status')?.getAttribute('data-state') === 'ready',
    {timeout: 30000},
  );

  const downloadPromise = page.waitForEvent('download', {timeout: durationMs + 60000});

  await page.evaluate(async ({durationMs}) => {
    const player = document.querySelector('#player');
    if (!(player instanceof HTMLElement)) {
      throw new Error('motion-canvas-player not found');
    }

    const canvas = player.shadowRoot?.querySelector('canvas.canvas');
    if (!(canvas instanceof HTMLCanvasElement)) {
      throw new Error('Motion Canvas render canvas not found');
    }

    const mimeCandidates = [
      'video/webm;codecs=vp9',
      'video/webm;codecs=vp8',
      'video/webm',
    ];
    const mimeType = mimeCandidates.find(candidate => MediaRecorder.isTypeSupported(candidate));
    if (!mimeType) {
      throw new Error('No supported MediaRecorder WebM codec found');
    }

    const stream = canvas.captureStream(30);
    const recorder = new MediaRecorder(stream, {
      mimeType,
      videoBitsPerSecond: 8_000_000,
    });
    const chunks = [];

    recorder.addEventListener('dataavailable', event => {
      if (event.data.size > 0) chunks.push(event.data);
    });

    const stopped = new Promise(resolve => recorder.addEventListener('stop', resolve, {once: true}));
    recorder.start(1000);

    const start = window.__SEVENBYTE_START_CAPTURE_PLAYBACK__;
    if (typeof start !== 'function') {
      recorder.stop();
      throw new Error('Capture playback hook is unavailable');
    }
    start();

    await new Promise(resolve => setTimeout(resolve, durationMs));
    recorder.stop();
    await stopped;

    const blob = new Blob(chunks, {type: mimeType});
    const href = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = href;
    anchor.download = 'ep001-silent.webm';
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(href), 5000);
  }, {durationMs});

  const download = await downloadPromise;
  await download.saveAs(output);
  const stat = await fs.stat(output);
  console.log(`Captured ${output} (${(stat.size / 1024 / 1024).toFixed(2)} MiB)`);
} finally {
  await browser.close();
}
