/* ============================================================================
   stickers.js — the Dudu & Bubu sticker system.

   Stickers are real image assets (see CONFIG.STICKERS), never emojis.
   Placement is randomised, but only inside a fixed set of safe slots along
   the edges of a section, so a sticker can never land on a heading, a
   button or a control.
   ========================================================================= */

window.Stickers = (function () {
  const urls = window.CONFIG.STICKERS.slice();
  const available = [];          // urls that actually loaded
  let preloaded = false;
  let bag = [];                  // shuffle bag so repeats are rare

  /* Safe slots, as CSS offsets. Nothing important lives in these corners.
     On a phone the text runs almost edge to edge, so the mid-height slots
     stop being safe — narrow screens fall back to the two corners that hold
     no text and no controls (the back button is top-left, music bottom-right). */
  const MOBILE_SLOTS = [
    { top: '3%', right: '4%' },
    { bottom: '7%', left: '5%' }
  ];
  const SLOTS = [
    { top: '7%', left: '3%' },
    { top: '14%', right: '4%' },
    { top: '42%', left: '2%' },
    { top: '52%', right: '2.5%' },
    { bottom: '16%', left: '5%' },
    { bottom: '10%', right: '6%' },
    { bottom: '38%', left: '3%' },
    { top: '26%', right: '7%' }
  ];

  function preload() {
    if (preloaded) return;
    preloaded = true;
    urls.forEach((src) => {
      const img = new Image();
      img.onload = () => available.push(src);
      img.onerror = () => console.warn('Sticker failed to load:', src);
      img.src = src;
    });
  }

  function pickUrl() {
    const pool = available.length ? available : urls;
    if (!bag.length) {
      bag = pool.slice().sort(() => Math.random() - 0.5);
    }
    return bag.pop();
  }

  function jitter(value, amount) {
    const n = parseFloat(value);
    return (n + (Math.random() * 2 - 1) * amount).toFixed(2) + '%';
  }

  /**
   * Scatter stickers inside a host element.
   *
   * @param {HTMLElement} host
   * @param {Object} opts
   *   count      how many to place (default 3)
   *   notes      if true, clicking a sticker reveals a hidden message
   *   slots      restrict placement to specific slot indexes
   *   scale      base scale (default 1)
   */
  function scatter(host, opts) {
    opts = opts || {};
    if (!host) return;
    preload();

    let layer = host.querySelector(':scope > .sticker-layer');
    if (!layer) {
      layer = document.createElement('div');
      layer.className = 'sticker-layer';
      host.appendChild(layer);
    }
    layer.innerHTML = '';

    const narrow = window.innerWidth < 720;
    const count = Math.min(opts.count == null ? 3 : opts.count, narrow ? 2 : 6);
    const source = narrow
      ? MOBILE_SLOTS
      : (opts.slots ? opts.slots.map(i => SLOTS[i]) : SLOTS);
    const slotPool = source
      .slice()
      .sort(() => Math.random() - 0.5)
      .slice(0, count);

    slotPool.forEach((slot, i) => {
      const el = document.createElement(opts.notes ? 'button' : 'div');
      el.className = 'sticker' + (opts.notes ? ' sticker--note' : '');
      if (opts.notes) {
        el.type = 'button';
        el.setAttribute('aria-label', 'Reveal a hidden note');
      }

      const img = document.createElement('img');
      img.src = pickUrl();
      img.alt = '';
      img.decoding = 'async';
      img.loading = 'lazy';
      img.draggable = false;
      img.addEventListener('error', () => el.remove());
      el.appendChild(img);

      Object.keys(slot).forEach((side) => {
        el.style[side] = jitter(slot[side], 2.2);
      });

      const rot = (Math.random() * 16 - 8).toFixed(1);
      const scale = ((opts.scale || 1) * (0.82 + Math.random() * 0.36)).toFixed(2);
      el.style.setProperty('--rot', rot + 'deg');
      el.style.setProperty('--scale', scale);
      el.style.setProperty('--delay', (Math.random() * 3.5).toFixed(2) + 's');
      el.style.setProperty('--float', (5.5 + Math.random() * 3).toFixed(2) + 's');
      el.style.setProperty('--in-delay', (i * 0.16).toFixed(2) + 's');

      if (opts.notes) {
        el.addEventListener('click', () => {
          window.Messages.showRandom(el);
        });
      }

      layer.appendChild(el);
    });
  }

  /** A single sticker placed inline in the flow of a page (e.g. the finale). */
  function inline(parent, size) {
    preload();
    const wrap = document.createElement('div');
    wrap.className = 'sticker-inline';
    const img = document.createElement('img');
    img.src = pickUrl();
    img.alt = '';
    img.decoding = 'async';
    if (size) img.style.width = size + 'px';
    img.addEventListener('error', () => wrap.remove());
    wrap.appendChild(img);
    parent.appendChild(wrap);
    return wrap;
  }

  function clear(host) {
    const layer = host && host.querySelector(':scope > .sticker-layer');
    if (layer) layer.innerHTML = '';
  }

  /** One sticker URL from the shuffle bag — used by the tappable note row. */
  function next() { preload(); return pickUrl(); }

  return { preload, scatter, inline, clear, next };
})();
