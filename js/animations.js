/* ==========================================================================
   ANIMATIONS.JS — GSAP, AOS, Typed.js, skill bars, partículas de ember
   ========================================================================== */

'use strict';

/**
 * Inicializa AOS (reveals al hacer scroll) para elementos con [data-aos].
 */
function initAOS() {
  if (typeof AOS === 'undefined') return;
  AOS.init({
    duration: 900,
    easing: 'ease-out-cubic',
    once: true,
    offset: 60
  });
}

/**
 * Secuencia de entrada del Hero: título línea a línea, rol, descripción y CTAs.
 * Se dispara cuando el loader termina (evento portfolio:loaded).
 */
function initHeroReveal() {
  if (typeof gsap === 'undefined') return;

  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

  tl.to('.hero-eyebrow', { opacity: 1, y: 0, duration: 0.7 })
    .to('.hero-title .line span', {
      y: 0,
      duration: 1,
      stagger: 0.12
    }, '-=0.4')
    .to('.hero-role', { opacity: 1, y: 0, duration: 0.7 }, '-=0.5')
    .to('.hero-desc', { opacity: 1, y: 0, duration: 0.7 }, '-=0.5')
    .to('.hero-actions', { opacity: 1, y: 0, duration: 0.7 }, '-=0.5')
    .to('.scroll-indicator', { opacity: 1, duration: 0.6 }, '-=0.3');
}

/**
 * Establece los estados iniciales (ocultos) del contenido del hero
 * antes de que arranque la animación de entrada.
 */
function setHeroInitialStates() {
  if (typeof gsap === 'undefined') return;
  gsap.set('.hero-title .line span', { y: '110%' });
  gsap.set('.hero-eyebrow, .hero-role, .hero-desc, .hero-actions', { opacity: 0, y: 24 });
  gsap.set('.scroll-indicator', { opacity: 0 });
}

/**
 * Inicializa Typed.js sobre el rol del diseñador en el hero.
 */
function initTypedRole() {
  const el = document.getElementById('typedRole');
  if (!el || typeof Typed === 'undefined') return;

  new Typed('#typedRole', {
    strings: ['Diseño de Marca.', 'Ilustración Editorial.', 'Motion & Ambiente.', 'Retrato y Color.'],
    typeSpeed: 42,
    backSpeed: 26,
    backDelay: 1600,
    startDelay: 1400,
    loop: true,
    smartBackspace: true
  });
}

/**
 * Anima las barras de habilidades cuando entran en viewport.
 */
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-fill');
  if (!bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        bar.style.width = `${bar.dataset.percent}%`;
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.4 });

  bars.forEach((bar) => observer.observe(bar));
}

/**
 * Anima los números de las estadísticas (about) con un conteo ascendente.
 */
function initCountUp() {
  const nums = document.querySelectorAll('.stat-num');
  if (!nums.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10) || 0;
      const suffixEl = el.querySelector('.suffix');
      const suffix = suffixEl ? suffixEl.outerHTML : '';
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 60));

      const tick = () => {
        current = Math.min(target, current + step);
        el.innerHTML = current + suffix;
        if (current < target) requestAnimationFrame(tick);
      };
      tick();
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  nums.forEach((el) => observer.observe(el));
}

/**
 * Genera partículas de brasa flotantes de forma continua en el hero.
 */
function initEmbers() {
  const container = document.getElementById('heroEmbers');
  if (!container) return;

  function spawnEmber() {
    const ember = document.createElement('span');
    ember.className = 'ember-particle';
    const left = Math.random() * 100;
    const duration = 6 + Math.random() * 6;
    const size = 2 + Math.random() * 4;
    ember.style.left = `${left}%`;
    ember.style.width = `${size}px`;
    ember.style.height = `${size}px`;
    ember.style.animationDuration = `${duration}s`;
    container.appendChild(ember);
    setTimeout(() => ember.remove(), duration * 1000);
  }

  for (let i = 0; i < 10; i++) {
    setTimeout(spawnEmber, i * 400);
  }
  setInterval(spawnEmber, 800);
}

/**
 * Parallax sutil de las formas flotantes del hero según la posición del mouse.
 */
function initParallaxShapes() {
  const shapes = document.querySelectorAll('.hero-shape');
  if (!shapes.length) return;

  window.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;

    shapes.forEach((shape, i) => {
      const depth = (i + 1) * 8;
      shape.style.transform = `translate(${dx * depth}px, ${dy * depth}px)`;
    });
  });
}

/**
 * Efecto hover 3D sutil en las tarjetas de servicio.
 */
function initTilt3D() {
  const cards = document.querySelectorAll('.service-card');
  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateX(${y * -8}deg) rotateY(${x * 8}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setHeroInitialStates();
  initAOS();
  initTypedRole();
  initSkillBars();
  initCountUp();
  initEmbers();
  initParallaxShapes();
  initTilt3D();
});

window.addEventListener('portfolio:loaded', initHeroReveal);
