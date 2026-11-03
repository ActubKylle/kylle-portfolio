import { useEffect, useState } from 'react';

// Tracks which section is currently in the viewport using IntersectionObserver
// (no scroll listener → no jank). `ids` should be a stable array reference.
// Starts empty so nothing is highlighted while the hero is in view; pass
// `enabled = false` while the sections are not rendered (case-study pages).
export function useActiveSection(ids, enabled = true) {
  const [active, setActive] = useState('');

  useEffect(() => {
    setActive('');
    if (!enabled || typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      // Activate a section when it crosses the vertical middle of the screen.
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    const hero = document.getElementById('top');
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    // Observing the hero lets the highlight clear when scrolling back to the top.
    [hero, ...els].filter(Boolean).forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [ids, enabled]);

  return active === 'top' ? '' : active;
}
