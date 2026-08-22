import '@motion-canvas/player';

declare global {
  interface Window {
    __SEVENBYTE_START_CAPTURE_PLAYBACK__?: () => void;
  }
}

const player = document.querySelector('#player') as HTMLElement | null;
const status = document.querySelector('#status') as HTMLElement | null;

if (!player || !status) {
  throw new Error('7BYTE production player shell is incomplete.');
}

const manifestResponse = await fetch('./project-manifest.json', {cache: 'no-store'});
if (!manifestResponse.ok) {
  throw new Error(`Unable to load project manifest: ${manifestResponse.status}`);
}
const manifest = await manifestResponse.json() as {project?: string};
if (!manifest.project) {
  throw new Error('Production project manifest does not contain a project path.');
}

player.setAttribute('src', new URL(manifest.project, window.location.href).href);

const waitUntilReady = () => new Promise<void>((resolve, reject) => {
  const startedAt = performance.now();
  const timer = window.setInterval(() => {
    const overlay = player.shadowRoot?.querySelector('.overlay');
    if (overlay?.classList.contains('state-ready')) {
      window.clearInterval(timer);
      resolve();
      return;
    }
    if (overlay?.classList.contains('state-error')) {
      window.clearInterval(timer);
      reject(new Error('Motion Canvas player entered error state.'));
      return;
    }
    if (performance.now() - startedAt > 30_000) {
      window.clearInterval(timer);
      reject(new Error('Timed out waiting for Motion Canvas player.'));
    }
  }, 50);
});

await waitUntilReady();
status.dataset.state = 'ready';

window.__SEVENBYTE_START_CAPTURE_PLAYBACK__ = () => {
  const overlay = player.shadowRoot?.querySelector('.overlay');
  if (!(overlay instanceof HTMLElement) || !overlay.classList.contains('state-ready')) {
    throw new Error('Motion Canvas playback is not ready.');
  }
  overlay.click();
};
