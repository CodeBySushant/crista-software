/**
 * Build-time renderer (not shipped to browsers).
 * scripts/prerender.mjs calls render() for every route to write static HTML.
 */
import { StrictMode } from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Writable } from 'node:stream';
import { AppShell } from './App';
import { HeadCollector } from './hooks/useDocumentMeta';
import { headTags, DEFAULT_DESCRIPTION, type PageMeta } from './seo/site';
export { SITE_URL } from './seo/site';
import { services } from './data/services';
import { products } from './data/products';
import { projects } from './data/projects';

/** Every indexable page. Add new static pages here. */
export const routes: string[] = [
  '/',
  '/services',
  ...services.map((s) => `/services/${s.slug}`),
  '/products',
  ...products.map((p) => `/products/${p.slug}`),
  '/work',
  ...projects.map((p) => `/work/${p.slug}`),
  '/about',
  '/contact',
  '/privacy',
  '/terms',
];

/** Renders one URL to HTML once every lazy page has loaded. */
export function render(url: string): Promise<{ html: string; head: string; meta: PageMeta }> {
  const collector: { meta?: PageMeta } = {};
  return new Promise((resolve, reject) => {
    let html = '';
    const sink = new Writable({
      write(chunk, _enc, cb) {
        html += chunk.toString();
        cb();
      },
      final(cb) {
        const meta = collector.meta ?? { title: '', description: DEFAULT_DESCRIPTION, path: url };
        resolve({ html, head: headTags(meta), meta });
        cb();
      },
    });
    const { pipe } = renderToPipeableStream(
      <StrictMode>
        <HeadCollector.Provider value={collector}>
          <StaticRouter location={url}>
            <AppShell />
          </StaticRouter>
        </HeadCollector.Provider>
      </StrictMode>,
      {
        onAllReady() {
          pipe(sink);
        },
        onShellError: reject,
        onError(err) {
          reject(err);
        },
      },
    );
  });
}
