import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import { hiringSteps } from '@/data/careers';
import { stepIcons } from './icons';

/** Vertical step line. Hover or focus a step to read about it. */
export function HiringProcess() {
  const [active, setActive] = useState(0);

  return (
    <div className="relative">
      {/* soft glows behind the steps */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute left-[18%] top-[8%] h-[420px] w-[420px] rounded-full bg-zinc-400/[0.07] blur-[110px]" />
        <div className="absolute right-[14%] top-[34%] h-[380px] w-[380px] rounded-full bg-white/[0.06] blur-[120px]" />
      </div>

      {/* Desktop: line in the middle, titles left, detail card right */}
      <ol className="relative mx-auto hidden max-w-[880px] md:block">
        {hiringSteps.map((s, i) => {
          const Icon = stepIcons[s.icon];
          const on = i === active;
          return (
            <li key={s.title} className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-8 py-7">
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className={cn('justify-self-end text-right text-[17px] font-semibold transition-colors', on ? 'text-white' : 'text-zinc-500 hover:text-zinc-300')}
              >
                {s.title}
              </button>

              <span className="relative z-10 grid h-14 w-14 place-items-center" aria-hidden>
                <span
                  className={cn(
                    'grid h-14 w-14 place-items-center rounded-full ring-1 transition-all duration-300',
                    on ? 'bg-zinc-200/15 text-white ring-white/40' : 'bg-black text-zinc-500 ring-white/10',
                  )}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
              </span>

              <div className="relative self-stretch">
                <AnimatePresence>
                  {on && (
                    <motion.p
                      initial={{ opacity: 0, x: -8, y: '-50%' }}
                      animate={{ opacity: 1, x: 0, y: '-50%' }}
                      exit={{ opacity: 0, y: '-50%' }}
                      transition={{ duration: 0.25 }}
                      className="absolute left-0 top-1/2 z-10 w-[360px] max-w-[42vw] rounded-2xl bg-[#141416]/90 p-6 text-[15.5px] leading-relaxed text-zinc-300 ring-1 ring-white/[0.06] backdrop-blur"
                    >
                      {s.body}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* dotted connector to the next step */}
              {i < hiringSteps.length - 1 && (
                <span className="absolute left-1/2 top-[calc(50%+30px)] h-[calc(100%-60px)] -translate-x-1/2 border-l border-dashed border-white/15" aria-hidden />
              )}
            </li>
          );
        })}
      </ol>

      {/* Mobile: simple list with every description visible */}
      <ol className="space-y-6 md:hidden">
        {hiringSteps.map((s) => {
          const Icon = stepIcons[s.icon];
          return (
            <li key={s.title} className="flex gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-white ring-1 ring-white/15" aria-hidden>
                <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
              </span>
              <div>
                <p className="text-[16px] font-semibold text-white">{s.title}</p>
                <p className="mt-1.5 text-[15px] leading-relaxed text-zinc-400">{s.body}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
