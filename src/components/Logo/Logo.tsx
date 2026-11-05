import { useId } from 'react';
import { cn } from '@/utils/cn';

/**
 * PLACEHOLDER MARK. Replace the <svg> with the official Crista logo file
 * (keep the gradient and proportions). The wordmark is set in type so it
 * stays crisp at every size.
 */
export function LogoMark({ className, dark = false }: { className?: string; dark?: boolean }) {
  const id = useId();
  return (
    <svg viewBox="0 0 32 32" className={cn('h-7 w-7 shrink-0', className)} aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#22C55E" />
          <stop offset=".48" stopColor="#10B981" />
          <stop offset="1" stopColor="#06B6D4" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="8" fill={dark ? '#FFFFFF' : '#17191C'} />
      <path d="M22 7H12.5L5.5 16l7 9H22l-3.2-4.2h-4.4L10.9 16l3.5-4.8h4.4z" fill={`url(#${id})`} />
      <path d="M24.5 13.2 27.3 16l-2.8 2.8L21.7 16z" fill={`url(#${id})`} />
    </svg>
  );
}

export function Logo({ dark = false, className }: { dark?: boolean; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark dark={dark} />
      <span className={cn('font-display text-[17px] font-semibold tracking-[-0.02em]', dark ? 'text-white' : 'text-ink')}>
        Crista<span className={cn('ml-1 font-normal', dark ? 'text-white/55' : 'text-muted')}>Software</span>
      </span>
    </span>
  );
}
