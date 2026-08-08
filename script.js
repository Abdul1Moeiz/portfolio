// ============ ROLE ROTATOR (typing effect) ============
const roles = ["Software Engineer", "Web Developer", "UX-minded Builder", "IEEE Chapter President"];
const roleEl = document.getElementById("roleText");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  if (!roleEl) return;
  const current = roles[roleIndex];

  if (!deleting) {
    charIndex++;
    roleEl.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    charIndex--;
    roleEl.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeLoop, deleting ? 35 : 65);
}

if (roleEl) {
  if (prefersReducedMotion) {
    roleEl.textContent = roles[0];
  } else {
    typeLoop();
  }
}

// ============ MOBILE NAV TOGGLE ============
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.classList.toggle("open", isOpen);
    navToggle.setAttribute("aria-expanded", isOpen);
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// ============ BACK TO TOP ============
const toTopBtn = document.getElementById("toTop");
if (toTopBtn) {
  toTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  });
}

// ============ FOOTER YEAR ============
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// ============ SCROLL-TRIGGERED REVEAL ============
const revealTargets = document.querySelectorAll(
  ".section-title, .about-text, .skill-card, .timeline-item, .project-card, .contact-link"
);

if ("IntersectionObserver" in window && !prefersReducedMotion) {
  revealTargets.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(16px)";
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  revealTargets.forEach((el) => observer.observe(el));
}

// ============ NAV BACKGROUND ON SCROLL ============
const nav = document.getElementById("nav");
if (nav) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      nav.style.boxShadow = "0 1px 0 rgba(0,0,0,0.04)";
    } else {
      nav.style.boxShadow = "none";
    }
  });
}
