# TheEstrellaDev Portfolio

Portafolio personal de José Estrella, publicado en [estrelladev.tech](https://estrelladev.tech). Sitio estático con Astro y TypeScript, preparado para GitHub Pages y el dominio conservado en `CNAME`.

## Requisitos

- Node.js 22 o posterior.
- npm 10 o posterior.

## Desarrollo

```bash
npm ci
npm run dev
```

Astro inicia un servidor local. La ruta configurada para producción es `/portfolio/`.

## Calidad y build

```bash
npm run lint
npm run typecheck
npm run build
npm run preview
```

`astro check` valida componentes y TypeScript; `astro build` crea el sitio estático dentro de `dist/`.

## Arquitectura

- `src/pages/index.astro`: contenido y composición de la página.
- `src/layouts/Layout.astro`: metadatos, datos estructurados y estructura base.
- `src/components/`: navegación, control de tema y tarjetas reutilizables.
- `src/styles/global.css`: identidad visual responsive y accesible.
- `src/scripts/main.ts`: filtros, navegación móvil y tema con JavaScript del navegador.
- `public/webs/`: capturas existentes de proyectos; `public/projects/`: imagen de Pingo Club.

No usamos React en este sitio: todas sus secciones se generan en HTML estático y las interacciones pequeñas se resuelven con JavaScript nativo. Pingo Club permanece como proyecto externo independiente.

## Publicación

Un workflow de GitHub Actions compila `main` y despliega `dist/` en GitHub Pages. `astro.config.mjs` configura el sitio en `https://estrelladev.tech/portfolio/`, con rutas bajo `/portfolio/`. El archivo `CNAME` mantiene el dominio personalizado.

## Contenido

La página conserva el perfil profesional, servicios, proceso, tecnologías y las quince capturas de proyectos existentes. Pingo Club se presenta como un caso de estudio con demo y repositorio proporcionados por José. Las citas de Pingo Club se coordinan por WhatsApp; el sitio externo no guarda ni confirma horarios automáticamente.
