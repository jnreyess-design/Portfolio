/* ==========================================================================
   MAIN.JS — Validación de formulario y utilidades generales del sitio
   ========================================================================== */

'use strict';

/**
 * Reglas de validación del formulario de contacto.
 */
const FORM_RULES = {
  name: {
    validate: (v) => v.trim().length >= 2,
    message: 'Escribe tu nombre completo.'
  },
  email: {
    validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
    message: 'Ingresa un correo electrónico válido.'
  },
  subject: {
    validate: (v) => v.trim().length >= 3,
    message: 'Cuéntame brevemente el asunto.'
  },
  message: {
    validate: (v) => v.trim().length >= 10,
    message: 'Tu mensaje debe tener al menos 10 caracteres.'
  }
};

function validateField(input) {
  const rule = FORM_RULES[input.name];
  if (!rule) return true;

  const group = input.closest('.form-group');
  const errorEl = group ? group.querySelector('.form-error') : null;
  const isValid = rule.validate(input.value);

  if (group) group.classList.toggle('has-error', !isValid);
  if (errorEl) errorEl.textContent = isValid ? '' : rule.message;

  return isValid;
}

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const status = document.getElementById('formStatus');
  const fields = form.querySelectorAll('input[name], textarea[name]');

  fields.forEach((field) => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.closest('.form-group').classList.contains('has-error')) {
        validateField(field);
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let allValid = true;
    fields.forEach((field) => {
      if (!validateField(field)) allValid = false;
    });

    if (!allValid) {
      if (status) {
        status.textContent = 'Revisa los campos marcados antes de enviar.';
        status.style.color = '#E8735A';
      }
      return;
    }

    // Aquí se conectaría un endpoint real (fetch/EmailJS/Formspree, etc.)
    if (status) {
      status.style.color = 'var(--amber-gold)';
      status.textContent = 'Enviando mensaje…';
    }

    setTimeout(() => {
      if (status) status.textContent = '¡Gracias! Tu mensaje fue enviado, te responderé pronto.';
      form.reset();
      fields.forEach((f) => f.closest('.form-group').classList.remove('has-error'));
    }, 900);
  });
}

/**
 * Actualiza el año del copyright automáticamente.
 */
function setCurrentYear() {
  const el = document.getElementById('currentYear');
  if (el) el.textContent = new Date().getFullYear();
}

/**
 * Resalta el link de navegación correspondiente a la sección visible.
 */
function initActiveNavLink() {
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute('id');
      navLinks.forEach((link) => {
        link.classList.toggle('is-active-link', link.getAttribute('href') === `#${id}`);
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  sections.forEach((section) => observer.observe(section));
}

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
  setCurrentYear();
  initActiveNavLink();
});
