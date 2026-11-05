import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { serviceMenuGroups } from '@/data/services';
import { products } from '@/data/products';
import { Mock } from '@/components/Mock/Mock';
import { DraftTag } from '@/components/Notice/DraftNotice';
import { ProductGlyph } from '@/components/ProductCard/ProductGlyph';

export function ServicesMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-9 grid grid-cols-3 gap-8">
        {serviceMenuGroups.map((g) => (
          <div key={g.label}>
            <p className="eyebrow mb-4">{g.label}</p>
            <ul className="space-y-1">
              {g.items.map((it) => (
                <li key={it.label}>
                  <Link to={it.to} onClick={onNavigate} className="group -mx-3 block rounded-lg px-3 py-2.5 transition-colors hover:bg-paper-off focus-visible:bg-paper-off">
                    <span className="flex items-center gap-1.5 text-[14px] font-medium text-ink">
                      {it.label}
                      <ArrowRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" aria-hidden />
                    </span>
                    <span className="mt-0.5 block text-[13px] text-muted">{it.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <Link to="/services" onClick={onNavigate} className="group col-span-3 flex flex-col overflow-hidden rounded-xl bg-paper-off p-5 ring-1 ring-line transition hover:ring-ink/20">
        <div className="pointer-events-none -mx-1 mb-5">
          <Mock kind="web" label={false} />
        </div>
        <p className="font-display text-[17px] font-medium tracking-tight text-ink">All services</p>
        <p className="mt-1 text-[13px] text-muted">From first idea to production platform.</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-ink">
          Explore services <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </span>
      </Link>
    </div>
  );
}

export function ProductsMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-8">
        <div className="mb-4 flex items-center gap-3">
          <p className="eyebrow">Crista products</p>
          <DraftTag>Catalogue in preparation</DraftTag>
        </div>
        <ul className="grid grid-cols-1 gap-2">
          {products.map((p) => (
            <li key={p.slug}>
              <Link to={`/products/${p.slug}`} onClick={onNavigate} className="group -mx-3 flex items-center gap-4 rounded-xl px-3 py-3 transition-colors hover:bg-paper-off">
                <ProductGlyph product={p} />
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-2 text-[14px] font-medium text-ink">
                    {p.name}
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted">{p.status}</span>
                  </p>
                  <p className="truncate text-[13px] text-muted">{p.tagline}</p>
                </div>
                <span className="hidden items-center gap-1 text-[13px] font-medium text-ink opacity-0 transition-opacity group-hover:opacity-100 sm:inline-flex">
                  View product <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="col-span-4 flex flex-col justify-between rounded-xl bg-ink p-6 text-white">
        <div>
          <p className="eyebrow text-white/45">Building for the future</p>
          <p className="mt-3 font-display text-[22px] font-medium leading-snug tracking-tight">
            Alongside client work, Crista builds its own software products.
          </p>
        </div>
        <Link to="/products" onClick={onNavigate} className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-medium text-white">
          View all products <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
