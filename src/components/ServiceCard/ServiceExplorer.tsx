import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Check, Plus } from 'lucide-react';
import { services } from '@/data/services';
import { Mock } from '@/components/Mock/Mock';
import { ArrowLink } from '@/components/Buttons/Button';
import { cn } from '@/utils/cn';

/**
 * Homepage service showcase: an index list that drives a large interface
 * stage on desktop, and an accordion with inline visuals on mobile.
 */
export function ServiceExplorer() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const s = services[active];

  return (
    <>
      {/* Desktop */}
      <div className="hidden gap-10 lg:grid lg:grid-cols-12">
        <div className="col-span-5" role="tablist" aria-label="Services" aria-orientation="vertical">
          {services.map((sv, i) => (
            <button
              key={sv.slug}
              role="tab"
              id={`svc-tab-${i}`}
              aria-selected={i === active}
              aria-controls="svc-panel"
              tabIndex={i === active ? 0 : -1}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                  e.preventDefault();
                  const n = (i + (e.key === 'ArrowDown' ? 1 : -1) + services.length) % services.length;
                  document.getElementById(`svc-tab-${n}`)?.focus();
                }
              }}
              className={cn('group relative flex w-full items-baseline gap-5 border-t border-line py-5 text-left transition-colors last:border-b', i === active ? 'text-ink' : 'text-ink/35 hover:text-ink/70')}
            >
              <span className="font-mono text-[12px] tabular-nums">{sv.index}</span>
              <span className="font-display text-[28px] font-medium leading-none tracking-tighter2 xl:text-[32px]">{sv.title}</span>
              {i === active && <motion.span layoutId="svc-bar" className="absolute -left-px top-[-1px] h-px w-full bg-brand-gradient" transition={{ duration: reduce ? 0 : 0.35 }} />}
            </button>
          ))}
        </div>

        <div id="svc-panel" role="tabpanel" aria-labelledby={`svc-tab-${active}`} className="col-span-7">
          <div className="relative rounded-[22px] bg-paper-off p-8 ring-1 ring-line">
            <AnimatePresence mode="wait">
              <motion.div
                key={s.slug}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className={cn('mx-auto', s.mock === 'mobile' ? 'w-[46%]' : 'w-full')}>
                  <Mock kind={s.mock} />
                </div>
                <div className="mt-10 grid grid-cols-2 gap-8">
                  <div>
                    <p className="text-[15px] leading-relaxed text-ink">{s.summary}</p>
                    <ArrowLink to={`/services/${s.slug}`} className="mt-5">Learn more</ArrowLink>
                  </div>
                  <ul className="grid grid-cols-1 gap-2 text-[13.5px] text-muted">
                    {s.capabilities.slice(0, 5).map((c) => (
                      <li key={c} className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-brand-emerald" aria-hidden />{c}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile / tablet */}
      <ul className="border-b border-line lg:hidden">
        {services.map((sv, i) => {
          const open = i === active;
          return (
            <li key={sv.slug} className="border-t border-line">
              <button type="button" aria-expanded={open} onClick={() => setActive(open ? -1 : i)} className="flex w-full items-center gap-4 py-5 text-left">
                <span className="font-mono text-[11px] text-muted">{sv.index}</span>
                <span className="flex-1 font-display text-[22px] font-medium tracking-tight sm:text-[26px]">{sv.title}</span>
                <Plus className={cn('h-5 w-5 text-muted transition-transform duration-300', open && 'rotate-45')} aria-hidden />
              </button>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                    <div className="pb-8">
                      <div className="rounded-2xl bg-paper-off p-4 pb-6 ring-1 ring-line sm:p-6">
                        <div className={cn('mx-auto', sv.mock === 'mobile' ? 'w-[62%] sm:w-[42%]' : 'w-full')}><Mock kind={sv.mock} /></div>
                      </div>
                      <p className="mt-5 text-[15px] leading-relaxed text-ink">{sv.summary}</p>
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {sv.capabilities.slice(0, 4).map((c) => <li key={c} className="rounded-full px-3 py-1 text-[12.5px] text-muted ring-1 ring-line">{c}</li>)}
                      </ul>
                      <ArrowLink to={`/services/${sv.slug}`} className="mt-5">Learn more</ArrowLink>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </>
  );
}
