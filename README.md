# Mikel Villegas · Desarrollo web freelance

Mi portafolio: proyectos, experiencia y formación en un sitio estático pensado para quien busca construir una página o un sistema web.

[Ver la página](https://kutexvt.github.io/cv/)

## Desarrollo local

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Abre http://127.0.0.1:8765. No requiere instalación de dependencias ni compilación.

## Diseño

Fondo oscuro, azul y violeta. Composición asimétrica, retrato integrado y portadas descriptivas para Taxis, Horarios MEP y KutexOS. Las portadas son conceptos visuales de los proyectos, no capturas de sus interfaces.

Space Grotesk e IBM Plex Mono están alojadas en `assets/fonts/` con sus licencias SIL Open Font License. Fuentes originales: [Google Fonts](https://github.com/google/fonts).

## Comportamiento

- Adaptación móvil desde 320 px con menú desplegable
- Navegación por teclado, foco visible y enlace para saltar al contenido
- Certificados ampliables con Escape y devolución del foco
- Animación breve de entrada y transiciones de proyectos sin alterar el desplazamiento
- Respeto de `prefers-reduced-motion`
- Contenido, navegación y enlaces de certificados utilizables sin JavaScript

## Publicación

GitHub Pages publica la rama `main` desde la raíz. Los recursos utilizan rutas relativas para funcionar bajo `/cv/`.

## Comprobaciones

```sh
node --check script.js
node --test tests/interactions.test.cjs
git diff --check
```

La revisión visual se hace en escritorio a 1440 px y móvil a 390 y 320 px. Comprueba menú, navegación, certificados y contacto después de cualquier cambio.
