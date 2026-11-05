import { Info } from 'lucide-react';
import { cn } from '@/utils/cn';

/** Visible marker for content that is not yet approved (spec §6, §8, §15). */
export function DraftTag({ children = 'Draft', className }: { children?: string; className?: string }) {
  return <span className={cn('placeholder-tag', className)}>{children}</span>;
}

export function DraftNotice({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('flex items-start gap-3 rounded-xl border border-dashed border-amber-400/70 bg-amber-50/70 px-4 py-3 text-[13px] leading-relaxed text-amber-900', className)} role="note">
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" aria-hidden />
      <div>{children}</div>
    </div>
  );
}
