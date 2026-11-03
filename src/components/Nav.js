import { useEffect, useState } from 'react';
import { Download, Menu, X } from 'lucide-react';
import Container from './Container';
import Button from './Button';
import ThemeToggle from './ThemeToggle';
import { siteConfig } from '../content/siteConfig';
import { navSections } from '../content/sections';

export default function Nav({ dark, onToggleTheme, active }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Add a hairline + blurred background once the user scrolls.
  // rAF-throttled so the scroll handler never blocks the main thread.
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 8);
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu on Escape, navigation, or resize to desktop.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    const close = () => setMenuOpen(false);
    const desktop = window.matchMedia('(min-width: 1024px)');
    window.addEventListener('keydown', onKey);
    window.addEventListener('hashchange', close);
    desktop.addEventListener?.('change', close);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('hashchange', close);
      desktop.removeEventListener?.('change', close);
    };
  }, [menuOpen]);

  const solid = scrolled || menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-200 ${
        solid ? 'border-b border-line bg-bg/85 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <Container>
        <nav className="flex h-16 items-center justify-between" aria-label="Primary">
          <a
            href="#top"
            aria-label={`${siteConfig.name}, back to top`}
            className="rounded text-[0.95rem] font-semibold tracking-tight text-heading focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {siteConfig.name}
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-6 lg:flex">
            <ul className="flex items-center gap-6">
              {navSections.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={active === item.id ? 'location' : undefined}
                    className={`rounded text-sm transition-colors hover:text-heading focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                      active === item.id ? 'text-heading' : 'text-muted'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <ThemeToggle dark={dark} onToggle={onToggleTheme} />
            {siteConfig.resumeUrl && (
              <Button href={siteConfig.resumeUrl} download className="px-4 py-2">
                <Download size={15} aria-hidden="true" />
                Résumé
              </Button>
            )}
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-1 lg:hidden">
            <ThemeToggle dark={dark} onToggle={onToggleTheme} />
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="rounded-md p-2 text-muted transition-colors hover:bg-surface hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            </button>
          </div>
        </nav>
      </Container>

      {menuOpen && (
        <div id="mobile-menu" className="border-t border-line bg-bg lg:hidden">
          <Container className="py-3">
            <ul className="flex flex-col">
              {navSections.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setMenuOpen(false)}
                    aria-current={active === item.id ? 'location' : undefined}
                    className={`block rounded-md px-3 py-2.5 text-base transition-colors hover:bg-surface ${
                      active === item.id ? 'text-heading' : 'text-ink'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              {siteConfig.resumeUrl && (
                <li className="pt-2">
                  <Button href={siteConfig.resumeUrl} download className="w-full" onClick={() => setMenuOpen(false)}>
                    <Download size={16} aria-hidden="true" />
                    Download résumé
                  </Button>
                </li>
              )}
            </ul>
          </Container>
        </div>
      )}
    </header>
  );
}
