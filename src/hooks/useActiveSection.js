import { useEffect, useState } from 'react';

// Tracks which section is currently in the viewport using IntersectionObserver
// (no scroll listener → no jank). `ids` should be a stable array reference.
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0] ?? '');

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      // Activate a section when it crosses the vertical middle of the screen.
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [ids]);

  return active;
}
