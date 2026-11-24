import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App, { preloadRoute } from './App';
import './styles/fonts.css';
import './styles/globals.css';

const root = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Pages are pre-rendered to HTML at build time. Load the current page's code first,
// then attach to that HTML instead of re-drawing it.
if (root.hasChildNodes()) {
  preloadRoute(window.location.pathname)
    .catch(() => undefined)
    .then(() => hydrateRoot(root, app));
} else {
  createRoot(root).render(app);
}
