import '@motion-canvas/player';

declare global {
  interface Window {
    __SEVENBYTE_PROJECT_PATH__?: string;
    __SEVENBYTE_CAPTURE_MODE__?: boolean;
    __SEVENBYTE_START_CAPTURE_PLAYBACK__?: () => void;
  }
}

const player = document.querySelector('#player') as HTMLElement | null;
const status = document.querySelector('#status') as HTMLElement | null;
const title = document.querySelector('#status-title') as HTMLElement | null;
const detail = document.querySelector('#status-detail') as HTMLElement | null;
const captureMode = new URLSearchParams(window.location.search).get('capture') === '1';
window.__SEVENBYTE_CAPTURE_MODE__ = captureMode;

function setStatus(state: 'loading' | 'ready' | 'error', heading: string, message: string) {
  if (status) status.dataset.state = state;
  if (title) title.textContent = heading;
  if (detail) detail.textContent = message;
}

function describeError(error: unknown) {
  if (error instanceof Error) {
    return `${error.name}: ${error.message}`;
  }
  return String(error);
}

function fail(error: unknown) {
  const message = describeError(error);
  console.error('[7BYTE Pages preview]', error);
  setStatus('error', '动画加载失败', message);
}

window.addEventListener('error', event => {
  if (event.error) fail(event.error);
});

window.addEventListener('unhandledrejection', event => {
  fail(event.reason);
});

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function boot() {
  try {
    if (!player) throw new Error('找不到 motion-canvas-player 元素。');

    setStatus('loading', '正在初始化播放器…', '正在加载本地打包的 Motion Canvas Player。');
    await customElements.whenDefined('motion-canvas-player');

    const projectPath = window.__SEVENBYTE_PROJECT_PATH__;
    if (!projectPath) {
      throw new Error('project-manifest.js 没有提供动画项目路径。');
    }

    const projectUrl = new URL(projectPath, document.baseURI).href;
    setStatus('loading', '正在加载动画项目…', projectUrl);

    const module = await import(/* @vite-ignore */ projectUrl);
    if (!module?.default) {
      throw new Error('项目 bundle 已加载，但没有 default export。');
    }

    // Normal preview auto-plays. Capture mode intentionally stays paused at frame 0
    // so a recorder can start first and then begin playback deterministically.
    if (!captureMode) {
      player.setAttribute('auto', 'true');
    } else {
      player.removeAttribute('auto');
    }
    player.setAttribute('src', projectUrl);
    setStatus('loading', '正在初始化场景…', '项目代码已加载，等待播放器进入 ready 状态。');

    const deadline = Date.now() + 15000;
    while (Date.now() < deadline) {
      const overlay = player.shadowRoot?.querySelector('.overlay') as HTMLElement | null;
      if (overlay?.classList.contains('state-ready')) {
        if (captureMode) {
          window.__SEVENBYTE_START_CAPTURE_PLAYBACK__ = () => {
            overlay.dispatchEvent(new MouseEvent('click', {bubbles: true, composed: true}));
          };
          setStatus('ready', '捕获模式已就绪', '播放器停在第 0 帧，等待录制脚本启动。');
        } else {
          // @motion-canvas/player reads auto as a string boolean; it must be non-empty.
          player.setAttribute('auto', 'true');
          setStatus('ready', '已加载', 'Episode 001 正在自动播放。');
        }
        return;
      }
      if (overlay?.classList.contains('state-error')) {
        throw new Error('Motion Canvas Player 进入 state-error。请查看浏览器控制台中的项目加载错误。');
      }
      await delay(100);
    }

    throw new Error('等待 Motion Canvas Player ready 超过 15 秒。');
  } catch (error) {
    fail(error);
  }
}

void boot();
