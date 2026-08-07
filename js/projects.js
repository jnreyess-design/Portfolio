/* ==========================================================================
   PROJECTS.JS — Datos de proyectos, render del grid, filtros y modal
   ========================================================================== */

'use strict';

/**
 * Fuente de datos de los proyectos del portafolio.
 * categories: array de slugs usados para el filtrado.
 * span: clase de tamaño dentro del grid masonry.
 */
const PROJECTS = [
  {
    id: 'magmarana',
    title: 'Magmaraña — Diseño de Personaje',
    categories: ['branding', 'ilustracion'],
    catLabel: 'Branding · Ilustración',
    img: 'assets/img/project-magmarana.jpg',
    span: 'span-tall',
    client: 'Proyecto Personal',
    year: '2026',
    tech: 'Procreate, Illustrator',
    desc: 'Diseño y desarrollo de un personaje original para una identidad de marca con temática de fuego. El proceso incluyó bocetaje de ángulos de cabeza, definición de silueta y paleta cromática antes de llegar al arte final, priorizando una personalidad ruda y dominante en cada trazo.'
  },
  {
    id: 'hansel-gretel',
    title: 'Hansel y Gretel — Ilustración Editorial',
    categories: ['editorial', 'ilustracion'],
    catLabel: 'Editorial · Ilustración',
    img: 'assets/img/project-hansel-gretel.jpg',
    span: 'span-wide',
    client: 'Editorial Cuentos Ilustrados',
    year: '2025',
    tech: 'Procreate, Photoshop',
    desc: 'Escena editorial para una reinterpretación del cuento clásico, construida con una paleta cálida y detalles de repostería que refuerzan la atmósfera de fantasía. El encuadre y la composición guían la mirada desde los protagonistas hacia la casita de jengibre como punto focal.'
  },
  {
    id: 'estudio-geometrico',
    title: 'Estudio Geométrico — Exploración Cromática',
    categories: ['branding', 'ilustracion'],
    catLabel: 'Branding · Ilustración',
    img: 'assets/img/project-abstracto.jpg',
    span: 'span-mid',
    client: 'Estudio Personal',
    year: '2025',
    tech: 'Marcadores, Tinta',
    desc: 'Ejercicio de composición abstracta a partir de formas geométricas superpuestas, explorando contraste de color y textura como base para futuros sistemas de identidad visual.'
  },
  {
    id: 'retrato-panama',
    title: 'Retrato Panamá — Acuarela',
    categories: ['ilustracion'],
    catLabel: 'Ilustración',
    img: 'assets/img/project-panama-watercolor.jpg',
    span: 'span-mid',
    client: 'Serie Cultural',
    year: '2025',
    tech: 'Acuarela, Tinta',
    desc: 'Retrato en acuarela que celebra el color y la identidad cultural panameña, con especial atención al tratamiento lumínico de la piel y a los textiles florales del tocado.'
  },
  {
    id: 'retrato-grafito-mujer',
    title: 'Retrato a Grafito — Estudio de Rostro',
    categories: ['ilustracion'],
    catLabel: 'Ilustración',
    img: 'assets/img/project-retrato-mujer.jpg',
    span: 'span-tall',
    client: 'Estudio Personal',
    year: '2024',
    tech: 'Grafito 3B / 6B',
    desc: 'Estudio de retrato realista a lápiz de grafito, enfocado en el manejo del claroscuro y la construcción progresiva de valores tonales para lograr profundidad en la mirada.'
  },
  {
    id: 'retrato-infantil',
    title: 'Retrato Infantil — Grafito',
    categories: ['ilustracion'],
    catLabel: 'Ilustración',
    img: 'assets/img/project-retrato-nina.jpg',
    span: 'span-mid',
    client: 'Encargo Privado',
    year: '2024',
    tech: 'Grafito 2B / 4B',
    desc: 'Retrato por encargo centrado en capturar la expresión y ternura del rostro infantil, con un tratamiento suave del cabello y transiciones tonales delicadas.'
  }
];

/**
 * Renderiza las tarjetas de proyecto dentro del grid.
 */
function renderProjects(filter = 'todos') {
  const grid = document.getElementById('portfolioGrid');
  if (!grid) return;

  const items = filter === 'todos'
    ? PROJECTS
    : PROJECTS.filter(p => p.categories.includes(filter));

  if (items.length === 0) {
    grid.innerHTML = `<p class="portfolio-empty">Aún no hay proyectos en esta categoría. Vuelve pronto.</p>`;
    return;
  }

  grid.innerHTML = items.map(p => `
    <article class="project-card ${p.span}" data-id="${p.id}" data-aos="fade-up">
      <img src="${p.img}" alt="${p.title}" loading="lazy">
      <div class="project-overlay">
        <span class="project-cat">${p.catLabel}</span>
        <h3>${p.title}</h3>
      </div>
      <span class="project-view" aria-hidden="true"><i class="fa-solid fa-arrow-up-right"></i></span>
    </article>
  `).join('');

  // Re-engancha los listeners de apertura de modal en las nuevas tarjetas
  grid.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => openProjectModal(card.dataset.id));
  });

  // Refresca AOS para las tarjetas recién insertadas
  if (window.AOS) window.AOS.refreshHard();
}

/**
 * Abre el modal con el detalle del proyecto seleccionado.
 */
function openProjectModal(id) {
  const project = PROJECTS.find(p => p.id === id);
  if (!project) return;

  const overlay = document.getElementById('projectModal');
  if (!overlay) return;

  overlay.querySelector('.modal-gallery img').src = project.img;
  overlay.querySelector('.modal-gallery img').alt = project.title;
  overlay.querySelector('.modal-cat').textContent = project.catLabel;
  overlay.querySelector('.modal-title').textContent = project.title;
  overlay.querySelector('.modal-desc').textContent = project.desc;
  overlay.querySelector('.modal-client').textContent = project.client;
  overlay.querySelector('.modal-year').textContent = project.year;
  overlay.querySelector('.modal-tech').innerHTML = project.tech
    .split(',')
    .map(t => `<span>${t.trim()}</span>`)
    .join('');

  overlay.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

/**
 * Cierra el modal de proyecto.
 */
function closeProjectModal() {
  const overlay = document.getElementById('projectModal');
  if (!overlay) return;
  overlay.classList.remove('is-open');
  document.body.style.overflow = '';
}

/**
 * Inicializa filtros, grid y eventos de cierre del modal.
 */
function initProjects() {
  renderProjects('todos');

  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      renderProjects(btn.dataset.filter);
    });
  });

  const overlay = document.getElementById('projectModal');
  if (overlay) {
    overlay.querySelector('.modal-close').addEventListener('click', closeProjectModal);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeProjectModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeProjectModal();
    });
  }
}

document.addEventListener('DOMContentLoaded', initProjects);
