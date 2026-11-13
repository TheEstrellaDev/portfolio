# Auditoría inicial

Fecha: 2026-11-13

## Repositorio y despliegue

- Repositorio: `TheEstrellaDev/portfolio`, remoto `origin` apunta al repositorio esperado.
- Rama actual: `main`, alineada inicialmente con `origin/main`; el historial existente contiene los commits `9470eb6` y `24a68aa`.
- Hosting: GitHub Pages mediante despliegue desde la rama `main`; `CNAME` conserva el dominio `estrelladev.tech`.
- No se encontraron workflows de GitHub Actions, manifiestos de paquetes ni instrucciones `AGENTS.md` en el árbol revisado.
- Al iniciar, Git reportaba modificaciones en `.gitignore`, `README.md`, `css/styles.css`, `favicon.svg`, `index.html` y `js/main.js`. La inspección indica que son principalmente cambios de fin de línea CRLF frente a LF del HEAD (hashes del contenido idénticos); se preservan durante la migración.

## Arquitectura y contenido actuales

- Sitio de una sola página en HTML semántico, hoja CSS monolítica (`css/styles.css`, aproximadamente 1,100 líneas) y script sin dependencias (`js/main.js`, aproximadamente 300 líneas).
- Secciones: inicio, sobre mí, 15 proyectos agrupados en negocios, landing pages y portafolios, servicios, razones de trabajo, proceso, tecnologías y contacto.
- Activos: foto de perfil, preview, favicon SVG y 15 capturas PNG locales en `webs/`.
- Contenido profesional auténtico que se debe preservar: José Estrella, freelance y estudiante de Ingeniería en Desarrollo de Software en UVEG; Zacatecas/London, Canadá; trabajo de desarrollo web y programación indie; servicios y proyectos descritos en la página.
- Interacciones: navegación móvil y activa, filtros de proyectos, aparición al desplazarse, formulario que prepara correo, año dinámico, botón subir y acceso flotante a WhatsApp.

## Hallazgos

- Ya hay etiquetas básicas SEO y JSON-LD, pero canonical, OG URL/imagen y URL estructurada son placeholders; los perfiles incluyen una URL de GitHub mal escrita (`TheEsrtellaDev`).
- El formulario tiene correo destinatario placeholder (`TU_CORREO_AQUI@ejemplo.com`), por lo que no puede entregar mensajes.
- Los filtros no actualizan `aria-pressed`; el contenido de imagen de tarjetas está aplicado como fondo CSS, sin texto alternativo para las capturas.
- La página usa tarjetas enteras como enlaces, muchos estilos inline y una CSS grande; faltan manifest de sitemap/robots y metadatos de idioma/tema completos.
- El script depende de nodos presentes y usa alertas; no hay automatización de build, validación ni despliegue.
- La implementación utiliza `prefers-reduced-motion`, foco visible y layouts responsive, que deben conservarse.
- Pingo Club se añadió como proyecto regular dentro de la cuadrícula, con demo y repositorio enlazados.

## Estrategia

Migrar a Astro estático con TypeScript para componer y mantener las secciones, usando CSS nativo acotado para evitar una dependencia de estilos en runtime. Mantener las rutas y los activos existentes compatibles con el dominio y GitHub Pages, incluir Pingo Club dentro de la cuadrícula general con repositorio y demo proporcionados, y añadir metadatos corregidos, sitemap, robots, documentación y un workflow Pages reproducible. No se convierten PNG a formatos nuevos en la auditoría inicial; se medirán los tamaños y se mantendrán las capturas originales.
