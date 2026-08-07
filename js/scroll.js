/* ==========================================================================
   SCROLL.JS — Lenis smooth scroll, navbar dinámica, back-to-top
   ========================================================================== */

'use strict';

let lenis;

/**
 * Inicializa Lenis para un scroll suave y lo sincroniza con GSAP ticker
 * si GSAP está disponible (para que ScrollTrigger se mantenga en fase).
 */
function initSmoothScroll() {
  if (typeof Lenis === 'undefined') return;

  lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.4
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  if (window.gsap && window.gsap.ticker) {
    window.gsap.ticker.add((time) => lenis.raf(time * 1000));
    window.gsap.ticker.lagSmoothing(0);
  }

  // Enlaces internos con scroll suave hacia su ancla
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId.length <= 1) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -70 });
      closeMobileNav();
    });
  });
}

/**
 * Cambia el estilo del navbar al hacer scroll y controla el menú móvil.
 */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');

  if (!navbar) return;

  const onScroll = () => {
    navbar.classList.toggle('is-scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('is-active');
      links.classList.toggle('is-open');
    });
  }
}

function closeMobileNav() {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (toggle) toggle.classList.remove('is-active');
  if (links) links.classList.remove('is-open');
}

/**
 * Muestra/oculta el botón "volver arriba" y gestiona su click.
 */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('is-visible', window.scrollY > 700);
  }, { passive: true });

  btn.addEventListener('click', () => {
    if (lenis) {
      lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initSmoothScroll();
  initNavbar();
  initBackToTop();
});
