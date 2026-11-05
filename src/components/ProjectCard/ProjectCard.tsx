import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/data/types';
import { Mock, isPhoneMock } from '@/components/Mock/Mock';
import { DraftTag } from '@/components/Notice/DraftNotice';
import { cn } from '@/utils/cn';

const tints: Record<string, string> = {
  rental: 'bg-[#EAF4EF]',
  cabs: 'bg-[#E9F1F3]',
  resume: 'bg-[#F1F3F2]',
  music: 'bg-[#141719]',
};

/** Editorial project tile: image-led stage, quiet metadata row underneath. */
export function ProjectCard({ project, size = 'md', index }: { project: Project; size?: 'lg' | 'md'; index?: number }) {
  const phone = isPhoneMock(project.mock);
  return (
    <Link to={`/work/${project.slug}`} className="group block" aria-label={`${project.title} — view case study`}>
      <div className={cn('relative overflow-hidden rounded-[22px] ring-1 ring-line/70', tints[project.mock] ?? 'bg-paper-off', size === 'lg' ? 'aspect-[4/3] sm:aspect-[16/10]' : 'aspect-[4/3]')}>
        {phone && size === 'lg' ? (
          <div className="absolute inset-0 flex items-start justify-center gap-[4%] px-6 pt-[14%] sm:pt-[9%]">
            {[0, 1, 2].map((i) => (
              <div key={i} className={cn('w-[26%] max-w-[250px] transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)]', i === 1 ? 'group-hover:-translate-y-2' : 'translate-y-[12%] opacity-70 group-hover:translate-y-[10%]')}>
                <Mock kind={project.mock} label={false} />
              </div>
            ))}
          </div>
        ) : (
          <div className={cn('absolute inset-0 flex justify-center px-6 sm:px-10', phone ? 'items-start pt-[12%]' : 'items-center')}>
            <div className={cn('transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-1.5 group-hover:scale-[1.015]', phone ? 'w-[42%] max-w-[240px]' : 'w-[94%] translate-y-[8%]')}>
              <Mock kind={project.mock} label={false} />
            </div>
          </div>
        )}
        <div className="absolute left-4 top-4 flex items-center gap-2 sm:left-5 sm:top-5">
          <span className={cn('rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] backdrop-blur', project.mock === 'music' ? 'bg-white/10 text-white/80' : 'bg-white/80 text-muted')}>Interface demo</span>
          {project.draft && <DraftTag>Draft</DraftTag>}
        </div>
        <span className="absolute right-4 top-4 grid h-10 w-10 translate-y-1 place-items-center rounded-full bg-ink text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:right-5 sm:top-5">
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </span>
      </div>
      <div className={cn('mt-5 flex flex-col gap-3', size === 'lg' && 'sm:flex-row sm:items-start sm:justify-between sm:gap-8')}>
        <div className="min-w-0">
          <div className="flex items-baseline gap-3">
            {index !== undefined && <span className="font-mono text-[11px] text-muted">{String(index + 1).padStart(2, '0')}</span>}
            <h3 className="font-display text-[24px] font-medium tracking-tight text-ink sm:text-[26px]">{project.title}</h3>
          </div>
          <p className="mt-1.5 max-w-md text-[14.5px] leading-relaxed text-muted">{project.summary}</p>
        </div>
        <div className={cn('shrink-0', size === 'lg' ? 'sm:text-right' : 'flex flex-wrap items-baseline gap-x-4 gap-y-1 border-t border-line pt-3')}>
          <p className="eyebrow">{project.category}</p>
          <p className={cn('font-mono text-[11.5px] text-ink/70', size === 'lg' && 'mt-2')}>{project.stack.join(' · ')}</p>
          <span className={cn('inline-flex items-center gap-1 text-[13px] font-medium text-ink', size === 'lg' ? 'mt-3' : 'ml-auto')}>View Case Study <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden /></span>
        </div>
      </div>
    </Link>
  );
}
