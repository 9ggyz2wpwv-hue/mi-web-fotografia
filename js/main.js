// Menú móvil
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav__toggle');
  const links = document.querySelector('.nav__links');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const isOpen = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // Animación de aparición al hacer scroll
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  initGallery();
  initContactForm();
});

// Filtro y lightbox de la galería
function initGallery() {
  const filterButtons = document.querySelectorAll('.gallery-filters button');
  const items = Array.from(document.querySelectorAll('.gallery-item'));
  const lightbox = document.querySelector('.lightbox');

  if (!items.length) return;

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const category = btn.dataset.filter;

      items.forEach((item) => {
        const match = category === 'todos' || item.dataset.category === category;
        item.style.display = match ? '' : 'none';
      });
    });
  });

  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector('img');
  const closeBtn = lightbox.querySelector('.lightbox__close');
  const prevBtn = lightbox.querySelector('.lightbox__prev');
  const nextBtn = lightbox.querySelector('.lightbox__next');
  let currentIndex = 0;

  function visibleItems() {
    return items.filter((item) => item.style.display !== 'none');
  }

  function openLightbox(index) {
    const visible = visibleItems();
    if (!visible.length) return;
    currentIndex = index;
    const img = visible[currentIndex].querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  function step(delta) {
    const visible = visibleItems();
    if (!visible.length) return;
    currentIndex = (currentIndex + delta + visible.length) % visible.length;
    const img = visible[currentIndex].querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
  }

  items.forEach((item) => {
    item.addEventListener('click', () => {
      const visible = visibleItems();
      const index = visible.indexOf(item);
      openLightbox(index === -1 ? 0 : index);
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', () => step(-1));
  nextBtn.addEventListener('click', () => step(1));

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  });
}

// Validación básica del formulario de contacto
function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('#nombre').value.trim();
    const email = form.querySelector('#email').value.trim();
    const message = form.querySelector('#mensaje').value.trim();
    const status = form.querySelector('.form-status');

    if (!name || !email || !message) {
      status.textContent = 'Por favor, completa todos los campos obligatorios.';
      status.style.color = '#e08787';
      return;
    }

    const subject = encodeURIComponent(`Nuevo mensaje de ${name} desde la web`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:hola@tuweb.com?subject=${subject}&body=${body}`;

    status.textContent = 'Abriendo tu cliente de correo para enviar el mensaje...';
    status.style.color = '#c9a15a';
  });
}
