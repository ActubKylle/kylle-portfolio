// Every page the site can show, resolved from a URL path. The app uses this to
// pick what to render; scripts/prerender.js uses it to write one HTML file per
// page plus the sitemap, so the two can never disagree.
import { projects } from '../content/projects';
import { websites } from '../content/websites';
import { siteConfig } from '../content/siteConfig';
import { published } from './drafts';

const CASE_STUDY = /^\/(projects|websites)\/([\w-]+)\/?$/;
const HOME_TITLE = `${siteConfig.name} — ${siteConfig.role}`;

function caseStudies(kind) {
  const list = kind === 'projects' ? projects : websites;
  return published(list).filter((item) => item.caseStudy);
}

function caseStudyPage(kind, item) {
  return {
    kind,
    item,
    path: `/${kind}/${item.slug}`,
    title: `${item.title} — Case study · ${siteConfig.name}`,
    description: kind === 'projects' ? item.blurb : item.caseStudy.overview,
  };
}

export const homePage = { kind: 'home', path: '/', title: HOME_TITLE, description: siteConfig.description };

export const notFoundPage = {
  kind: 'notfound',
  path: null,
  title: `Page not found · ${siteConfig.name}`,
  description: "That page doesn't exist or has moved.",
};

export function resolvePage(pathname) {
  if (pathname === '/' || pathname === '') return homePage;
  const match = pathname.match(CASE_STUDY);
  const item = match && caseStudies(match[1]).find((entry) => entry.slug === match[2]);
  return item ? caseStudyPage(match[1], item) : notFoundPage;
}

// Identifies which page a prerendered HTML file holds.
export function pageKey(page) {
  return page.path ?? '404';
}

// Pages that exist at a URL (excludes the 404 page).
export function listPages() {
  return [
    homePage,
    ...caseStudies('projects').map((item) => caseStudyPage('projects', item)),
    ...caseStudies('websites').map((item) => caseStudyPage('websites', item)),
  ];
}
