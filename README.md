# A birthday surprise for Devva

A small static site. Plain HTML, CSS and JavaScript — no build step.

```
birthday-site/
├── index.html            the five screens + music button and popup
├── css/styles.css        the whole design system
├── js/
│   ├── config.js         ← every message and asset path lives here
│   ├── stickers.js       Dudu & Bubu sticker system
│   ├── music.js          background song
│   ├── video.js          opening video
│   ├── messages.js       popup notes, tappable stickers, rotating line
│   ├── infinite-zoom.js  your zoom engine, untouched
│   └── app.js            screen flow
└── assets/
    ├── audio/song.mp3
    ├── video/opening.mp4
    └── zoom/1.png … 4.png   ← replace with your real zoom layers
```

## The flow

1. **Opening** — "Hey Gubbi…" / "I made a little something for you." / **Open your surprise**
2. **Video** — your file plays full screen, with a Skip button after a few seconds
3. **Birthday** — "Happy Birthday, Devva", the Kannada wish, a line that quietly
   changes every few seconds, and five tappable Dudu & Bubu who each open a
   little message
4. **One more thing** — **Look closer** opens the infinite zoom
5. **Final** — "Happy Birthday, Dummu", a sticker, and **Start again**

## Editing the messages

Open `js/config.js`. Every word on the site is in there: `OPENING`, `BIRTHDAY`,
`ROTATING` (the lines that cycle), `NOTES` (what the tappable stickers open),
`MORE` and `FINAL`. Add or remove entries from the arrays freely — the site
picks from them randomly without repeating until the list runs out.

Kannada renders in Baloo Tamma 2 (from Google Fonts) with Noto Sans Kannada as a
fallback, so mixed Kannada/English lines sit on the same baseline.

## Swapping assets

- **Video** — overwrite `assets/video/opening.mp4`.
- **Song** — overwrite `assets/audio/song.mp3`. It loops, so a short track is fine.
- **Stickers** — `CONFIG.STICKERS` holds your six Dudu & Bubu URLs. Replace any
  with a local path like `assets/stickers/2-4.png` if you'd rather not rely on
  the CDN. One that fails to load removes itself quietly.
- **Zoom layers** — drop your real `1.png`–`4.png` into `assets/zoom/`. The
  placeholders there now just prove the experience works.

## The infinite zoom

Unchanged from your original: `LAYERS_CONFIG`, `computeWorldMatrices()`, the
easing model, `zoomAround()` / `rotateAround()`, wheel zoom, Shift+wheel rotate,
Q/E/0, mouse panning, pinch with its clamp, two-finger rotation with the ±π
unwrap, the double-tap guards, DPR handling and circular clipping.

Around it sits a small lifecycle: `mount()`, `preload()` (starts fetching the
layers when she reaches the "one more thing" screen), and `open()` / `close()`,
which attach and release every listener and start and stop the render loop so it
costs nothing while closed. The overlay is `position: fixed` with
`touch-action: none` and `<body>` is `overflow: hidden`, so the page can never
scroll behind her fingers. **Back to birthday** or Escape closes it.

## Running it

Double-click `index.html`, or serve the folder if your browser is fussy about
local media:

```bash
cd birthday-site
python3 -m http.server 8000     # http://localhost:8000
```

## Browser notes

- **Autoplay** — nothing plays until she presses *Open your surprise*. That click
  unlocks audio: the song starts silent, stays silent under the video, fades in
  on the birthday screen and keeps playing through everything after, including
  the zoom. If a browser still refuses, the button at the bottom right starts it.
- **iOS** — the video is `playsinline`, and if sound is refused it retries muted
  rather than skipping.
- **Failures** — if the video can't start within six seconds, or errors, the site
  moves on to the birthday screen by itself.
- Fonts come from Google Fonts, so the first load wants a connection. Reduced
  motion settings are respected.
