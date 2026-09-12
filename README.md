# Marc Lidon Fotografía

Sitio web estático (HTML, CSS y JS puro, sin frameworks ni dependencias) para el negocio de fotografía de Marc Lidon, con sede en Lugano.

## Estructura

- `index.html` — Página de inicio
- `galeria.html` — Galería con filtros por categoría y lightbox
- `sobre-mi.html` — Página del fotógrafo
- `contacto.html` — Formulario y datos de contacto
- `css/style.css` — Estilos
- `js/main.js` — Menú móvil, filtros, lightbox y validación del formulario
- `images/` — Imágenes de marcador de posición (SVG)

## Ver el sitio localmente

No requiere instalación. Desde esta carpeta:

```
python3 -m http.server 8000
```

Luego abre `http://localhost:8000` en el navegador.

## Personalizar

1. **Fotos**: reemplaza los archivos en `images/` (`placeholder-1.svg` a `placeholder-9.svg`, `hero.svg`, `about.svg`) por tus propias fotos, manteniendo los mismos nombres, o actualiza el atributo `src` en cada HTML.
2. **Textos y precios**: edita directamente el contenido en `index.html`, `sobre-mi.html` y `galeria.html`.
3. **Datos de contacto**: el correo (`marclidon37@gmail.com`), teléfono (`+41 77 208 29 27`) y ubicación (Lugano) ya están configurados en `contacto.html` y en `js/main.js`. El formulario usa un enlace `mailto:` — para recibir mensajes sin depender del cliente de correo del visitante, conecta un servicio como Formspree o Netlify Forms.
4. **Colores**: ajusta las variables al inicio de `css/style.css` (`--bg`, `--accent`, etc.).

## Publicar

Es un sitio 100% estático: puedes subirlo tal cual a GitHub Pages, Netlify, Vercel o cualquier hosting.
