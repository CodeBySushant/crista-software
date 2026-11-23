import { Check } from 'lucide-react';
import type { Product } from '@/data/types';
import { Mock } from '@/components/Mock/Mock';
import { Button } from '@/components/Buttons/Button';
import { DraftTag } from '@/components/Notice/DraftNotice';
import { ProductGlyph } from './ProductGlyph';
import { cn } from '@/utils/cn';

export function StatusPill({ status, dark }: { status: Product['status']; dark?: boolean }) {
  const live = status === 'Live' || status === 'Beta';
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.1em]', dark ? 'bg-white/10 text-white/75' : 'bg-surface text-ink/70 ring-1 ring-line')}>
      <span className={cn('h-1.5 w-1.5 rounded-full', live ? 'bg-brand-green' : status === 'Demonstration' ? 'bg-amber-400' : 'bg-brand-cyan')} />
      {status}
    </span>
  );
}

/** A product presented as a compact landing page: identity, promise,
 *  scope and a framed interface, on a surface tinted by the product accent. */
export function ProductShowcase({ product, flip }: { product: Product; flip?: boolean }) {
  const p = product;
  return (
    <article className="relative overflow-hidden rounded-[26px] bg-paper-off ring-1 ring-line" aria-labelledby={`prod-${p.slug}`}>
      <div className="grid lg:grid-cols-12">
        <div className={cn('flex flex-col p-7 sm:p-10 lg:col-span-5 lg:p-12', flip && 'lg:order-2')}>
          <div className="flex flex-wrap items-center gap-3">
            <ProductGlyph product={p} size="lg" />
            <div>
              <h3 id={`prod-${p.slug}`} className="font-display text-[22px] font-medium tracking-tight text-ink">{p.name}</h3>
              <p className="eyebrow mt-0.5">{p.category}</p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <StatusPill status={p.status} />
            {p.draft && <DraftTag>{p.status === 'Demonstration' ? 'Demo entry' : 'Draft listing'}</DraftTag>}
          </div>
          <p className="mt-6 font-display text-[26px] font-medium leading-[1.15] tracking-tighter2 text-ink sm:text-[30px]">{p.tagline}</p>
          <p className="mt-4 text-[15px] leading-relaxed text-muted">{p.description}</p>
          <div className="mt-6 rounded-xl bg-surface p-4 ring-1 ring-line">
            <p className="eyebrow">Main use case</p>
            <p className="mt-1.5 text-[14px] text-ink">{p.useCase}</p>
          </div>
          <div className="mt-8 lg:mt-auto lg:pt-8">
            <Button to={`/products/${p.slug}`} arrow>Explore Product</Button>
          </div>
        </div>

        <div className={cn('relative overflow-hidden px-5 pb-10 pt-6 sm:px-10 lg:col-span-7 lg:py-14 lg:pl-4 lg:pr-0', flip && 'lg:order-1 lg:pl-0 lg:pr-4')}>
          <div className="absolute inset-0 opacity-[0.14]" style={{ background: `linear-gradient(140deg, ${p.accent.from}, ${p.accent.to})` }} aria-hidden />
          <div className="grid-paper absolute inset-0 opacity-60" aria-hidden />
          <div className={cn('relative', flip ? 'lg:-ml-16' : 'lg:-mr-16')}>
            <Mock kind={p.mock} labelSide={flip ? 'right' : 'left'} />
          </div>
          <ul className="relative mt-8 grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:pr-12">
            <li className="eyebrow sm:col-span-2">{p.featuresLabel}</li>
            {p.features.slice(0, 4).map((f) => (
              <li key={f.title + f.description} className="flex items-center gap-2 text-[13.5px] text-ink"><Check className="h-3.5 w-3.5 shrink-0 text-brand-emerald" aria-hidden />{f.title}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
