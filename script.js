/* ═══════════════════════════════════════════════════════════
   NEFTALÍ REYES — PORTAFOLIO DE ILUSTRACIÓN
   script.js · Versión 1.0 · 2025
   Incluye: Loader, Cursor, Navbar, Reveal, Galería, Lightbox,
            Filtros, Skill Bars, Parallax, Formulario
════════════════════════════════════════════════════════════ */

'use strict';

/* ── DATOS DE LA GALERÍA (para el lightbox) ─────────────── */
const galleryData = [
  {
    src:   'img_hero.jpg',
    title: 'Hansel y Gretel',
    cat:   'Ilustración Digital · 2024'
  },
  {
    src:   'img_payaso.jpg',
    title: 'El Payaso',
    cat:   'Pastel sobre papel'
  },
  {
    src:   'img_retrato_nina.jpg',
    title: 'Mirada Inocente',
    cat:   'Lápiz sobre papel · Retrato'
  },
  {
    src:   'img_acuarela.jpg',
    title: 'Alegría en Color',
    cat:   'Acuarela · Retrato'
  },
  {
    src:   'img_proceso1.jpg',
    title: 'Del Estudio',
    cat:   'Behind the Scenes'
  },
  {
    src:   'img_proceso2.jpg',
    title: 'Anatomía del Arte',
    cat:   'Proceso Artístico'
  },
  {
    src:   'img_retrato_drama.jpg',
    title: 'Fragmentos',
    cat:   'Carboncillo · Retrato femenino'
  },
  {
    src:   'img_retrato_ojos.jpg',
    title: 'Abismo',
    cat:   'Carboncillo · Obra mayor'
  }
];

/* ── 1. LOADER ──────────────────────────────────────────── */
(function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;

  // Esperar 2.2s (duración de la animación) + pequeña pausa
  setTimeout(() => {
    loader.classList.add('hidden');
    // Una vez oculto, lanzar reveal inicial
    setTimeout(triggerHeroReveal, 400);
  }, 2400);
})();

/* ── 2. CURSOR PERSONALIZADO ────────────────────────────── */
(function initCursor() {
  const cursor      = document.getElementById('cursor');
  const cursorTrail = document.getElementById('cursorTrail');
  if (!cursor || !cursorTrail) return;

  let mouseX = 0, mouseY = 0;
  let trailX = 0, trailY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  // Trail con suavizado mediante requestAnimationFrame
  function animateTrail() {
    trailX += (mouseX - trailX) * 0.12;
    trailY += (mouseY - trailY) * 0.12;
    cursorTrail.style.left = trailX + 'px';
    cursorTrail.style.top  = trailY + 'px';
    requestAnimationFrame(animateTrail);
  }
  animateTrail();

  // Ampliar cursor sobre elementos interactivos
  const interactiveSelectors = 'a, button, .filter-btn, .gi-inner, .project-card, .social-btn';
  document.querySelectorAll(interactiveSelectors).forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width  = '24px';
      cursor.style.height = '24px';
      cursorTrail.style.width  = '60px';
      cursorTrail.style.height = '60px';
      cursorTrail.style.borderColor = 'var(--rojo)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width  = '12px';
      cursor.style.height = '12px';
      cursorTrail.style.width  = '36px';
      cursorTrail.style.height = '36px';
      cursorTrail.style.borderColor = 'var(--amarillo)';
    });
  });
})();

/* ── 3. NAVBAR STICKY ───────────────────────────────────── */
(function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const toggle    = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');
  const links     = navLinks ? navLinks.querySelectorAll('.nav-link') : [];

  if (!navbar) return;

  // Scroll → añade clase 'scrolled'
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  // Botón hamburguesa (móvil)
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open);
    });
  }

  // Cerrar menú al hacer clic en un link
  links.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle && toggle.classList.remove('open');
    });
  });

  // Active link según sección visible
  const sections = document.querySelectorAll('section[id]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute('id');
      links.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
      });
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
})();

/* ── 4. REVEAL ON SCROLL ────────────────────────────────── */
function initReveal() {
  const elements = document.querySelectorAll('.reveal-up');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Una vez visible no necesitamos re-observar
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
}

// Activar el hero después del loader
function triggerHeroReveal() {
  document.querySelectorAll('.hero .reveal-up').forEach(el => {
    el.classList.add('visible');
  });
}

document.addEventListener('DOMContentLoaded', initReveal);

/* ── 5. FILTROS DE GALERÍA ──────────────────────────────── */
(function initFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      // Actualizar botón activo
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Mostrar/ocultar items con animación
      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        const matches  = filter === 'all' || category === filter;

        if (matches) {
          item.classList.remove('hidden');
          // Pequeña animación de entrada
          item.style.opacity = '0';
          item.style.transform = 'scale(0.96)';
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            });
          });
        } else {
          item.classList.add('hidden');
          item.style.opacity = '';
          item.style.transform = '';
          item.style.transition = '';
        }
      });
    });
  });
})();

/* ── 6. LIGHTBOX ────────────────────────────────────────── */
let currentLbIndex = 0;
const lightbox = document.getElementById('lightbox');
const lbImg    = document.getElementById('lbImg');
const lbCap    = document.getElementById('lbCaption');

