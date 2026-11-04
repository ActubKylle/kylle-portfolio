import { useEffect, useState } from 'react';

// Minimal client-side router. Case studies live at real paths
// (/projects/htta, /websites/<slug>) so each one is its own crawlable page;
// home-page sections stay as #anchors.
//
// Clicks on same-site links to a different path are handled here with the
// History API instead of a full page load. Links to an anchor on the current
// page are left to the browser.
export function useRoute(initialPath) {
  const [path, setPath] = useState(() => initialPath ?? window.location.pathname);

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname);

    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = e.target.closest('a[href]');
      if (!link || link.target || link.hasAttribute('download')) return;

      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;

      e.preventDefault();
      window.history.pushState(null, '', url.pathname + url.hash);
      setPath(url.pathname);
    };

    window.addEventListener('popstate', onPopState);
    document.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('popstate', onPopState);
      document.removeEventListener('click', onClick);
    };
  }, []);

  return path;
}
