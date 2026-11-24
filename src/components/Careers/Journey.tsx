import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import { journey } from '@/data/careers';
import { journeyIcons } from './icons';

const STEP = 92; // px between milestones on the ruler
const PAD = 120; // space before the first and after the last milestone
const x = (i: number) => PAD + STEP / 2 + i * STEP;

/**
 * Horizontal ruler timeline (Raycast-style). Hover, click or focus a milestone
 * to show its story below the ruler.
 */
export function Journey() {
  const [active, setActive] = useState(journey.length - 1);
  const scroller = useRef<HTMLDivElement>(null);
  const [view, setView] = useState({ scroll: 0, width: 0, offset: 0 });

  // Track scroll position and size so the story can sit under the active milestone.
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const measure = () => {
      const inner = el.firstElementChild as HTMLElement | null;
      setView({ scroll: el.scrollLeft, width: el.clientWidth, offset: inner ? inner.offsetLeft : 0 });
    };
    el.scrollLeft = el.scrollWidth; // start at the latest milestone
    measure();
    el.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      el.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
    };
  }, []);

  const width = journey.length * STEP + PAD * 2;
  const half = 160;
  const storyLeft = view.width
    ? Math.min(Math.max(view.offset + x(active) - view.scroll, half), view.width - half)
    : 0;
  const m = journey[active];
  const ActiveIcon = journeyIcons[m.icon];

  return (
    <div className="relative">
      <div
        ref={scroller}
        className="no-scrollbar overflow-x-auto overscroll-x-contain [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]"
      >
        <div className="relative mx-auto pb-4" style={{ width }}>
          {/* period labels */}
          <div className="relative h-6">
            {journey.map((j, i) =>
              i === 0 || journey[i - 1].period !== j.period ? (
                <span
                  key={`p-${i}`}
                  className="absolute top-0 whitespace-nowrap text-[13px] font-medium text-zinc-500"
                  style={{ left: x(i) - 4 }}
                >
                  {j.period}
                </span>
              ) : null,
            )}
          </div>

          {/* ruler ticks */}
          <div
            className="relative mt-3 h-11"
            aria-hidden
            style={{
              backgroundImage:
                'repeating-linear-gradient(90deg, rgba(255,255,255,0.14) 0 1px, transparent 1px 18.4px)',
              backgroundSize: `${STEP}px 18px`,
              backgroundPosition: `${PAD + STEP / 2}px 12px`,
              backgroundRepeat: 'repeat-x',
            }}
          >
            {journey.map((_, i) => (
              <span key={i} className="absolute top-0 h-11 w-px bg-white/25" style={{ left: x(i) }} />
            ))}
            <motion.span
              className="absolute -top-1 h-[calc(100%+70px)] w-px bg-gradient-to-b from-white via-white/70 to-transparent"
              animate={{ left: x(active) }}
              transition={{ type: 'spring', stiffness: 260, damping: 30 }}
            />
          </div>

          {/* milestone buttons */}
          <div className="relative h-14">
            {journey.map((j, i) => {
              const Icon = journeyIcons[j.icon];
              return (
                <button
                  key={j.title}
                  type="button"
                  aria-label={j.title}
                  aria-pressed={i === active}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={cn(
                    'absolute top-2 grid h-10 w-10 -translate-x-1/2 place-items-center rounded-full transition-colors',
                    i === active ? 'text-white' : 'text-zinc-600 hover:text-zinc-300',
                  )}
                  style={{ left: x(i) }}
                >
                  <Icon className="h-[19px] w-[19px]" strokeWidth={1.75} />
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* story for the active milestone, outside the scroller so it is never faded */}
      <div className="relative h-[190px]">
        {view.width > 0 && (
          <div className="absolute top-8 -translate-x-1/2 text-center" style={{ left: storyLeft, width: half * 2 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25 }}
            >
              <ActiveIcon className="mx-auto h-5 w-5 text-white" strokeWidth={1.75} aria-hidden />
              <p className="mt-4 text-[17px] font-semibold text-white">{m.title}</p>
              <p className="mt-2 text-[15px] leading-relaxed text-zinc-400">{m.description}</p>
            </motion.div>
          </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
