import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '@/utils/cn';

/**
 * Renders children on a fixed-size canvas and scales it to the container's
 * width, so interface mockups keep exact proportions from 1440px to 360px.
 */
export function ScaledCanvas({ width, height, children, className }: { width: number; height: number; children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / width);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);

  return (
    <div ref={ref} className={cn('relative w-full', className)} style={{ height: height * scale }}>
      <div className="absolute left-0 top-0 origin-top-left" style={{ width, height, transform: `scale(${scale})` }}>
        {children}
      </div>
    </div>
  );
}

export function BrowserFrame({ url, children, dark }: { url: string; children: ReactNode; dark?: boolean }) {
  return (
    <div className={cn('flex h-full w-full flex-col overflow-hidden rounded-[14px] shadow-frame', dark ? 'bg-ink-800' : 'bg-white')}>
      <div className={cn('flex h-10 shrink-0 items-center gap-2 border-b px-4', dark ? 'border-white/10 bg-ink-900' : 'border-line bg-paper-off')}>
        <span className="h-2.5 w-2.5 rounded-full bg-[#E5E7EB]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#E5E7EB]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#E5E7EB]" />
        <div className={cn('mx-auto flex h-6 w-[46%] items-center justify-center rounded-md font-mono text-[11px]', dark ? 'bg-white/5 text-white/40' : 'bg-white text-muted ring-1 ring-line')}>
          {url}
        </div>
        <span className="w-[42px]" />
      </div>
      <div className="relative min-h-0 flex-1">{children}</div>
    </div>
  );
}

export function PhoneFrame({ children, dark }: { children: ReactNode; dark?: boolean }) {
  return (
    <div className="h-full w-full rounded-[44px] bg-ink p-[9px] shadow-frame">
      <div className={cn('relative h-full w-full overflow-hidden rounded-[36px]', dark ? 'bg-[#0E1012]' : 'bg-white')}>
        <div className="absolute left-1/2 top-2.5 z-20 h-[22px] w-[86px] -translate-x-1/2 rounded-full bg-ink" />
        <div className={cn('flex h-11 items-end justify-between px-7 pb-1 font-mono text-[11px] font-medium', dark ? 'text-white' : 'text-ink')}>
          <span>9:41</span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-3 rounded-[2px] bg-current opacity-80" />
            <span className="h-2.5 w-5 rounded-[3px] ring-1 ring-current" />
          </span>
        </div>
        <div className="relative h-[calc(100%-44px)]">{children}</div>
      </div>
    </div>
  );
}
