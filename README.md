# Lente & Luz Fotografía

Sitio web estático (HTML, CSS y JS puro, sin frameworks ni dependencias) para un negocio de fotografía.

## Estructura

- `index.html` — Página de inicio
- `galeria.html` — Galería con filtros por categoría y lightbox
- `sobre-mi.html` — Página de la fotógrafa
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
3. **Datos de contacto**: actualiza el correo, teléfono y redes sociales en `contacto.html` y en el pie de página de cada archivo. El formulario usa un enlace `mailto:` — para recibir mensajes sin depender del cliente de correo del visitante, conecta un servicio como Formspree o Netlify Forms.
4. **Colores**: ajusta las variables al inicio de `css/style.css` (`--bg`, `--accent`, etc.).

## Publicar

Es un sitio 100% estático: puedes subirlo tal cual a GitHub Pages, Netlify, Vercel o cualquier hosting.
