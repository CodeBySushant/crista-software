import { Component, lazy, Suspense, useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '@/utils/cn';

/** Crista crystal, built in Spline. Re-exporting in Spline updates this same URL. */
const SCENE_URL = 'https://prod.spline.design/iK7uHcu1JOiWXR4L/scene.splinecode';

// Loaded on demand so the 3D runtime never blocks the first paint.
const Spline = lazy(() => import('@splinetool/react-spline'));

/** If the 3D scene fails (offline, blocked, no WebGL), keep the still image instead of breaking the page. */
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    /* swallow: the still image remains visible */
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/** Only run live 3D on larger screens, with motion allowed and no data saver. */
function canRunLive() {
  if (typeof window === 'undefined') return false;
  const mq = window.matchMedia('(min-width: 1024px) and (prefers-reduced-motion: no-preference)');
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
  return mq.matches && !saveData;
}

/**
 * Hero visual: shows a still image of the crystal immediately, then swaps in
 * the live, rotating Spline scene once the browser is idle.
 * Phones, reduced-motion users and data-saver users keep the still image.
 */
export function HeroCrystal({ className }: { className?: string }) {
  const [live, setLive] = useState(false);
  const [ready, setReady] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  // Drag-to-rotate stays on, but the mouse wheel never reaches the 3D canvas:
  // the crystal keeps a fixed size and the page scrolls normally over it.
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const stop = (e: WheelEvent) => e.stopPropagation();
    el.addEventListener('wheel', stop, { capture: true, passive: true });
    return () => el.removeEventListener('wheel', stop, { capture: true });
  }, []);

  useEffect(() => {
    if (!canRunLive()) return;
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setLive(true), { timeout: 2500 });
      return () => w.cancelIdleCallback?.(id);
    }
    const t = window.setTimeout(() => setLive(true), 1200);
    return () => window.clearTimeout(t);
  }, []);

  const fade = 'radial-gradient(closest-side, #000 62%, transparent 100%)';

  return (
    <div
      ref={box}
      className={cn('relative aspect-square w-full select-none', ready && 'cursor-grab active:cursor-grabbing', className)}
      aria-hidden
    >
      {/* Still image: instant, and the permanent visual on phones */}
      <img
        src="/brand/crystal-poster.webp"
        alt=""
        width={640}
        height={640}
        decoding="async"
        className={cn(
          'pointer-events-none absolute inset-0 h-full w-full select-none object-contain transition-opacity duration-700',
          ready ? 'opacity-0' : 'opacity-100',
        )}
        style={{ WebkitMaskImage: fade, maskImage: fade }}
        draggable={false}
      />

      {live && (
        <SceneBoundary>
          <Suspense fallback={null}>
            <Spline
              scene={SCENE_URL}
              htmlContentMode="none"
              onLoad={() => setReady(true)}
              className={cn('absolute inset-0 transition-opacity duration-700', ready ? 'opacity-100' : 'opacity-0')}
            />
          </Suspense>
        </SceneBoundary>
      )}
    </div>
  );
}
