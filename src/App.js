import { useEffect, useLayoutEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Work from './components/Work';
import WebsiteGallery from './components/WebsiteGallery';
import TechnicalSeo from './components/TechnicalSeo';
import Skills from './components/Skills';
import Experience from './components/Experience';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import DraftNotice from './components/DraftNotice';
import { ProjectCaseStudy, WebsiteCaseStudy } from './components/CaseStudyPage';
import { useDarkMode } from './hooks/useDarkMode';
import { useActiveSection } from './hooks/useActiveSection';
import { useHashRoute } from './hooks/useHashRoute';
import { sections, navSections } from './content/sections';
import { projects } from './content/projects';
import { websites } from './content/websites';
import { siteConfig } from './content/siteConfig';
import { published } from './lib/drafts';

const SECTION_COMPONENTS = {
  projects: Work,
  websites: WebsiteGallery,
  seo: TechnicalSeo,
  skills: Skills,
  experience: Experience,
  about: About,
  contact: Contact,
};

// Stable reference so the IntersectionObserver effect doesn't re-run each render.
const NAV_IDS = navSections.map((s) => s.id);
const DEFAULT_TITLE = `${siteConfig.name} — ${siteConfig.role}`;

function findCaseStudy(route) {
  if (!route) return null;
  const list = route.type === 'projects' ? projects : websites;
  const item = published(list).find((entry) => entry.slug === route.slug && entry.caseStudy);
  return item ? { type: route.type, item } : null;
}

export default function App() {
  const [dark, toggleTheme] = useDarkMode();
  const route = useHashRoute();
  const page = findCaseStudy(route);
  const active = useActiveSection(NAV_IDS, !page);
  const pageKey = page ? `${page.type}/${page.item.slug}` : '';

  // Case study: start at the top. Home: honour a section anchor (e.g. coming
  // back via #websites) once the sections exist again.
  useLayoutEffect(() => {
    if (pageKey) {
      window.scrollTo(0, 0);
      return;
    }
    const id = window.location.hash.slice(1);
    if (id && !id.startsWith('/')) document.getElementById(id)?.scrollIntoView();
  }, [pageKey]);

  useEffect(() => {
    document.title = page ? `${page.item.title} — Case study · ${siteConfig.name}` : DEFAULT_TITLE;
  }, [page]);

  return (
    // reducedMotion="user" mutes all Framer animations for users who request it.
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('main')?.focus();
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-fg"
      >
        Skip to content
      </a>

      <Nav dark={dark} onToggleTheme={toggleTheme} active={page ? '' : active} />

      <main id="main" tabIndex={-1} className="outline-none">
        {page?.type === 'projects' && <ProjectCaseStudy project={page.item} />}
        {page?.type === 'websites' && <WebsiteCaseStudy site={page.item} />}
        {!page && (
          <>
            <Hero />
            {sections.map(({ id }) => {
              const Component = SECTION_COMPONENTS[id];
              return <Component key={id} />;
            })}
          </>
        )}
      </main>

      <Footer />
      <ScrollToTop />
      <DraftNotice />
    </MotionConfig>
  );
}
