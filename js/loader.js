/* ==========================================================================
   LOADER.JS — Loader inicial con contador y transición de salida
   ========================================================================== */

'use strict';

(function initLoader() {
  const loader = document.getElementById('loader');
  const counter = document.getElementById('loaderCount');
  if (!loader) return;

  let progress = 0;
  const duration = 1600; // ms, debe coincidir con loaderBarFill en animations.css
  const startTime = performance.now();

  function tick(now) {
    const elapsed = now - startTime;
    progress = Math.min(100, Math.round((elapsed / duration) * 100));
    if (counter) counter.textContent = `${progress}%`;

    if (progress < 100) {
      requestAnimationFrame(tick);
    } else {
      finishLoading();
    }
  }

  function finishLoading() {
    document.body.classList.add('is-loaded');
    setTimeout(() => {
      loader.classList.add('is-hidden');
      // Dispara el evento que arranca las animaciones de entrada del hero
      window.dispatchEvent(new CustomEvent('portfolio:loaded'));
    }, 250);
  }

  requestAnimationFrame(tick);

  // Fallback de seguridad: si algo tarda demasiado, oculta el loader igual.
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (!loader.classList.contains('is-hidden')) finishLoading();
    }, 2500);
  });
})();
