/** In-page anchor scrolling that works with both browser and hash routing. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
}

export function anchorClick(href?: string) {
  if (!href?.startsWith('#')) return undefined;
  return (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToId(href.slice(1));
  };
}
