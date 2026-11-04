import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { pageKey, resolvePage } from './lib/pages';

// Case studies used to live at #/projects/<slug>. Send old links to the new
// path with a full load so the right prerendered page is served.
const legacy = window.location.hash.match(/^#(\/(?:projects|websites)\/[\w-]+)\/?$/);

if (legacy) {
  window.location.replace(legacy[1]);
} else {
  const container = document.getElementById('root');
  const app = (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  // Production pages arrive prerendered (scripts/prerender.js): attach to that
  // HTML. Render from scratch on the dev server (empty root) or if the host
  // served another page's HTML, e.g. a fallback to index.html.
  const prerendered = container.dataset.page === pageKey(resolvePage(window.location.pathname));
  if (prerendered) ReactDOM.hydrateRoot(container, app);
  else ReactDOM.createRoot(container).render(app);
}
