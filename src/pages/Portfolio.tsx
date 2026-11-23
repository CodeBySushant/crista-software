import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { PageHero } from '@/components/Sections/PageHero';
import { ProjectCard } from '@/components/ProjectCard/ProjectCard';
import { DraftNotice } from '@/components/Notice/DraftNotice';
import { CTASection } from '@/components/CTA/CTASection';
import { projects, projectCategories } from '@/data/projects';
import { cn } from '@/utils/cn';

export default function Portfolio() {
  useDocumentMeta('Work', 'Selected software projects by Crista Software — web applications, mobile apps, AI-powered tools and custom business systems.');
  const [cat, setCat] = useState<string>('All');
  const list = useMemo(() => (cat === 'All' ? projects : projects.filter((p) => p.category === cat)), [cat]);
  const count = (c: string) => (c === 'All' ? projects.length : projects.filter((p) => p.category === c).length);

  return (
    <>
      <PageHero eyebrow="Work" title="Software We’ve Built, and How We Built It." description="Business systems, mobile apps and AI-assisted tools — each one documented with the problem, the approach and the architecture behind it." />

      <section className="container pb-24" aria-labelledby="work-list-h">
        <h2 id="work-list-h" className="sr-only">Projects</h2>
        <DraftNotice className="mb-10">All entries are drafts pending approval. Visuals are labelled interface demonstrations, not screenshots of client systems, and no outcomes are claimed until verified.</DraftNotice>

        <div className="sticky top-16 z-20 mb-12 border-b border-line bg-black/70 py-3 backdrop-blur-xl">
          <div className="flex gap-1 overflow-x-auto [scrollbar-width:none]" role="group" aria-label="Filter by category">
            {['All', ...projectCategories].map((c) => {
              const n = count(c);
              return (
                <button
                  key={c}
                  type="button"
                  aria-pressed={cat === c}
                  disabled={n === 0}
                  onClick={() => setCat(c)}
                  className={cn('relative shrink-0 rounded-full px-4 py-2 text-[13.5px] transition-colors disabled:cursor-not-allowed disabled:opacity-40', cat === c ? 'text-white' : 'text-muted hover:text-ink')}
                >
                  {cat === c && <motion.span layoutId="work-filter" className="absolute inset-0 rounded-full bg-inverse" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                  <span className="relative">{c} <span className="font-mono text-[10.5px] opacity-60">{n}</span></span>
                </button>
              );
            })}
          </div>
        </div>

        <motion.div layout className="grid gap-x-8 gap-y-16 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className={cn(i % 4 === 0 && list.length > 1 && 'md:col-span-2', i % 4 === 2 && 'md:mt-24')}
              >
                <ProjectCard project={p} size={i % 4 === 0 && list.length > 1 ? 'lg' : 'md'} index={projects.indexOf(p)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <CTASection title="Your project could be next." body="Share what you’re building — we’ll show you how we’d approach it." />
    </>
  );
}
