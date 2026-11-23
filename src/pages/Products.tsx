import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { PageHero } from '@/components/Sections/PageHero';
import { ProductShowcase } from '@/components/ProductCard/ProductShowcase';
import { DraftNotice } from '@/components/Notice/DraftNotice';
import { CTASection } from '@/components/CTA/CTASection';
import { Reveal } from '@/components/Motion/Reveal';
import { products, productCategories } from '@/data/products';
import { cn } from '@/utils/cn';

export default function Products() {
  useDocumentMeta('Products', 'Software products developed by Crista to solve practical problems and simplify everyday workflows.');
  const [cat, setCat] = useState<string>('All');
  const list = useMemo(() => (cat === 'All' ? products : products.filter((p) => p.category === cat)), [cat]);
  const filters = ['All', ...productCategories];

  return (
    <>
      <PageHero
        title="Software Products Built to Make Work Better."
        description="Explore digital products developed by Crista to solve practical problems and simplify everyday workflows."
      />

      <section id="catalogue" className="container scroll-mt-24 pb-24" aria-labelledby="cat-h">
        <h2 id="cat-h" className="sr-only">Product catalogue</h2>
        <DraftNotice className="mb-10">
          The product catalogue is being finalised. <strong>Mobility Intelligence</strong> is an internal product in research; <strong>Codename Ledger</strong> and <strong>Codename Campus</strong> are demonstration entries that only show how products will be presented.
        </DraftNotice>

        <Reveal className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={cat === f}
                onClick={() => setCat(f)}
                className={cn('relative rounded-full px-4 py-2 text-[13.5px] transition-colors', cat === f ? 'text-white' : 'text-muted ring-1 ring-inset ring-line hover:text-ink')}
              >
                {cat === f && <motion.span layoutId="prod-filter" className="absolute inset-0 rounded-full bg-inverse" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                <span className="relative">{f}</span>
              </button>
            ))}
          </div>
          <p className="font-mono text-[12px] text-muted" aria-live="polite">{list.length} {list.length === 1 ? 'product' : 'products'}</p>
        </Reveal>

        <motion.div layout className="space-y-6">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <motion.div key={p.slug} layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.4 }}>
                <ProductShowcase product={p} flip={i % 2 === 1} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <section className="border-t border-line bg-paper-off py-20 lg:py-28">
        <div className="container grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <h2 className="mt-4 h-sub">Same team. Same standards. Our own roadmap.</h2>
          </Reveal>
          <div className="grid gap-8 sm:grid-cols-3 lg:col-span-7">
            {[['Problem first', 'Each product starts from a problem we’ve seen repeatedly in client work.'], ['Honest status', 'Research, development, beta or live — always labelled clearly.'], ['Built to last', 'The architecture and engineering practices we use for clients.']].map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.06} className="border-t border-ink pt-5">
                <h3 className="font-display text-[19px] font-medium">{t}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection title="Interested in a Crista product?" body="Ask about early access, a demo or a partnership — we’ll tell you exactly where the product stands." primary={['Product Enquiry', '/contact?topic=product']} secondary={['Explore Services', '/services']} />
    </>
  );
}
