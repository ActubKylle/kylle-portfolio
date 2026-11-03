import { useEffect, useState } from 'react';

// Minimal hash router for case-study pages, e.g. #/projects/htta or
// #/websites/<slug>. Plain section anchors (#contact) are not routes, so the
// one-page navigation keeps working. Hash URLs need no server rewrite rules on
// static hosts.
const ROUTE = /^#\/(projects|websites)\/([\w-]+)\/?$/;

function parse() {
  const match = window.location.hash.match(ROUTE);
  return match ? { type: match[1], slug: match[2] } : null;
}

export function useHashRoute() {
  const [route, setRoute] = useState(parse);

  useEffect(() => {
    const onChange = () => setRoute(parse());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return route;
}
