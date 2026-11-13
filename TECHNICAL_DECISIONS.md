# Decisiones técnicas

Fecha: 2026-11-13

## Astro 7 + TypeScript

Astro genera la página como HTML estático y permite separar layout, navegación y tarjetas de proyecto en componentes pequeños. El portafolio no requiere estado complejo ni widgets con hidratación, por lo que React añadiría JavaScript y dependencias sin una función que lo justifique. TypeScript se conserva para las interacciones de cliente y el chequeo de componentes.

Astro 7 se fijó tras `npm audit` detectar vulnerabilidades críticas y altas en la versión 5 inicialmente propuesta; npm recomendó una versión 7. Se verificó un build estático en esta configuración.

## CSS propio y JavaScript nativo

El diseño usa una hoja CSS pequeña, tokens de color, layouts fluidos y media queries; no incorpora Tailwind ni Lucide porque no son necesarios para la interfaz y sus iconos sencillos se dibujan inline. Las interacciones son menú móvil, filtro de proyectos y control de tema, implementados en TypeScript sin framework de runtime.

## Tema y accesibilidad

El tema inicial respeta la preferencia del sistema y permite alternar entre claro y oscuro; una elección explícita se guarda localmente. Se incluyen skip link, estados de foco, navegación rotulada, etiquetas ARIA en menú y filtros, alt en imágenes y `prefers-reduced-motion`.

## Imágenes

Las quince capturas se sirven como WebP redimensionado a un máximo de 1500 px y calidad 78. Los originales permanecen en `webs/`; las versiones optimizadas viven en `public/webs/`. La conversión redujo esas capturas de aproximadamente 27.7 MB a 1.16 MB (96%). El caso Pingo usa una fotografía real alojada en su repositorio público; dicho repositorio no se modifica.

## GitHub Pages

Astro publica de forma estática con `site: https://estrelladev.tech`, base `/portfolio` y trailing slash. El workflow construye con Node 22 y despliega el contenido de `dist/` mediante Pages Actions. Se conserva `CNAME`. La configuración de dominio custom se debe comprobar en GitHub Pages después de desplegar; Actions no permite confirmar el estado de un workflow aún no ejecutado.

## Dependencias

Solo Astro, TypeScript y `@astrojs/check` son dependencias directas. `sharp`, instalado como herramienta/transitivo de Astro, se usó para convertir capturas, pero no se importa en código del sitio.
