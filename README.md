# kirankadam.in

A personal professional website and technical knowledge hub for Kiran Kadam — IT Administrator, Network Engineer, Cybersecurity Enthusiast, AI Explorer, IoT Developer, and Google Workspace Administrator.

## Stack

- HTML5
- CSS3 (custom design system, no frameworks)
- Vanilla JavaScript (no React, Vue, Angular, etc.)

## Project Structure

```
kirankadam.in/
├── index.html
├── about.html
├── blog.html
├── contact.html
├── privacy.html
├── 404.html
├── robots.txt
├── sitemap.xml
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/
├── assets/
└── posts/
```

## Features

- Mobile-first, fully responsive layout
- Dark mode toggle with persistence
- Sticky navigation with mobile hamburger menu
- Scroll animations, back-to-top button
- SEO meta tags, Open Graph, Twitter Cards
- JSON-LD structured data (Person, WebSite, Blog)
- Accessible semantic HTML with skip links and ARIA labels
- Reusable header/footer rendered via JavaScript
- Placeholder content for articles, categories, tools, and testimonials

## Local Preview

Open `index.html` directly in a browser, or serve the folder locally:

```bash
python -m http.server 8000
# then visit http://localhost:8000
```

## Deployment

This site is designed to be deployed on Vercel from a GitHub repository.

1. Push this folder to a new GitHub repository.
2. Import the repository in [Vercel](https://vercel.com).
3. Keep the default settings (Static framework, output directory `./`).
4. Add the custom domain `kirankadam.in` in Vercel and update DNS at Hiox India as instructed.

## Author

Kiran Kadam
