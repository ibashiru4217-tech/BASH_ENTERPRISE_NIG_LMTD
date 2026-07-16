/* =========================================================
   BASH ENTERPRISE — SHARED SCRIPT
   Handles: mobile nav toggle, scroll-reveal animations,
   sticky navbar shadow, active nav link, contact form.
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  initMobileNav();
  initScrollReveal();
  initNavbarShadow();
  initActiveNavLink();
  initContactForm();
  initYear();
});

/* ---------- Mobile hamburger navigation ---------- */
function initMobileNav() {
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");

  if (!toggle || !links) return;

  toggle.addEventListener("click", function () {
    var isOpen = links.classList.toggle("is-open");
    toggle.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // Close menu when a nav link is clicked (mobile)
  links.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      links.classList.remove("is-open");
      toggle.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  // Close menu on outside click
  document.addEventListener("click", function (e) {
    if (!links.contains(e.target) && !toggle.contains(e.target)) {
      links.classList.remove("is-open");
      toggle.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

/* ---------- Scroll-triggered fade/slide reveal ---------- */
function initScrollReveal() {
  var targets = document.querySelectorAll(".reveal, .reveal-stagger");
  if (!targets.length) return;

  if (!("IntersectionObserver" in window)) {
    targets.forEach(function (el) { el.classList.add("is-visible"); });
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
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );

  targets.forEach(function (el) { observer.observe(el); });
}

/* ---------- Sticky navbar shadow on scroll ---------- */
function initNavbarShadow() {
  var nav = document.querySelector(".navbar");
  if (!nav) return;

  function update() {
    if (window.scrollY > 8) {
      nav.style.boxShadow = "0 8px 24px rgba(15, 42, 71, 0.10)";
    } else {
      nav.style.boxShadow = "none";
    }
  }

  update();
  window.addEventListener("scroll", update, { passive: true });
}

/* ---------- Highlight active nav link based on current page ---------- */
function initActiveNavLink() {
  var path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a[href]").forEach(function (link) {
    var href = link.getAttribute("href");
    if (href === path || (path === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });
}

/* ---------- Contact form (client-side only, no backend) ---------- */
function initContactForm() {
  var form = document.getElementById("contact-form");
  var status = document.getElementById("form-status");
  if (!form || !status) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var name = form.querySelector("#name");
    if (name && name.value.trim().length < 2) {
      name.focus();
      return;
    }

    status.textContent =
      "Thanks, " + (name ? name.value.trim().split(" ")[0] : "friend") +
      "! Your message has been received. We will get back to you shortly.";
    status.classList.add("success");
    form.reset();
  });
}

/* ---------- Footer year ---------- */
function initYear() {
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}
