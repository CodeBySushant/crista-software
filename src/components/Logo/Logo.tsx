import { useId } from 'react';
import { cn } from '@/utils/cn';

/** Crista "C" mark (silver). Used for the favicon and large brand moments. */
export function LogoMark({ className }: { className?: string; dark?: boolean }) {
  const id = useId();
  return (
    <svg viewBox="0 0 444 488" className={cn('h-7 w-auto shrink-0', className)} aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FAFAFA" />
          <stop offset=".5" stopColor="#D4D4D8" />
          <stop offset="1" stopColor="#A1A1AA" />
        </linearGradient>
      </defs>
      <path fill={`url(#${id})`} fillRule="evenodd" d="M213.8 487L163 486.5L154.8 478.5L146.5 470.5L122 446.4L97.5 422.4L48.8 374.6L0 326.8L-0 243.6L-0 160.5L23.2 137.5L46.5 114.5L104.3 58L162.1 1.5L164.2 0.7L166.2 -0L304.9 0.2L443.5 0.5L407.5 36L371.5 71.4L342.3 100.2L313.1 129L222.6 129L132 129L132 243.5L132 358L221.8 358L311.5 358.1L376.3 422.3L441.1 486.5L441 487.3L441 488L352.8 487.8L264.5 487.5L213.8 487ZM347.1 276.2L314.8 244.5L347.4 212L380 179.5L412.2 211.8L444.5 244L412.5 276L380.5 308L379.9 308L379.4 308L347.1 276.2Z" />
    </svg>
  );
}

/** Crista wordmark. White on the black theme; `light` gives the black version. */
export function Logo({ light = false, className }: { light?: boolean; dark?: boolean; className?: string }) {
  return (
    <img
      src={light ? '/brand/crista-logo-black.svg' : '/brand/crista-logo-white.svg'}
      alt="Crista"
      width={1489}
      height={406}
      className={cn('h-[22px] w-auto select-none', className)}
      draggable={false}
    />
  );
}
