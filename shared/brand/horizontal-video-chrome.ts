// Canonical 7BYTE horizontal-video chrome.
// Source of truth: the cloud-stored EP002 final video, not a re-created approximation.
// New horizontal episodes must reuse these values unchanged unless the brand itself is intentionally revised.
//
// The exact top-left raster lives in ChatGPT Library as:
//   /7BYTE/brand/header-horizontal.png
// It is applied ONCE during final composition, never re-drawn in Motion Canvas.

export const HORIZONTAL_BRAND = {
  background: '#0F100E',
  surface: '#191A17',
  raised: '#22231F',
  border: '#383B33',
  text: '#F4F1E8',
  muted: '#969A90',
  accent: '#D8FF68',
  accentDark: '#1D2411',

  watermark: {
    text: '7BYTE',
    x: 0,
    y: 10,
    opacity: 0.028,
    fontSize: 250,
    fontWeight: 800,
    letterSpacing: 18,
  },

  header: {
    libraryPath: '/7BYTE/brand/header-horizontal.png',
    // Final-composite pixel coordinates on a 1920×1080 canvas.
    pixelX: 28,
    pixelY: 18,
    width: 278,
    height: 76,
  },

  outro: {
    horizontalLibraryPath: '/7BYTE/brand/outro-horizontal-canonical.mp4',
    verticalLibraryPath: '/7BYTE/brand/outro-canonical.mp4',
    padColor: '#0F100E',
  },
} as const;
