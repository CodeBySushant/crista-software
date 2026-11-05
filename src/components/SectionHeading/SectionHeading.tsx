import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';
import { Reveal } from '@/components/Motion/Reveal';

type Props = {
  eyebrow?: string;
  index?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: 'left' | 'split';
  dark?: boolean;
  className?: string;
  action?: ReactNode;
};

/** Editorial section header: mono eyebrow, large headline, optional intro.
 *  `split` puts the intro in a right-hand column on desktop. */
export function SectionHeading({ eyebrow, index, title, intro, align = 'left', dark, className, action }: Props) {
  return (
    <Reveal className={cn(align === 'split' ? 'grid gap-6 lg:grid-cols-12 lg:items-end' : 'max-w-3xl', className)}>
      <div className={align === 'split' ? 'lg:col-span-7' : ''}>
        {(eyebrow || index) && (
          <p className={cn('eyebrow mb-5 flex items-center gap-3', dark && 'text-white/50')}>
            {index && <span className={dark ? 'text-white/80' : 'text-ink'}>{index}</span>}
            {index && eyebrow && <span className={cn('h-px w-6', dark ? 'bg-white/25' : 'bg-line')} />}
            {eyebrow}
          </p>
        )}
        <h2 className={cn('h-section text-balance', dark && 'text-white')}>{title}</h2>
      </div>
      {(intro || action) && (
        <div className={cn(align === 'split' ? 'lg:col-span-5 lg:pb-2' : 'mt-6')}>
          {intro && <p className={cn('lede max-w-prose2', dark && 'text-white/60')}>{intro}</p>}
          {action && <div className="mt-6">{action}</div>}
        </div>
      )}
    </Reveal>
  );
}
