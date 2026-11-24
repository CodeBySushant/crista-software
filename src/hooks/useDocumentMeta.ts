import { createContext, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { absoluteUrl, cleanPath, DEFAULT_IMAGE, fullTitle, SITE_URL, type PageMeta } from '@/seo/site';

/** Filled during build-time pre-rendering so each page's head tags can be written into its HTML. */
export const HeadCollector = createContext<{ meta?: PageMeta } | null>(null);

function setTag(selector: string, create: () => HTMLElement, attr: string, value: string) {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}
const meta = (attr: 'name' | 'property', key: string, value: string) =>
  setTag(`meta[${attr}="${key}"]`, () => {
    const m = document.createElement('meta');
    m.setAttribute(attr, key);
    return m;
  }, 'content', value);

/**
 * Per-page title, description, canonical URL and social tags.
 * `title` is the page name only (empty for the homepage).
 */
export function useDocumentMeta(title: string, description: string, opts: { noindex?: boolean; image?: string } = {}) {
  const { pathname } = useLocation();
  const path = cleanPath(pathname);

  // Build time: hand the values to the pre-renderer.
  const collector = useContext(HeadCollector);
  if (collector) collector.meta = { title, description, path, ...opts };

  // In the browser: keep the head in sync during client-side navigation.
  useEffect(() => {
    const full = fullTitle(title);
    const url = absoluteUrl(path);
    const image = `${SITE_URL}${opts.image ?? DEFAULT_IMAGE}`;
    document.title = full;
    meta('name', 'description', description);
    meta('name', 'robots', opts.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large');
    meta('property', 'og:title', full);
    meta('property', 'og:description', description);
    meta('property', 'og:url', url);
    meta('property', 'og:image', image);
    meta('name', 'twitter:title', full);
    meta('name', 'twitter:description', description);
    meta('name', 'twitter:image', image);
    setTag('link[rel="canonical"]', () => {
      const l = document.createElement('link');
      l.rel = 'canonical';
      return l;
    }, 'href', url);
  }, [title, description, path, opts.noindex, opts.image]);
}