function openLightbox(index) {
  if (!lightbox || index < 0 || index >= galleryData.length) return;
  currentLbIndex = index;
  updateLightbox();
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function updateLightbox() {
  const data = galleryData[currentLbIndex];
  if (!data || !lbImg || !lbCap) return;

  // Animación de fade al cambiar imagen
  lbImg.style.opacity = '0';
  lbImg.style.transform = 'scale(0.97)';

  setTimeout(() => {
    lbImg.src = data.src;
    lbImg.alt = data.title;
    lbCap.textContent = `${data.title} — ${data.cat}`;
    lbImg.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
    lbImg.style.opacity = '1';
    lbImg.style.transform = 'scale(1)';
  }, 200);
}

(function initLightbox() {
  if (!lightbox) return;

  // Cerrar
  const lbClose = document.getElementById('lbClose');
  if (lbClose) lbClose.addEventListener('click', closeLightbox);

  // Anterior
  const lbPrev = document.getElementById('lbPrev');
  if (lbPrev) {
    lbPrev.addEventListener('click', () => {
      currentLbIndex = (currentLbIndex - 1 + galleryData.length) % galleryData.length;
      updateLightbox();
    });
  }

  // Siguiente
  const lbNext = document.getElementById('lbNext');
  if (lbNext) {
    lbNext.addEventListener('click', () => {
      currentLbIndex = (currentLbIndex + 1) % galleryData.length;
      updateLightbox();
    });
  }

  // Cerrar al hacer clic fuera de la imagen
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Teclado
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowLeft')  { currentLbIndex = (currentLbIndex - 1 + galleryData.length) % galleryData.length; updateLightbox(); }
    if (e.key === 'ArrowRight') { currentLbIndex = (currentLbIndex + 1) % galleryData.length; updateLightbox(); }
  });
})();

// Hacer openLightbox global (llamada desde HTML)
window.openLightbox = openLightbox;

/* ── 7. SKILL BARS ANIMADAS ─────────────────────────────── */
(function initSkillBars() {
  const skillFills = document.querySelectorAll('.skill-fill');
  if (!skillFills.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Pequeño delay para efecto visual
        setTimeout(() => {
          entry.target.classList.add('animated');
        }, 300);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  skillFills.forEach(fill => observer.observe(fill));
})();

/* ── 8. PARALLAX HERO IMAGE ─────────────────────────────── */
(function initParallax() {
  const heroImgWrap = document.querySelector('.hero-image-wrap');
  if (!heroImgWrap) return;

  const factor = parseFloat(heroImgWrap.getAttribute('data-parallax') || '0.1');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    // Solo aplica cuando la sección hero es visible
    if (scrollY < window.innerHeight * 1.5) {
      heroImgWrap.style.transform = `translateY(${scrollY * factor}px)`;
    }
  }, { passive: true });
})();

/* ── 9. FORMULARIO DE CONTACTO ──────────────────────────── */
(function initContactForm() {
  const form        = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validación básica
    const name    = form.querySelector('#name');
    const email   = form.querySelector('#email');
    const message = form.querySelector('#message');

    let valid = true;

    [name, email, message].forEach(field => {
      if (!field || !field.value.trim()) {
        field && field.style.setProperty('border-color', 'var(--rojo)');
        valid = false;
      } else {
        field.style.removeProperty('border-color');
      }
    });

    if (!valid) return;

    // Simular envío (en producción conectar con Formspree, EmailJS, etc.)
    const btn = form.querySelector('.btn-submit');
    const originalHTML = btn ? btn.innerHTML : '';
    if (btn) {
      btn.innerHTML = '<span>Enviando...</span> <i class="fas fa-spinner fa-spin"></i>';
      btn.disabled = true;
    }

    setTimeout(() => {
      if (btn) {
        btn.innerHTML = originalHTML;
        btn.disabled = false;
      }
      form.reset();
      if (formSuccess) formSuccess.classList.add('show');
      setTimeout(() => formSuccess && formSuccess.classList.remove('show'), 5000);
    }, 1800);
  });

  // Limpiar borde rojo al escribir
  form.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('input', () => {
      field.style.removeProperty('border-color');
    });
  });
})();

/* ── 10. SMOOTH SCROLL PARA LINKS INTERNOS ──────────────── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const offset = 80; // Compensar navbar
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

/* ── 11. TEXTO HERO ANIMADO (marquee de fondo) ──────────── */
(function initHeroTextLoop() {
  // Pequeño efecto: las letras del nombre pulsan levemente
  const heroName = document.querySelector('.hero-name');
  if (!heroName) return;

  heroName.addEventListener('mouseenter', () => {
    heroName.style.filter = 'drop-shadow(0 0 20px rgba(230,48,34,0.5))';
  });
  heroName.addEventListener('mouseleave', () => {
    heroName.style.filter = '';
  });
})();

/* ── 12. CONTADOR ANIMADO EN STATS ──────────────────────── */
(function initCounters() {
  const stats = document.querySelectorAll('.stat-n');
  if (!stats.length) return;

  const animateCount = (el, target, suffix) => {
    let current = 0;
    const increment = target / 40;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.textContent = target + suffix;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current) + suffix;
      }
    }, 40);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el   = entry.target;
      const text = el.textContent;
      const num  = parseInt(text);
      const suf  = text.replace(/[0-9]/g, '');
      animateCount(el, num, suf);
      observer.unobserve(el);
    });
  }, { threshold: 0.8 });

  stats.forEach(s => observer.observe(s));
})();

/* ── 13. PERFORMANCE: lazy reveal de imágenes ───────────── */
(function initLazyImages() {
  if ('IntersectionObserver' in window) {
    const lazyImgs = document.querySelectorAll('img[loading="lazy"]');
    const imgObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.style.transition = 'opacity 0.6s ease';
          img.style.opacity = '1';
          imgObserver.unobserve(img);
        }
      });
    }, { rootMargin: '50px' });

    lazyImgs.forEach(img => {
      img.style.opacity = '0';
      imgObserver.observe(img);
    });
  }
})();

console.log('%cNEFTALÍ REYES — Portafolio v1.0', 'color:#E63022;font-family:monospace;font-size:14px;font-weight:bold;');
console.log('%c🎨 Arte con trazo y código.', 'color:#F5C800;font-family:monospace;font-size:11px;');
