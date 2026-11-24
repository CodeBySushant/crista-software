import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { getProduct, products } from '@/data/products';
import { Button } from '@/components/Buttons/Button';
import { Mock } from '@/components/Mock/Mock';
import { Reveal, RevealText } from '@/components/Motion/Reveal';
import { ProductGlyph } from '@/components/ProductCard/ProductGlyph';
import { StatusPill } from '@/components/ProductCard/ProductShowcase';
import { DraftNotice } from '@/components/Notice/DraftNotice';
import { CTASection } from '@/components/CTA/CTASection';
import NotFound from './NotFound';

export default function ProductDetails() {
  const { slug } = useParams();
  const p = getProduct(slug);
  useDocumentMeta(p?.seo.title ?? 'Product not found', p?.seo.description ?? '', { noindex: !p });
  if (!p) return <NotFound />;

  const others = products.filter((x) => x.slug !== p.slug);
  const tint = `linear-gradient(160deg, ${p.accent.from}22, ${p.accent.to}14 45%, transparent 75%)`;

  return (
    <>
      {/* Product hero — the product's own accent, inside the Crista frame */}
      <section className="relative -mt-16 overflow-hidden pt-16">
        <div className="absolute inset-0" style={{ background: tint }} aria-hidden />
        <div className="grid-paper fade-mask-b absolute inset-x-0 top-0 h-[600px] opacity-60" aria-hidden />
        <div className="container relative pb-10 pt-12 sm:pt-16">
          <Link to="/products" className="eyebrow inline-flex items-center gap-1.5 hover:text-ink"><ArrowLeft className="h-3 w-3" aria-hidden />All products</Link>
          <div className="mt-10 flex flex-col items-center text-center">
            <ProductGlyph product={p} size="lg" />
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <span className="eyebrow">{p.category}</span>
              <span className="h-px w-5 bg-line" />
              <StatusPill status={p.status} />
            </div>
            <RevealText text={p.name} className="mt-6 font-display text-[3rem] font-medium leading-[1] tracking-tightest sm:text-7xl lg:text-[6rem]" />
            <p className="mt-6 max-w-2xl font-display text-[20px] leading-snug tracking-tight text-ink/80 sm:text-[24px]">{p.tagline}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button to={`/contact?topic=product&product=${encodeURIComponent(p.name)}`} variant="gradient" size="lg" arrow>{p.status === 'Live' ? 'Request a Demo' : 'Register Interest'}</Button>
              <Button href="#overview" variant="secondary" size="lg">Product overview</Button>
            </div>
          </div>
          {p.draft && p.draftNote && <DraftNotice className="mx-auto mt-10 max-w-2xl">{p.draftNote}</DraftNotice>}
          <Reveal className="mx-auto mt-14 max-w-5xl"><Mock kind={p.mock} /></Reveal>
        </div>
      </section>

      {/* Overview */}
      <section id="overview" className="container scroll-mt-24 py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5"><h2 className="mt-4 h-sub">{p.description}</h2></Reveal>
          <Reveal delay={0.08} className="lg:col-span-6 lg:col-start-7">
            <dl className="divide-y divide-line border-y border-line">
              <Row label="Main use case" value={p.useCase} />
              <Row label="Category" value={p.category} />
              <Row label="Status" value={p.status} />
              {p.technical?.map((t) => <Row key={t.label} label={t.label} value={t.value} />)}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-line bg-paper-off py-20 lg:py-28" aria-labelledby="feat-h">
        <div className="container">
          <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <h2 id="feat-h" className="h-sub">{p.featuresLabel}</h2>
            {p.featuresLabel !== 'Key features' && <span className="placeholder-tag">Subject to change</span>}
          </Reveal>
          <div className="grid gap-px overflow-hidden rounded-2xl bg-line ring-1 ring-line sm:grid-cols-2 lg:grid-cols-4">
            {p.features.map((f, i) => (
              <Reveal key={f.title + i} delay={i * 0.05} className="bg-surface p-6 sm:p-8">
                <span className="block h-[3px] w-8 rounded-full" style={{ background: `linear-gradient(90deg, ${p.accent.from}, ${p.accent.to})` }} />
                <h3 className="mt-8 font-display text-[19px] font-medium">{f.title}</h3>
                <p className="mt-2 text-[14.5px] text-muted">{f.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="container py-20 lg:py-28" aria-labelledby="uc-h">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4"><h2 id="uc-h" className="mt-4 h-sub">Who it’s for.</h2></Reveal>
          <ul className="border-t border-line lg:col-span-8">
            {p.useCases.map((u, i) => (
              <Reveal key={u.title + i} delay={i * 0.05}>
                <li className="grid gap-2 border-b border-line py-6 sm:grid-cols-[16rem_1fr]">
                  <span className="font-display text-[20px] font-medium tracking-tight">{u.title}</span>
                  <span className="text-[15.5px] text-muted">{u.description}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* No pricing section: shown only when real pricing exists (spec §8). */}

      <CTASection
        title={p.status === 'Live' ? `See ${p.name} in action.` : `Follow ${p.name}’s progress.`}
        body={p.status === 'Live' ? 'Book a walkthrough with the team.' : 'Register interest and we’ll share updates as the product develops.'}
        primary={[p.status === 'Live' ? 'Request a Demo' : 'Register Interest', `/contact?topic=product&product=${encodeURIComponent(p.name)}`]}
        secondary={['All Products', '/products']}
      />

      <nav className="container pb-20" aria-label="Other products">
        <p className="eyebrow mb-5">Other products</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {others.map((o) => (
            <Link key={o.slug} to={`/products/${o.slug}`} className="flex items-center gap-4 rounded-2xl p-4 ring-1 ring-line transition hover:ring-ink/25">
              <ProductGlyph product={o} />
              <div><p className="font-medium">{o.name}</p><p className="text-[13px] text-muted">{o.category}</p></div>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 py-4 sm:grid-cols-[11rem_1fr]">
      <dt className="eyebrow pt-1">{label}</dt>
      <dd className="text-[15.5px] text-ink">{value}</dd>
    </div>
  );
}
