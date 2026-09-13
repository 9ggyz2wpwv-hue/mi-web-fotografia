(function () {
  "use strict";

  var CONTACT_EMAIL = "hola@panenka.com";

  /* Header con fondo al hacer scroll */
  var header = document.getElementById("siteHeader");
  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 40);
  }
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Menú móvil */
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var isOpen = navLinks.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* Reveal on scroll */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* Formulario de reunión */
  var form = document.getElementById("meetingForm");
  var status = document.getElementById("formStatus");

  function setStatus(message, type) {
    if (!status) return;
    status.textContent = message;
    status.className = "form-status" + (type ? " " + type : "");
  }

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var nombre = form.nombre.value.trim();
      var email = form.email.value.trim();
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!nombre || !email) {
        setStatus("Por favor, completa tu nombre y email.", "error");
        return;
      }
      if (!emailPattern.test(email)) {
        setStatus("Introduce un email válido.", "error");
        return;
      }

      var empresa = form.empresa.value.trim();
      var telefono = form.telefono.value.trim();
      var interes = form.interes.value;
      var mensaje = form.mensaje.value.trim();

      var bodyLines = [
        "Nombre: " + nombre,
        "Empresa: " + (empresa || "-"),
        "Email: " + email,
        "Teléfono: " + (telefono || "-"),
        "Interés: " + interes,
        "",
        "Mensaje:",
        mensaje || "-"
      ];

      var subject = encodeURIComponent("Solicitud de reunión — " + nombre);
      var body = encodeURIComponent(bodyLines.join("\n"));
      var mailtoLink = "mailto:" + CONTACT_EMAIL + "?subject=" + subject + "&body=" + body;

      window.location.href = mailtoLink;
      setStatus("Abriendo tu cliente de correo para enviar la solicitud...", "success");
    });
  }
})();
