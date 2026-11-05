import { motion, useReducedMotion } from 'framer-motion';
import { processSteps } from '@/data/navigation';
import { SectionHeading } from '@/components/SectionHeading/SectionHeading';

/** Dark process band. Horizontal rail on desktop with a gradient that
 *  draws across as it scrolls into view; vertical rail on mobile. */
export function ProcessTimeline({ index = '04' }: { index?: string }) {
  const reduce = useReducedMotion();
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-white lg:py-32" aria-labelledby="process-h">
      <div className="grid-paper-dark absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)]" aria-hidden />
      <div className="container relative">
        <SectionHeading
          dark
          index={index}
          eyebrow="How we work"
          title={<span id="process-h">From First Conversation to Final Deployment.</span>}
          intro="A clear, staged process — so you always know what is happening, what comes next and what it depends on."
          align="split"
          className="mb-16 lg:mb-24"
        />

        <ol className="relative grid gap-0 lg:grid-cols-6 lg:gap-6">
          {/* Desktop rail */}
          <div className="absolute left-0 right-0 top-[7px] hidden h-px bg-white/10 lg:block" aria-hidden>
            <motion.div
              className="h-px origin-left bg-brand-gradient"
              initial={reduce ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-120px' }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          {/* Mobile rail */}
          <div className="absolute bottom-2 left-[7px] top-2 w-px bg-white/10 lg:hidden" aria-hidden />

          {processSteps.map((s, i) => (
            <motion.li
              key={s.n}
              className="relative pb-10 pl-10 lg:pb-0 lg:pl-0"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: reduce ? 0 : 0.15 + i * 0.12 }}
            >
              <span className="absolute left-0 top-0 grid h-[15px] w-[15px] place-items-center rounded-full bg-ink ring-1 ring-white/30 lg:static" aria-hidden>
                <span className={i === processSteps.length - 1 ? 'h-[7px] w-[7px] rounded-full bg-brand-gradient' : 'h-[5px] w-[5px] rounded-full bg-white/80'} />
              </span>
              <p className="font-mono text-[12px] text-white/40 lg:mt-8">{s.n}</p>
              <h3 className="mt-2 font-display text-[24px] font-medium tracking-tight lg:text-[26px]">{s.title}</h3>
              <p className="mt-3 max-w-xs text-[14.5px] leading-relaxed text-white/55">{s.body}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
