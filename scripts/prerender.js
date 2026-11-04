// Last step of `npm run build`: render every page to static HTML so search
// engines and link previews get real content, a unique title and description,
// and a canonical URL without running JavaScript. Also writes the 404 page,
// sitemap.xml and robots.txt from the same page list the app uses.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'build');
const serverEntry = pathToFileURL(path.join(root, 'build-server', 'entry-server.js')).href;

const { render, listPages, notFoundPage, pageKey, siteConfig } = await import(serverEntry);
const template = fs.readFileSync(path.join(outDir, 'index.html'), 'utf8');
const site = siteConfig.siteUrl.replace(/\/$/, '');

const esc = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function personJsonLd() {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.name,
    jobTitle: siteConfig.role,
    url: `${site}/`,
    address: { '@type': 'PostalAddress', addressLocality: 'Cagayan de Oro City', addressCountry: 'PH' },
    knowsAbout: ['Laravel', 'React', 'PHP', 'MySQL', 'WordPress', 'Technical SEO'],
    sameAs: Object.values(siteConfig.socials),
  }).replace(/</g, '\\u003c');
}

function headFor(page) {
  const url = page.path && `${site}${page.path}`;
  const tags = [
    `<title>${esc(page.title)}</title>`,
    `<meta name="description" content="${esc(page.description)}" />`,
    url ? `<link rel="canonical" href="${url}" />` : '<meta name="robots" content="noindex" />',
    `<meta property="og:type" content="${page.kind === 'home' ? 'website' : 'article'}" />`,
    `<meta property="og:site_name" content="${esc(siteConfig.name)}" />`,
    `<meta property="og:title" content="${esc(page.title)}" />`,
    `<meta property="og:description" content="${esc(page.description)}" />`,
    url && `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${site}/og-image.png" />`,
    `<meta name="twitter:title" content="${esc(page.title)}" />`,
    `<meta name="twitter:description" content="${esc(page.description)}" />`,
    `<meta name="twitter:image" content="${site}/og-image.png" />`,
  ];
  if (page.kind === 'home') {
    tags.push(
      '<link rel="preload" as="image" href="/images/kylle-portrait.webp" type="image/webp" />',
      `<script type="application/ld+json">${personJsonLd()}</script>`
    );
  }
  return tags.filter(Boolean).join('\n    ');
}

// data-page tells src/index.jsx which page this HTML holds, so it only hydrates
// when the browser is on that page. Replacements use functions so `$` in the
// content is never read as a replacement pattern.
function write(file, page, renderPath) {
  const html = template
    .replace('<!--app-head-->', () => headFor(page))
    .replace('<div id="root"><!--app-html-->', () => `<div id="root" data-page="${pageKey(page)}">${render(renderPath)}`);
  const dest = path.join(outDir, file);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, html);
  console.log(`  ${file}`);
}

console.log('Prerendering pages:');
const pages = listPages();
// /projects/htta → projects/htta.html, served without the extension
// (`cleanUrls` in vercel.json).
for (const page of pages) {
  write(page.path === '/' ? 'index.html' : `${page.path.slice(1)}.html`, page, page.path);
}
write('404.html', notFoundPage, '/404');

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...pages.map((page) => `  <url><loc>${site}${page.path}</loc></url>`),
  '</urlset>',
  '',
].join('\n');
fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(outDir, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`);
console.log(`  sitemap.xml (${pages.length} URLs)\n  robots.txt`);
