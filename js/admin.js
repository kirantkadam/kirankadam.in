/* ============================================
   Kiran Kadam Admin Panel — kirankadam.in
   Client-side dashboard for managing drafts,
   settings, and appearance previews.
   ============================================ */

(function () {
  "use strict";

  const STORAGE_KEYS = {
    drafts: "kkAdminDrafts",
    settings: "kkAdminSettings",
    appearance: "kkAdminAppearance",
    messages: "kkAdminMessages"
  };

  const PUBLISHED_POSTS = [
    {
      title: "Essential Windows 11 Tweaks for Power Users",
      category: "Windows",
      slug: "essential-windows-11-tweaks",
      url: "/posts/essential-windows-11-tweaks.html"
    }
  ];

  const SITE_PAGES = [
    { name: "Home", url: "/index.html" },
    { name: "Blog", url: "/blog.html" },
    { name: "About", url: "/about.html" },
    { name: "Contact", url: "/contact.html" },
    { name: "Privacy Policy", url: "/privacy.html" },
    { name: "404", url: "/404.html" }
  ];

  function getStorage(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function setStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      alert("Storage error: " + e.message);
    }
  }

  function escapeHtml(str) {
    if (typeof str !== "string") return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function slugify(text) {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-");
  }

  function generatePostHTML(post, baseHref) {
    const origin = baseHref || (typeof window !== "undefined" ? window.location.origin + "/" : "https://kirankadam.in/");
    const title = escapeHtml(post.title);
    const category = escapeHtml(post.category || "General");
    const excerpt = escapeHtml(post.excerpt || "");
    const today = new Date().toISOString().split("T")[0];
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <base href="${origin}">
  <script>
    (function () {
      const stored = localStorage.getItem("theme");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.setAttribute("data-theme", stored || (prefersDark ? "dark" : "light"));
    })();
  </script>
  <title>${title} | Kiran Kadam</title>
  <meta name="description" content="${excerpt}">
  <meta name="author" content="Kiran Kadam">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${origin}posts/${post.slug}.html">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="Kiran Kadam">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${excerpt}">
  <meta property="og:url" content="${origin}posts/${post.slug}.html">
  <meta property="og:image" content="${origin}images/og-home.svg">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${excerpt}">
  <meta name="twitter:image" content="${origin}images/og-home.svg">
  <link rel="icon" type="image/svg+xml" href="../images/favicon.svg">
  <link rel="stylesheet" href="../css/style.css">
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <header id="site-header" class="site-header"></header>
  <main id="main-content">
    <nav class="breadcrumbs" aria-label="Breadcrumb">
      <div class="container">
        <ol>
          <li><a href="/index.html">Home</a></li>
          <li><a href="/blog.html">Blog</a></li>
          <li aria-current="page">${title}</li>
        </ol>
      </div>
    </nav>
    <article class="article-content" data-reading-time>
      <header class="article-hero">
        <span class="article-tag">${category}</span>
        <h1 id="article-title">${title}</h1>
        <p class="hero-subtitle" style="font-size:1.1rem; margin-bottom:1rem;">${excerpt}</p>
        <div class="article-meta" style="justify-content:flex-start; gap:1rem;">
          <span>${today}</span>
          <span class="reading-time">5 min read</span>
          <span>By Kiran Kadam</span>
        </div>
      </header>
      ${post.content}
      <div class="share-buttons" aria-label="Share this article">
        <a href="https://twitter.com/intent/tweet?url=${origin}posts/${post.slug}.html&text=${encodeURIComponent(title)}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-secondary">Share on Twitter</a>
        <a href="https://www.linkedin.com/shareArticle?url=${origin}posts/${post.slug}.html&title=${encodeURIComponent(title)}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-secondary">Share on LinkedIn</a>
        <button type="button" class="btn btn-sm btn-secondary" onclick="navigator.clipboard.writeText(window.location.href)">Copy Link</button>
      </div>
      <div class="card" style="margin-top: 2.5rem;">
        <h3 class="card-title">Related Articles</h3>
        <ul class="footer-links" style="margin-top:0.75rem;">
          <li><a href="/posts/essential-windows-11-tweaks.html">Essential Windows 11 Tweaks for Power Users</a></li>
          <li><a href="/blog.html">Browse all articles</a></li>
        </ul>
      </div>
    </article>
  </main>
  <footer id="site-footer" class="site-footer"></footer>
  <button type="button" id="back-to-top" class="back-to-top" aria-label="Back to top" title="Back to top">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="18 15 12 9 6 15"/></svg>
  </button>
  <script src="../js/script.js" defer></script>
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      "headline": "${title}",
      "description": "${excerpt}",
      "author": { "@id": "${origin}#person" },
      "publisher": { "@id": "${origin}#person" },
      "datePublished": "${today}",
      "dateModified": "${today}",
      "mainEntityOfPage": { "@type": "WebPage", "@id": "${origin}posts/${post.slug}.html" }
    }
  </script>
</body>
</html>`;
  }

  function downloadFile(filename, content, type) {
    const blob = new Blob([content], { type: type || "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function getDrafts() {
    return getStorage(STORAGE_KEYS.drafts, []);
  }

  function saveDrafts(drafts) {
    setStorage(STORAGE_KEYS.drafts, drafts);
  }

  function renderDrafts() {
    const drafts = getDrafts();
    const list = document.getElementById("drafts-list");
    const statDrafts = document.getElementById("stat-drafts");
    const recent = document.getElementById("recent-drafts");

    if (statDrafts) statDrafts.textContent = drafts.length;

    if (list) {
      if (!drafts.length) {
        list.innerHTML = '<tr><td colspan="4" style="color:var(--text-muted);">No drafts saved.</td></tr>';
      } else {
        list.innerHTML = drafts
          .map(
            (d) => `
          <tr>
            <td>${escapeHtml(d.title)}</td>
            <td><code>${escapeHtml(d.slug)}</code></td>
            <td><span class="admin-badge">${escapeHtml(d.category)}</span></td>
            <td>
              <div class="admin-actions">
                <button type="button" class="btn btn-sm btn-secondary" data-edit="${d.id}">Edit</button>
                <button type="button" class="btn btn-sm btn-secondary" data-preview="${d.id}">Preview</button>
                <button type="button" class="btn btn-sm btn-secondary" data-download="${d.id}">Download</button>
                <button type="button" class="btn btn-sm" data-delete="${d.id}" style="background:var(--danger); color:#fff;">Delete</button>
              </div>
            </td>
          </tr>`
          )
          .join("");
      }
    }

    if (recent) {
      if (!drafts.length) {
        recent.innerHTML = '<p style="color:var(--text-muted);">No drafts yet. Create one in the Posts tab.</p>';
      } else {
        recent.innerHTML = `<ul class="admin-list">${drafts
          .slice(-3)
          .reverse()
          .map((d) => `<li><span>${escapeHtml(d.title)}</span><span class="admin-badge">${escapeHtml(d.category)}</span></li>`)
          .join("")}</ul>`;
      }
    }
  }

  function findDraft(id) {
    return getDrafts().find((d) => d.id === id);
  }

  function clearDraftForm() {
    const form = document.getElementById("draft-form");
    if (!form) return;
    form.reset();
    document.getElementById("draft-id").value = "";
    document.getElementById("draft-form-title").textContent = "Create / Edit Draft";
  }

  function fillDraftForm(draft) {
    document.getElementById("draft-id").value = draft.id;
    document.getElementById("draft-title").value = draft.title;
    document.getElementById("draft-slug").value = draft.slug;
    document.getElementById("draft-category").value = draft.category;
    document.getElementById("draft-excerpt").value = draft.excerpt;
    document.getElementById("draft-content").value = draft.content;
    document.getElementById("draft-form-title").textContent = "Edit Draft";
  }

  function handleDraftAction(e) {
    const id = e.target.getAttribute("data-edit") || e.target.getAttribute("data-delete") || e.target.getAttribute("data-preview") || e.target.getAttribute("data-download");
    if (!id) return;
    const drafts = getDrafts();
    const draft = drafts.find((d) => d.id === id);
    if (!draft) return;

    if (e.target.hasAttribute("data-edit")) {
      fillDraftForm(draft);
      switchTab("posts");
      return;
    }

    if (e.target.hasAttribute("data-delete")) {
      if (!confirm("Delete this draft?")) return;
      const filtered = drafts.filter((d) => d.id !== id);
      saveDrafts(filtered);
      renderDrafts();
      return;
    }

    if (e.target.hasAttribute("data-preview")) {
      const html = generatePostHTML(draft, window.location.origin + "/");
      const blob = new Blob([html], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
      return;
    }

    if (e.target.hasAttribute("data-download")) {
      downloadFile(`${draft.slug}.html`, generatePostHTML(draft, "https://kirankadam.in/"), "text/html");
    }
  }

  function saveDraftFromForm(e) {
    e.preventDefault();
    const title = document.getElementById("draft-title").value.trim();
    let slug = document.getElementById("draft-slug").value.trim();
    const category = document.getElementById("draft-category").value;
    const excerpt = document.getElementById("draft-excerpt").value.trim();
    const content = document.getElementById("draft-content").value.trim();

    if (!title || !slug || !content) return;
    slug = slugify(slug);

    const idInput = document.getElementById("draft-id").value;
    const drafts = getDrafts();

    if (idInput) {
      const index = drafts.findIndex((d) => d.id === idInput);
      if (index > -1) {
        drafts[index] = { id: idInput, title, slug, category, excerpt, content, updatedAt: Date.now() };
      }
    } else {
      drafts.push({ id: Date.now().toString(36), title, slug, category, excerpt, content, createdAt: Date.now() });
    }

    saveDrafts(drafts);
    renderDrafts();
    clearDraftForm();
    alert("Draft saved.");
  }

  function currentDraftFromForm() {
    const title = document.getElementById("draft-title").value.trim();
    let slug = document.getElementById("draft-slug").value.trim();
    const category = document.getElementById("draft-category").value;
    const excerpt = document.getElementById("draft-excerpt").value.trim();
    const content = document.getElementById("draft-content").value.trim();
    if (!title || !slug || !content) return null;
    return { title, slug: slugify(slug), category, excerpt, content };
  }

  function switchTab(tabId) {
    document.querySelectorAll(".admin-panel").forEach((panel) => panel.classList.remove("active"));
    const target = document.getElementById(tabId);
    if (target) target.classList.add("active");

    document.querySelectorAll("#admin-nav button").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-tab") === tabId);
    });
  }

  function loadSettings() {
    const settings = getStorage(STORAGE_KEYS.settings, {});
    const defaults = {
      title: "Kiran Kadam",
      tagline: "IT Administrator | Network Engineer | Cybersecurity Enthusiast",
      description: "Practical tech tutorials for IT admins, network engineers, and tech enthusiasts.",
      email: "hello@kirankadam.in",
      github: "https://github.com/kirankadam",
      linkedin: "https://www.linkedin.com/in/kirankadam",
      youtube: "",
      analytics: ""
    };
    const s = { ...defaults, ...settings };
    document.getElementById("site-title").value = s.title;
    document.getElementById("site-tagline").value = s.tagline;
    document.getElementById("site-description").value = s.description;
    document.getElementById("site-email").value = s.email;
    document.getElementById("site-github").value = s.github;
    document.getElementById("site-linkedin").value = s.linkedin;
    document.getElementById("site-youtube").value = s.youtube;
    document.getElementById("site-analytics").value = s.analytics;
  }

  function saveSettingsFromForm(e) {
    e.preventDefault();
    const settings = {
      title: document.getElementById("site-title").value.trim(),
      tagline: document.getElementById("site-tagline").value.trim(),
      description: document.getElementById("site-description").value.trim(),
      email: document.getElementById("site-email").value.trim(),
      github: document.getElementById("site-github").value.trim(),
      linkedin: document.getElementById("site-linkedin").value.trim(),
      youtube: document.getElementById("site-youtube").value.trim(),
      analytics: document.getElementById("site-analytics").value.trim()
    };
    setStorage(STORAGE_KEYS.settings, settings);
    alert("Settings saved locally.");
  }

  function loadAppearance() {
    const appearance = getStorage(STORAGE_KEYS.appearance, {});
    document.getElementById("accent-color").value = appearance.accent || "#2563eb";
    document.getElementById("font-scale").value = appearance.fontScale || "1";
    applyAppearance(appearance);
  }

  function applyAppearance(appearance) {
    let style = document.getElementById("admin-appearance-style");
    if (!style) {
      style = document.createElement("style");
      style.id = "admin-appearance-style";
      document.head.appendChild(style);
    }
    const accent = appearance.accent || "#2563eb";
    const scale = appearance.fontScale || "1";
    style.textContent = `
      :root {
        --primary: ${accent};
        --primary-dark: color-mix(in srgb, ${accent}, black 20%);
        --primary-light: color-mix(in srgb, ${accent}, white 60%);
      }
      html { font-size: ${scale}rem; }
    `;
  }

  function saveAppearanceFromForm(e) {
    e.preventDefault();
    const appearance = {
      accent: document.getElementById("accent-color").value,
      fontScale: document.getElementById("font-scale").value
    };
    setStorage(STORAGE_KEYS.appearance, appearance);
    applyAppearance(appearance);
    alert("Appearance preferences saved.");
  }

  function exportAll() {
    const data = {
      settings: getStorage(STORAGE_KEYS.settings, {}),
      appearance: getStorage(STORAGE_KEYS.appearance, {}),
      drafts: getDrafts()
    };
    const json = JSON.stringify(data, null, 2);
    downloadFile("kirankadam-admin-backup.json", json, "application/json");
  }

  function importAll(file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      try {
        const data = JSON.parse(event.target.result);
        if (data.settings) setStorage(STORAGE_KEYS.settings, data.settings);
        if (data.appearance) {
          setStorage(STORAGE_KEYS.appearance, data.appearance);
          applyAppearance(data.appearance);
        }
        if (Array.isArray(data.drafts)) saveDrafts(data.drafts);
        loadSettings();
        loadAppearance();
        renderDrafts();
        alert("Backup imported successfully.");
      } catch (err) {
        alert("Invalid JSON file.");
      }
    };
    reader.readAsText(file);
  }

  function bindEvents() {
    document.getElementById("admin-nav").addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON" && e.target.dataset.tab) {
        switchTab(e.target.dataset.tab);
      }
    });

    document.getElementById("drafts-list")?.addEventListener("click", handleDraftAction);

    document.getElementById("draft-form")?.addEventListener("submit", saveDraftFromForm);

    document.getElementById("btn-cancel-draft")?.addEventListener("click", clearDraftForm);

    document.getElementById("btn-preview-post")?.addEventListener("click", () => {
      const draft = currentDraftFromForm();
      if (!draft) return alert("Please fill title, slug, and content first.");
      const html = generatePostHTML(draft, window.location.origin + "/");
      const blob = new Blob([html], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    });

    document.getElementById("btn-download-post")?.addEventListener("click", () => {
      const draft = currentDraftFromForm();
      if (!draft) return alert("Please fill title, slug, and content first.");
      downloadFile(`${draft.slug}.html`, generatePostHTML(draft, "https://kirankadam.in/"), "text/html");
    });

    document.getElementById("settings-form")?.addEventListener("submit", saveSettingsFromForm);

    document.getElementById("appearance-form")?.addEventListener("submit", saveAppearanceFromForm);

    document.getElementById("btn-flush-dns")?.addEventListener("click", () => {
      document.getElementById("dns-hint").classList.toggle("admin-hidden");
    });

    document.getElementById("btn-export-all")?.addEventListener("click", exportAll);

    document.getElementById("import-file")?.addEventListener("change", (e) => {
      if (e.target.files[0]) importAll(e.target.files[0]);
    });

    document.getElementById("btn-reset-data")?.addEventListener("click", () => {
      if (!confirm("Clear all local admin data? This cannot be undone.")) return;
      Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
      loadSettings();
      loadAppearance();
      renderDrafts();
      alert("Local data cleared.");
    });

    document.getElementById("btn-export-settings")?.addEventListener("click", () => {
      const settings = getStorage(STORAGE_KEYS.settings, {});
      downloadFile("kirankadam-settings.json", JSON.stringify(settings, null, 2), "application/json");
    });

    document.getElementById("btn-import-settings")?.addEventListener("click", () => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "application/json";
      input.onchange = (e) => {
        if (e.target.files[0]) {
          const reader = new FileReader();
          reader.onload = (ev) => {
            try {
              const settings = JSON.parse(ev.target.result);
              setStorage(STORAGE_KEYS.settings, settings);
              loadSettings();
              alert("Settings imported.");
            } catch (err) {
              alert("Invalid JSON file.");
            }
          };
          reader.readAsText(e.target.files[0]);
        }
      };
      input.click();
    });

    document.getElementById("media-upload")?.addEventListener("change", (e) => {
      const file = e.target.files[0];
      const preview = document.getElementById("media-preview");
      if (!file || !preview) return;
      const reader = new FileReader();
      reader.onload = function (event) {
        preview.innerHTML = `<p style="color:var(--text-muted); margin-bottom:0.5rem;">${escapeHtml(file.name)} — ${(file.size / 1024).toFixed(1)} KB</p><img src="${event.target.result}" alt="Preview" style="max-width:100%; border-radius:var(--radius); border:1px solid var(--border);">`;
      };
      reader.readAsDataURL(file);
    });

    document.getElementById("btn-theme-light")?.addEventListener("click", () => {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    });
    document.getElementById("btn-theme-dark")?.addEventListener("click", () => {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    });
    document.getElementById("btn-theme-system")?.addEventListener("click", () => {
      localStorage.removeItem("theme");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.setAttribute("data-theme", prefersDark ? "dark" : "light");
    });
  }

  function init() {
    renderDrafts();
    loadSettings();
    loadAppearance();

    const statPages = document.getElementById("stat-pages");
    const statPublished = document.getElementById("stat-published");
    const statMessages = document.getElementById("stat-messages");
    if (statPages) statPages.textContent = SITE_PAGES.length;
    if (statPublished) statPublished.textContent = PUBLISHED_POSTS.length;
    if (statMessages) statMessages.textContent = getStorage(STORAGE_KEYS.messages, []).length;

    bindEvents();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
