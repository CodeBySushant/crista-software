import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';
import { Reveal } from '@/components/Motion/Reveal';

type Props = {
  title: ReactNode;
  intro?: ReactNode;
  align?: 'left' | 'split';
  dark?: boolean;
  className?: string;
  action?: ReactNode;
};

/** Section header: large headline, optional intro.
 *  `split` puts the intro in a right-hand column on desktop. */
export function SectionHeading({ title, intro, align = 'left', dark, className, action }: Props) {
  return (
    <Reveal className={cn(align === 'split' ? 'grid gap-6 lg:grid-cols-12 lg:items-end' : 'max-w-3xl', className)}>
      <div className={align === 'split' ? 'lg:col-span-7' : ''}>
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
