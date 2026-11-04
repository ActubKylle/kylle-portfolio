// Server bundle used only by scripts/prerender.js at build time.
import { renderToString } from 'react-dom/server';
import App from './App';

export { listPages, notFoundPage, pageKey } from './lib/pages';
export { siteConfig } from './content/siteConfig';

export function render(path) {
  return renderToString(<App path={path} />);
}
