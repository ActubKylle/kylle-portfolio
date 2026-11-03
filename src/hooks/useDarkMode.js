import { useCallback, useEffect, useState } from 'react';

// Resolve the initial theme: explicit stored choice wins; otherwise default to
// dark unless the OS explicitly prefers light. This matches the no-flash script
// in public/index.html so there is no theme flicker on first paint.
function getInitial() {
  if (typeof window === 'undefined') return true;
  try {
    const stored = localStorage.getItem('theme');
    if (stored) return stored === 'dark';
  } catch {
    /* localStorage may be unavailable (private mode) */
  }
  return !window.matchMedia('(prefers-color-scheme: light)').matches;
}

export function useDarkMode() {
  const [dark, setDark] = useState(getInitial);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', dark);
    try {
      localStorage.setItem('theme', dark ? 'dark' : 'light');
    } catch {
      /* ignore */
    }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', dark ? '#0a0a0b' : '#ffffff');
  }, [dark]);

  const toggle = useCallback(() => setDark((d) => !d), []);
  return [dark, toggle];
}
