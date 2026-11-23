import { technologyGroups } from '@/data/navigation';
import { SectionHeading } from '@/components/SectionHeading/SectionHeading';
import { Reveal } from '@/components/Motion/Reveal';

/** Technology as typography — a quiet index instead of a logo wall. */
export function TechStack({ index = 'stack', compact = false }: { index?: string; compact?: boolean }) {
  return (
    <section className={compact ? 'py-20' : 'container py-24 lg:py-32'} aria-labelledby={`tech-h-${index}`}>
      <SectionHeading
        title={<span id={`tech-h-${index}`}>Built on the Right Technology.</span>}
        intro="Proven, well-supported tools chosen for the problem — not for the trend. Six layers, one coherent stack."
        align="split"
        className="mb-12 lg:mb-16"
      />
      <div className="border-t border-ink">
        {technologyGroups.map((g, i) => (
          <Reveal key={g.label} delay={i * 0.04}>
            <div className="group grid gap-3 border-b border-line py-6 sm:grid-cols-12 sm:items-baseline sm:gap-6 sm:py-7">
              <div className="flex items-baseline gap-4 sm:col-span-3">
                <span className="text-[15px] font-medium text-muted">{g.label}</span>
              </div>
              <ul className="flex flex-wrap items-baseline gap-x-2 gap-y-1 sm:col-span-9">
                {g.items.map((t, j) => (
                  <li key={t} className="flex items-baseline gap-2">
                    <span className="font-display text-[22px] font-medium tracking-tight text-ink/80 transition-colors duration-300 hover:text-ink sm:text-[30px]">{t}</span>
                    {j < g.items.length - 1 && <span className="text-[20px] text-line sm:text-[26px]" aria-hidden>/</span>}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
