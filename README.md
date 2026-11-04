# Kylle Nichole Actub — Portfolio

Personal portfolio of a full-stack web developer (Laravel, React, MySQL) who also does
WordPress development and technical SEO.

Built with React 18, Vite, Tailwind CSS 3, and Framer Motion. Every page is prerendered
to static HTML at build time and deployed on Vercel.

## Run it

```bash
npm install
npm start        # dev server at http://localhost:3000 — drafts visible
npm test         # Vitest: filters, search, pagination, routing, page list
npm run build    # production build in build/ — drafts removed, pages prerendered
npm run preview  # serve the production build at http://localhost:4173
```

## Where things live

| Path | What it holds |
| --- | --- |
| `src/content/siteConfig.js` | Name, site URL, headline, email, socials, résumé, contact-form key |
| `src/content/sections.js` | Section order and nav labels |
| `src/content/projects.js` | Full-stack applications + the HTTA case study |
| `src/content/websites.js` | "Websites I've Worked On" gallery entries |
| `src/content/seo.js`, `skills.js`, `about.js` | Technical SEO, skills, about, experience, education |
| `src/components/` | Sections and reusable UI (cards, case-study layout, gallery) |
| `src/lib/pages.js` | Every page and its URL, title, and description |
| `scripts/prerender.js` | Writes static HTML per page, `sitemap.xml`, and `robots.txt` |
| `scripts/make-thumbnail.py` | Screenshot a site and write optimized WebP thumbnails |

## Pages and SEO

The home page is one long page with `#section` anchors. Each case study has its own URL:
`/projects/<slug>` for applications and `/websites/<slug>` for sites in the gallery
(only entries with a `caseStudy`).

`npm run build` renders each of those pages to HTML with its own title, description,
canonical URL, and social-preview tags, then writes `sitemap.xml` and `robots.txt` from the
same list. Canonical URLs use `siteUrl` in `siteConfig.js`, so update it if the site
moves to a custom domain.

## Content rules

- **Drafts.** Any entry with `draft: true` shows in `npm start` with a yellow *Draft* badge
  and is stripped from `npm run build`. Use it for anything not yet verified.
- **Only real work.** List only sites and contributions you actually worked on. Use
  `client: { confidential: true }` to show a site without its name or link.
- **Measured numbers only.** PageSpeed results in a case study need the tool, device, and date.

## Adding a website to the gallery

```bash
py scripts/make-thumbnail.py --url https://example.com --out public/images/websites/example
```

The script captures the page with headless Chrome/Edge, crops it to 16:10, writes
`example-640.webp` and `example-1280.webp`, and prints the `image:` line to paste into the
entry. Then copy an existing entry in `src/content/websites.js`.

Add a `caseStudy` to give the site its own page at `/websites/<slug>`.

## Before deploying

Search the codebase for `TODO` — each one marks a fact only you can fill in (résumé,
experience, education, HTTA screenshots, contact-form key, site platforms).
