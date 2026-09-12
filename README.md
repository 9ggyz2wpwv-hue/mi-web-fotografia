# Elena Vidal Fotografía — Sitio Web

Sitio web estático de una sola página para un negocio de fotografía profesional (bodas, retratos y eventos). Construido con HTML, CSS y JavaScript puro, sin frameworks ni pasos de compilación.

## Estructura

```
mi-web-fotografia/
├── index.html        # Toda la estructura y contenido del sitio
├── css/
│   └── style.css      # Estilos, tema de color y diseño responsive
├── js/
│   └── script.js       # Menú móvil, galería filtrable, lightbox, slider, formulario
└── images/            # Coloca aquí tus fotografías reales
```

## Cómo verlo localmente

Abre `index.html` directamente en el navegador, o levanta un servidor simple:

```bash
python3 -m http.server 8000
# luego visita http://localhost:8000
```

## Personalización

1. **Fotos reales**: el sitio usa bloques de color (`.ph-image`) como marcador de posición en vez de fotografías, para no depender de imágenes externas. Sustitúyelos por tus propias fotos:
   - Coloca tus imágenes en `images/`.
   - Reemplaza cada `<div class="ph-image ph-X"><i class="fa-solid ..."></i></div>` por `<img src="images/tu-foto.jpg" alt="...">`.
2. **Marca**: cambia el nombre "Elena Vidal Fotografía", el texto del hero, la biografía en "Sobre mí" y los datos de contacto (email, teléfono, ciudad, redes sociales) en `index.html`.
3. **Colores**: el tema de color se controla con variables CSS al inicio de `css/style.css` (`:root { --color-accent: ...; }`). Cambia `--color-accent` y `--color-dark` para adaptarlo a tu marca.
4. **Precios y servicios**: edita la sección `#servicios` en `index.html`.
5. **Formulario de contacto**: actualmente el formulario solo valida y muestra un mensaje de confirmación en el navegador (no envía datos a ningún sitio). Para recibir mensajes reales, conéctalo a un servicio como [Formspree](https://formspree.io), [Netlify Forms](https://www.netlify.com/products/forms/) o tu propio backend, y actualiza el `fetch`/`action` en `js/script.js` o `index.html`.

## Publicar el sitio

Al ser un sitio 100% estático, puedes desplegarlo gratis en:

- **GitHub Pages**: Settings → Pages → selecciona la rama y carpeta raíz.
- **Netlify** o **Vercel**: arrastra la carpeta o conecta el repositorio.

## Características

- Diseño totalmente responsive (móvil, tablet, escritorio).
- Menú de navegación con hamburguesa en móvil.
- Galería de portafolio filtrable por categoría (bodas, retratos, eventos, naturaleza).
- Lightbox al hacer clic en una imagen de la galería.
- Contadores animados de estadísticas.
- Carrusel de testimonios automático.
- Formulario de contacto con validación básica.
- Animaciones de aparición al hacer scroll.
- Sin dependencias de build: solo HTML/CSS/JS y Google Fonts + Font Awesome vía CDN.
