/* ============================================
   Kiran Kadam — kirankadam.in
   Shared JavaScript: components, theme, UX
   ============================================ */

(function () {
  "use strict";

  const SITE = {
    name: "Kiran Kadam",
    domain: "kirankadam.in",
    tagline: "IT Administrator | Network Engineer | Cybersecurity Enthusiast",
    social: {
      github: "https://github.com/kirankadam",
      linkedin: "https://www.linkedin.com/in/kirankadam",
      youtube: "#",
      email: "mailto:hello@kirankadam.in"
    }
  };

  const NAV_LINKS = [
    { label: "Home", href: "index.html" },
    { label: "Blog", href: "blog.html" },
    { label: "Categories", href: "index.html#categories" },
    { label: "AI Tools", href: "index.html#ai-tools" },
    { label: "Projects", href: "index.html#projects" },
    { label: "About", href: "about.html" },
    { label: "Contact", href: "contact.html" }
  ];

  /* ---------- Components ---------- */

  function renderHeader() {
    const header = document.getElementById("site-header");
    if (!header) return;

    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    header.innerHTML = `
      <div class="container header-inner">
        <a href="index.html" class="brand" aria-label="${SITE.name} home">
          <span class="brand-mark">KK</span>
          <span class="brand-text">${SITE.name}</span>
        </a>
        <button class="nav-toggle" id="nav-toggle" aria-label="Toggle navigation" aria-expanded="false" aria-controls="primary-nav">
          <span class="hamburger"></span>
        </button>
        <nav id="primary-nav" class="primary-nav" aria-label="Primary">
          <ul class="nav-list">
            ${NAV_LINKS.map(link => {
              const isActive = currentPage === link.href || (currentPage === "" && link.href === "index.html");
              return `<li><a href="${link.href}" ${isActive ? 'aria-current="page"' : ""}>${link.label}</a></li>`;
            }).join("")}
          </ul>
          <div class="header-actions">
            <button class="theme-toggle" id="theme-toggle" aria-label="Toggle dark mode" title="Toggle dark mode">
              <svg class="theme-icon moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              <svg class="theme-icon sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
            </button>
          </div>
        </nav>
      </div>
    `;
  }

  function renderFooter() {
    const footer = document.getElementById("site-footer");
    if (!footer) return;

    const year = new Date().getFullYear();

    footer.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <a href="index.html" class="brand" aria-label="${SITE.name} home">
              <span class="brand-mark">KK</span>
              <span class="brand-text">${SITE.name}</span>
            </a>
            <p>${SITE.tagline}. Sharing practical tutorials for IT admins, students, network engineers, and tech enthusiasts.</p>
            <ul class="social-links" aria-label="Social links">
              <li><a href="${SITE.social.github}" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23a11.49 11.49 0 0 1 3-1.05c.405 0 .825.045 1.23.105 2.28-1.56 3.285-1.23 3.285-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg></a></li>
              <li><a href="${SITE.social.linkedin}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a></li>
              <li><a href="${SITE.social.youtube}" aria-label="YouTube"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55A3.016 3.016 0 0 0 .5 6.186 31.52 31.52 0 0 0 0 12a31.52 31.52 0 0 0 .5 5.814 3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136A31.52 31.52 0 0 0 24 12a31.52 31.52 0 0 0-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a></li>
              <li><a href="${SITE.social.email}" aria-label="Email"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></a></li>
            </ul>
          </div>
          <div>
            <h3 class="footer-heading">Explore</h3>
            <ul class="footer-links">
              <li><a href="index.html">Home</a></li>
              <li><a href="blog.html">Blog</a></li>
              <li><a href="about.html">About</a></li>
              <li><a href="contact.html">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 class="footer-heading">Topics</h3>
            <ul class="footer-links">
              <li><a href="#">Windows</a></li>
              <li><a href="#">Networking</a></li>
              <li><a href="#">Cybersecurity</a></li>
              <li><a href="#">Google Workspace</a></li>
            </ul>
          </div>
          <div>
            <h3 class="footer-heading">Legal</h3>
            <ul class="footer-links">
              <li><a href="privacy.html">Privacy Policy</a></li>
              <li><a href="#">Terms of Use</a></li>
              <li><a href="sitemap.xml">Sitemap</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p>© ${year} ${SITE.name}. All rights reserved. Built with care for the tech community.</p>
        </div>
      </div>
    `;
  }

  /* ---------- Theme ---------- */

  function initTheme() {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = stored || (prefersDark ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", theme);
  }

  function toggleTheme() {
    const html = document.documentElement;
    const current = html.getAttribute("data-theme") || "light";
    const next = current === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  }

  /* ---------- Mobile Navigation ---------- */

  function initNavigation() {
    const toggle = document.getElementById("nav-toggle");
    const nav = document.getElementById("primary-nav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      document.body.classList.toggle("nav-open", isOpen);
    });

    document.addEventListener("click", (e) => {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("nav-open");
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("nav-open");
      }
    });
  }

  /* ---------- Back to Top ---------- */

  function initBackToTop() {
    const btn = document.getElementById("back-to-top");
    if (!btn) return;

    window.addEventListener("scroll", () => {
      btn.classList.toggle("visible", window.scrollY > 400);
    });

    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Scroll Reveal ---------- */

  function initReveal() {
    const elements = document.querySelectorAll(".reveal");
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    elements.forEach((el) => observer.observe(el));
  }

  /* ---------- Search Filter ---------- */

  function initSearch() {
    const input = document.getElementById("hero-search");
    const targets = document.querySelectorAll("[data-search]");
    if (!input || !targets.length) return;

    input.addEventListener("input", (e) => {
      const term = e.target.value.trim().toLowerCase();
      targets.forEach((item) => {
        const text = item.getAttribute("data-search").toLowerCase();
        item.style.display = term && !text.includes(term) ? "none" : "";
      });
    });
  }

  /* ---------- Copy Code ---------- */

  function initCopyCode() {
    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".copy-code");
      if (!btn) return;
      const pre = btn.closest("pre");
      if (!pre) return;

      const code = pre.querySelector("code") || pre;
      navigator.clipboard.writeText(code.innerText).then(() => {
        const original = btn.textContent;
        btn.textContent = "Copied!";
        setTimeout(() => (btn.textContent = original), 1500);
      });
    });
  }

  /* ---------- Reading Time ---------- */

  function initReadingTime() {
    const articles = document.querySelectorAll("[data-reading-time]");
    articles.forEach((article) => {
      const words = article.textContent.trim().split(/\s+/).length;
      const minutes = Math.max(1, Math.round(words / 200));
      const target = article.querySelector(".reading-time");
      if (target) target.textContent = `${minutes} min read`;
    });
  }

  /* ---------- Initialization ---------- */

  function init() {
    initTheme();
    renderHeader();
    renderFooter();
    initNavigation();
    initBackToTop();
    initReveal();
    initSearch();
    initCopyCode();
    initReadingTime();

    const themeBtn = document.getElementById("theme-toggle");
    if (themeBtn) themeBtn.addEventListener("click", toggleTheme);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
