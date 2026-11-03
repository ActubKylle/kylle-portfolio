# Kylle Nichole Actub — Portfolio

Personal portfolio of a full-stack web developer (Laravel, React, MySQL) who also does
WordPress development and technical SEO.

Built with React 18, Tailwind CSS 3, and Framer Motion (Create React App).

## Run it

```bash
npm install
npm start        # http://localhost:3000 — drafts visible
npm test         # filters, search, pagination, routing
npm run build    # production build — drafts removed
```

## Where things live

| Path | What it holds |
| --- | --- |
| `src/content/siteConfig.js` | Name, headline, email, socials, résumé, contact-form key |
| `src/content/sections.js` | Section order and nav labels |
| `src/content/projects.js` | Full-stack applications + the HTTA case study |
| `src/content/websites.js` | "Websites I've Worked On" gallery entries |
| `src/content/seo.js`, `skills.js`, `about.js` | Technical SEO, skills, about, experience, education |
| `src/components/` | Sections and reusable UI (cards, case-study layout, gallery) |
| `scripts/make-thumbnail.py` | Screenshot a site and write optimized WebP thumbnails |

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
entry. Then copy the template at the bottom of `src/content/websites.js`.

A site with a `caseStudy` gets its own page at `#/websites/<slug>`.

## Before deploying

Search the codebase for `TODO` — each one marks a fact only you can fill in (résumé,
experience, education, HTTA screenshots, contact-form key, canonical URL).
