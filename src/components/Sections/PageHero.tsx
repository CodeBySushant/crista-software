import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { RevealText } from '@/components/Motion/Reveal';
import { cn } from '@/utils/cn';

type Props = {
  back?: ReactNode; // optional small back link above the title
  title: string;
  description?: ReactNode;
  children?: ReactNode; // actions / meta under the description
  aside?: ReactNode; // right column on desktop
  dark?: boolean;
};

/** Shared inner-page hero: grid-paper ground, editorial headline. */
export function PageHero({ back, title, description, children, aside, dark }: Props) {
  const reduce = useReducedMotion();
  return (
    <section className={cn('relative -mt-16 overflow-hidden pt-16', dark && 'bg-inverse text-white')}>
      <div className={cn('fade-mask-b pointer-events-none absolute inset-x-0 top-0 h-[560px]', dark ? 'grid-paper-dark' : 'grid-paper opacity-70')} aria-hidden />
      <div className="container relative pb-16 pt-14 sm:pt-20 lg:pb-24 lg:pt-24">
        <div className={cn('grid gap-12', !!aside && 'lg:grid-cols-12 lg:items-end')}>
          <div className={aside ? 'lg:col-span-7' : ''}>
            {back && (
              <motion.div initial={reduce ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mb-6 text-[14px] text-muted">
                {back}
              </motion.div>
            )}
            <RevealText text={title} className={cn('h-display max-w-[17ch] text-balance', dark ? 'text-white' : 'text-ink')} />
            {description && (
              <motion.p
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.6 }}
                className={cn('mt-8 max-w-2xl text-[17px] leading-relaxed sm:text-[19px]', dark ? 'text-white/60' : 'text-muted')}
              >
                {description}
              </motion.p>
            )}
            {children && (
              <motion.div initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-10">
                {children}
              </motion.div>
            )}
          </div>
          {aside && (
            <motion.div
              className="lg:col-span-5"
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {aside}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
