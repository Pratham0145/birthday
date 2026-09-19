/* ============================================================================
   messages.js — the cute bits: the note popup, the row of tappable Dudu &
   Bubu stickers, and the line that quietly changes under the birthday title.
   ========================================================================= */

window.Messages = (function () {
  const notes = window.CONFIG.NOTES.slice();
  let bag = [];
  let card, cardText, cardClose, lastFocus;

  /* --- popup note ------------------------------------------------------- */

  function initNotePopup(cardEl) {
    card = cardEl;
    cardText = card.querySelector('[data-note-text]');
    cardClose = card.querySelector('[data-note-close]');

    cardClose.addEventListener('click', hide);
    card.addEventListener('click', (e) => { if (e.target === card) hide(); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !card.hidden) hide();
    });
  }

  function show(text, origin) {
    if (!card) return;
    lastFocus = origin || document.activeElement;
    cardText.textContent = text;
    card.hidden = false;
    requestAnimationFrame(() => card.classList.add('is-open'));
    cardClose.focus({ preventScroll: true });
  }

  function hide() {
    if (!card || card.hidden) return;
    card.classList.remove('is-open');
    setTimeout(() => {
      card.hidden = true;
      if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
    }, 320);
  }

  function showRandom(origin) {
    if (!bag.length) bag = notes.slice().sort(() => Math.random() - 0.5);
    show(bag.pop(), origin);
  }

  /* --- row of tappable stickers ----------------------------------------- */

  function initNoteRow(container, count) {
    container.innerHTML = '';
    const n = count || 5;
    for (let i = 0; i < n; i++) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'wish';
      btn.setAttribute('aria-label', 'Open a little message');
      btn.style.setProperty('--tilt', (Math.random() * 14 - 7).toFixed(1) + 'deg');
      btn.style.setProperty('--delay', (i * 0.09).toFixed(2) + 's');
      btn.style.setProperty('--float', (5 + Math.random() * 2.5).toFixed(2) + 's');

      const img = document.createElement('img');
      img.src = window.Stickers.next();
      img.alt = '';
      img.decoding = 'async';
      img.draggable = false;
      img.addEventListener('error', () => btn.remove());
      btn.appendChild(img);

      btn.addEventListener('click', () => {
        btn.classList.add('is-opened');
        showRandom(btn);
      });

      container.appendChild(btn);
    }
  }

  /* --- rotating line ---------------------------------------------------- */

  let rotTimer = null;

  function startRotator(el, lines, interval) {
    stopRotator();
    let order = lines.slice().sort(() => Math.random() - 0.5);
    let i = 0;

    function swap() {
      el.classList.remove('is-in');
      setTimeout(() => {
        el.textContent = order[i % order.length];
        el.classList.add('is-in');
        i++;
      }, 600);
    }

    el.textContent = order[0];
    el.classList.add('is-in');
    i = 1;
    rotTimer = setInterval(swap, interval || 6500);
  }

  function stopRotator() {
    if (rotTimer) { clearInterval(rotTimer); rotTimer = null; }
  }

  return { initNotePopup, show, hide, showRandom, initNoteRow, startRotator, stopRotator };
})();
