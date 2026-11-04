import { useEffect, useLayoutEffect, useRef } from 'react';
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
import NotFound from './components/NotFound';
import { ProjectCaseStudy, WebsiteCaseStudy } from './components/CaseStudyPage';
import { useDarkMode } from './hooks/useDarkMode';
import { useActiveSection } from './hooks/useActiveSection';
import { useRoute } from './hooks/useRoute';
import { sections, navSections } from './content/sections';
import { resolvePage } from './lib/pages';

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

// useLayoutEffect warns when the app is rendered to HTML at build time.
const useClientLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

// `path` is passed in when prerendering; in the browser it comes from the URL.
export default function App({ path: initialPath }) {
  const toggleTheme = useDarkMode();
  const path = useRoute(initialPath);
  const page = resolvePage(path);
  const isHome = page.kind === 'home';
  const active = useActiveSection(NAV_IDS, isHome);

  // After navigating to another page: jump to the #anchor if there is one
  // (e.g. back to /#websites), otherwise start at the top. Instant, because the
  // site-wide smooth scrolling would animate through the old page's height.
  // The first load is left to the browser.
  const firstRender = useRef(true);
  useClientLayoutEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const id = window.location.hash.slice(1);
    const target = id && document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: 'instant' });
    else window.scrollTo({ top: 0, behavior: 'instant' });
  }, [path]);

  useEffect(() => {
    document.title = page.title;
  }, [page.title]);

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

      <Nav onToggleTheme={toggleTheme} active={isHome ? active : ''} />

      <main id="main" tabIndex={-1} className="outline-none">
        {page.kind === 'projects' && <ProjectCaseStudy project={page.item} />}
        {page.kind === 'websites' && <WebsiteCaseStudy site={page.item} />}
        {page.kind === 'notfound' && <NotFound />}
        {isHome && (
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
