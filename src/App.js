import { MotionConfig } from 'framer-motion';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Work from './components/Work';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { useDarkMode } from './hooks/useDarkMode';
import { useActiveSection } from './hooks/useActiveSection';
import { siteConfig } from './content/siteConfig';

// Stable reference so the IntersectionObserver effect doesn't re-run each render.
const SECTION_IDS = siteConfig.nav.map((n) => n.id);

export default function App() {
  const [dark, toggleTheme] = useDarkMode();
  const active = useActiveSection(SECTION_IDS);

  return (
    // reducedMotion="user" mutes all Framer animations for users who request it.
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-fg"
      >
        Skip to content
      </a>

      <Nav dark={dark} onToggleTheme={toggleTheme} active={active} />

      <main id="main">
        <Hero />
        <Work />
        <About />
        <Contact />
      </main>

      <Footer />
      <ScrollToTop />
    </MotionConfig>
  );
}
