(function () {
  "use strict";

  var CONTACT_EMAIL = "hola@panenka.com";

  document.addEventListener("DOMContentLoaded", function () {
    initNavToggle();
    initReveal();
    initYear();
    initForm();
  });

  function initNavToggle() {
    var toggle = document.querySelector(".nav__toggle");
    var links = document.querySelector(".nav__links");
    if (!toggle || !links) return;

    toggle.addEventListener("click", function () {
      var isOpen = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    links.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

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

    items.forEach(function (el) {
      observer.observe(el);
    });
  }

  function initYear() {
    var yearEl = document.getElementById("year");
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  function initForm() {
    var form = document.getElementById("meetingForm");
    if (!form) return;

    var status = document.getElementById("formStatus");

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      clearErrors(form);

      var name = form.elements["name"].value.trim();
      var email = form.elements["email"].value.trim();
      var company = form.elements["company"].value.trim();
      var message = form.elements["message"].value.trim();

      var errors = {};
      if (!name) errors.name = "Indica tu nombre.";
      if (!email) {
        errors.email = "Indica tu email.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = "Introduce un email válido.";
      }
      if (!message) errors.message = "Cuéntanos brevemente tu proyecto.";

      if (Object.keys(errors).length) {
        showErrors(form, errors);
        status.textContent = "Revisa los campos marcados.";
        status.classList.remove("success");
        return;
      }

      var subject = "Solicitud de reunión — " + name;
      var bodyLines = [
        "Nombre: " + name,
        "Email: " + email,
        company ? "Empresa: " + company : null,
        "",
        "Mensaje:",
        message,
      ].filter(Boolean);

      var mailtoUrl =
        "mailto:" +
        CONTACT_EMAIL +
        "?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(bodyLines.join("\n"));

      window.location.href = mailtoUrl;

      status.textContent =
        "Se abrirá tu cliente de correo para enviar la solicitud. Si no ocurre, escríbenos a " +
        CONTACT_EMAIL +
        ".";
      status.classList.add("success");
      form.reset();
    });
  }

  function clearErrors(form) {
    form.querySelectorAll(".form-row").forEach(function (row) {
      row.classList.remove("has-error");
    });
    form.querySelectorAll(".form-error").forEach(function (el) {
      el.textContent = "";
    });
  }

  function showErrors(form, errors) {
    Object.keys(errors).forEach(function (field) {
      var input = form.elements[field];
      var row = input ? input.closest(".form-row") : null;
      var errorEl = form.querySelector('[data-error-for="' + field + '"]');
      if (row) row.classList.add("has-error");
      if (errorEl) errorEl.textContent = errors[field];
    });
  }
})();
