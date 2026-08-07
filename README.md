# Portafolio — Aitana Rivas

Portafolio profesional para una diseñadora gráfica e ilustradora, construido con
**HTML5, CSS3 y JavaScript (ES6) puro**, sin frameworks. Estilo editorial cálido,
glassmorphism y animaciones fluidas orientadas a mostrar trabajo de branding,
ilustración editorial y retrato.

## Concepto de diseño

**"Ember"** — el hilo conductor entre las piezas del portafolio (personaje de fuego,
ilustración de cuento, retratos a grafito, acuarela) es el calor: brasas, papel y mano.
Fondo casi negro con matiz café-espresso, acentos cobre y ámbar, tipografía editorial
fuerte. El cursor personalizado (una brasa con estela) es el elemento firma del sitio,
y partículas de ember ascienden de forma ambiental en el Hero.

- **Paleta:** `#170D0A` fondo · `#221310` / `#2C1A15` superficies · `#C1622B` cobre ·
  `#E3A45D` ámbar · `#F5EBDD` texto primario · `#C9B8A8` texto secundario.
- **Tipografía:** Space Grotesk (display), Inter (cuerpo), Poppins (utilitaria/botones).

## Estructura del proyecto

```
portfolio/
│
├── index.html                 Estructura completa de la página (una sola página)
│
├── css/
│   ├── variables.css          Tokens: color, tipografía, espaciado, sombras
│   ├── style.css               Estilos base y de todas las secciones
│   ├── animations.css          Keyframes reutilizables
│   └── responsive.css          Breakpoints: laptop / tablet / mobile / small
│
├── js/
│   ├── loader.js                Loader inicial con contador y transición de salida
│   ├── cursor.js                 Cursor personalizado + botones magnéticos
│   ├── scroll.js                  Lenis (smooth scroll), navbar dinámica, back-to-top
│   ├── animations.js              GSAP, AOS, Typed.js, barras de skills, embers, tilt 3D
│   ├── projects.js                Datos del portafolio, filtros y modal de proyecto
│   └── main.js                    Validación del formulario de contacto y utilidades
│
├── assets/
│   ├── img/                      Imágenes de proyectos y foto "sobre mí"
│   ├── icons/                    (reservado para iconografía propia)
│   ├── video/                    (reservado para clips de motion graphics)
│   └── CV-Aitana-Rivas.pdf       CV de muestra (reemplazar por el CV real)
│
└── README.md
```

## Cómo verlo localmente

No requiere build ni instalación. Basta con servir la carpeta con cualquier
servidor estático, por ejemplo:

```bash
cd portfolio
python3 -m http.server 8000
```

Y abrir `http://localhost:8000` en el navegador.

> Abrir `index.html` directamente con doble clic también funciona, pero algunos
> navegadores restringen `fetch`/rutas relativas bajo `file://`; se recomienda
> un servidor local para una experiencia sin advertencias.

## Librerías externas (CDN)

| Librería   | Uso                                             |
|------------|--------------------------------------------------|
| AOS        | Reveals de scroll (`data-aos` en el HTML)        |
| GSAP       | Timeline de entrada del Hero, ticker de Lenis    |
| Lenis      | Smooth scroll global                             |
| Typed.js   | Texto tecleado del rol en el Hero                |
| Font Awesome | Iconografía en toda la interfaz                |

Todas se cargan por CDN (`cdnjs.cloudflare.com`) al final de `index.html`, antes
de los scripts propios del proyecto.

## Personalización rápida

- **Proyectos del portafolio:** edita el arreglo `PROJECTS` en `js/projects.js`.
  Cada objeto controla imagen, categoría (para los filtros), tamaño en el grid
  masonry (`span`, `span-mid`, `span-tall`, `span-wide`) y los datos que se
  muestran en el modal.
- **Colores y tipografía:** todos los valores viven como variables CSS en
  `css/variables.css` — cambiarlos ahí se propaga a todo el sitio.
- **Textos de Skills / Servicios / Timeline / Testimonios:** son bloques
  estáticos dentro de `index.html`, pensados para editarse directamente.
- **Formulario de contacto:** `js/main.js` valida en el cliente (nombre, correo,
  asunto, mensaje). Para enviar los datos de verdad, conecta el `submit` handler
  a un endpoint propio, EmailJS, Formspree o similar.

## Accesibilidad y calidad

- Foco visible (`:focus-visible`) en todos los elementos interactivos.
- `prefers-reduced-motion` respetado: desactiva animaciones para quien lo prefiera.
- Cursor personalizado se desactiva automáticamente en dispositivos táctiles.
- Textos alternativos en todas las imágenes de proyecto.
- Etiquetas `aria-*` en modal, botones de ícono y navegación móvil.
- Meta tags de SEO y Open Graph incluidos en `<head>`.

## Créditos de contenido

Las piezas mostradas en el portafolio (diseño de personaje, ilustración editorial,
estudio geométrico, acuarela y retratos a grafito) son obra original de la
diseñadora. Los datos de cliente, nombre, contacto y testimonios son de muestra
y deben reemplazarse por información real antes de publicar el sitio.
