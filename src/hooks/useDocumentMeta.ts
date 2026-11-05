import { useEffect } from 'react';

const SITE = 'Crista Software';

function setMeta(attr: 'name' | 'property', key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}

/** Per-route title, description and Open Graph tags. */
export function useDocumentMeta(title: string, description: string) {
  useEffect(() => {
    const full = title ? `${title} — ${SITE}` : `${SITE} — Ideas Into Impact.`;
    document.title = full;
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', full);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', window.location.href);
  }, [title, description]);
}
