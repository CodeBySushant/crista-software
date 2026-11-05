import type { Product } from '@/data/types';
import { cn } from '@/utils/cn';

/** Small product icon built from the product's accent pair. Replace with
 *  real product logos when available. */
export function ProductGlyph({ product, size = 'md' }: { product: Product; size?: 'md' | 'lg' }) {
  return (
    <span
      className={cn(
        'relative grid shrink-0 place-items-center overflow-hidden font-display font-semibold tracking-tight text-white',
        size === 'lg' ? 'h-14 w-14 rounded-2xl text-[19px]' : 'h-10 w-10 rounded-xl text-[13px]',
      )}
      style={{ background: `linear-gradient(135deg, ${product.accent.from}, ${product.accent.to})` }}
      aria-hidden
    >
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,.35),transparent_55%)]" />
      <span className="relative">{product.monogram}</span>
    </span>
  );
}
