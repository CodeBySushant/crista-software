import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { getService, services } from '@/data/services';
import { getProject } from '@/data/projects';
import { PageHero } from '@/components/Sections/PageHero';
import { Button } from '@/components/Buttons/Button';
import { Mock } from '@/components/Mock/Mock';
import { Reveal } from '@/components/Motion/Reveal';
import { ServiceDeepDive } from '@/components/ServiceCard/ServiceDeepDive';
import { ProjectCard } from '@/components/ProjectCard/ProjectCard';
import { CTASection } from '@/components/CTA/CTASection';
import NotFound from './NotFound';
import { cn } from '@/utils/cn';

export default function ServiceDetails() {
  const { slug } = useParams();
  const s = getService(slug);
  useDocumentMeta(s?.seo.title ?? 'Service not found', s?.seo.description ?? '');
  if (!s) return <NotFound />;

  const idx = services.findIndex((x) => x.slug === s.slug);
  const next = services[(idx + 1) % services.length];
  const related = s.relatedWork.map(getProject).filter((p): p is NonNullable<typeof p> => !!p);
  const dark = s.slug === 'cloud-devops';
  const phone = s.mock === 'mobile';

  return (
    <>
      <PageHero
        dark={dark}
        eyebrow={
          <span className="flex items-center gap-3">
            <Link to="/services" className={cn('inline-flex items-center gap-1 hover:text-ink', dark && 'hover:text-white')}><ArrowLeft className="h-3 w-3" aria-hidden />Services</Link>
            <span className={cn('h-px w-6', dark ? 'bg-white/20' : 'bg-line')} />
            <span className={dark ? 'text-white' : 'text-ink'}>{s.index}</span> {s.title}
          </span>
        }
        title={s.headline}
        description={s.summary}
        aside={phone ? <div className="mx-auto w-[60%] max-w-[260px] lg:w-[70%]"><Mock kind={s.mock} /></div> : undefined}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button to={`/contact?service=${encodeURIComponent(s.title)}`} variant="gradient" size="lg" arrow>Start a {s.shortTitle} project</Button>
          <Button href="#solutions" variant={dark ? 'ghost-dark' : 'secondary'} size="lg">What we deliver</Button>
        </div>
      </PageHero>

      {!phone && (
        <div className={cn('relative', dark ? 'bg-ink' : '')}>
          <div className="container -mt-4 pb-6">
            <Reveal className="mx-auto max-w-5xl"><Mock kind={s.mock} /></Reveal>
          </div>
        </div>
      )}

      {/* Problems */}
      <section className="container py-20 lg:py-28" aria-labelledby="problems-h">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow">The problem</p>
            <h2 id="problems-h" className="mt-4 h-sub">Signs you need {s.title.toLowerCase()}.</h2>
          </Reveal>
          <ol className="grid gap-px overflow-hidden rounded-2xl bg-line ring-1 ring-line sm:grid-cols-2 lg:col-span-8">
            {s.problems.map((p, i) => (
              <Reveal key={p} delay={i * 0.05} className="bg-white p-6 sm:p-8">
                <li className="list-none">
                  <span className="font-mono text-[11px] text-muted">{String(i + 1).padStart(2, '0')}</span>
                  <p className="mt-6 text-[17px] leading-snug text-ink">{p}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Solutions */}
      <section id="solutions" className="container scroll-mt-24 pb-20 lg:pb-28" aria-labelledby="solutions-h">
        <Reveal className="mb-10 flex items-end justify-between gap-6 border-b border-ink pb-6">
          <h2 id="solutions-h" className="h-sub">What we deliver</h2>
          <p className="hidden font-mono text-[12px] text-muted sm:block">{s.solutions.length} solution areas</p>
        </Reveal>
        <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
          {s.solutions.map((x, i) => (
            <Reveal key={x.title} delay={(i % 2) * 0.06} className="grid grid-cols-[2.5rem_1fr]">
              <span className="font-mono text-[12px] text-muted">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="font-display text-[24px] font-medium tracking-tight">{x.title}</h3>
                <p className="mt-2 text-[15.5px] leading-relaxed text-muted">{x.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-14 flex flex-wrap gap-2">
          {s.capabilities.map((c) => <span key={c} className="rounded-full bg-paper-off px-3.5 py-1.5 text-[13px] text-ink ring-1 ring-line">{c}</span>)}
        </Reveal>
      </section>

      <ServiceDeepDive service={s} />

      {/* Approach + technology */}
      <section className="container py-20 lg:py-28" aria-labelledby="approach-h">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal><p className="eyebrow">Development approach</p><h2 id="approach-h" className="mt-4 h-sub">How we run {s.shortTitle.toLowerCase()} projects.</h2></Reveal>
            <ol className="mt-10 border-t border-line">
              {s.approach.map((a, i) => (
                <Reveal key={a.title} delay={i * 0.05}>
                  <li className="grid grid-cols-[3rem_1fr] gap-4 border-b border-line py-6 sm:grid-cols-[3rem_14rem_1fr]">
                    <span className="font-mono text-[12px] text-muted">{String(i + 1).padStart(2, '0')}</span>
                    <span className="font-display text-[19px] font-medium tracking-tight">{a.title}</span>
                    <span className="col-start-2 text-[15px] text-muted sm:col-start-3">{a.description}</span>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
          <Reveal className="lg:col-span-4 lg:col-start-9">
            <div className="rounded-2xl bg-ink p-7 text-white lg:sticky lg:top-28">
              <p className="eyebrow text-white/45">Relevant technologies</p>
              <ul className="mt-5 space-y-2.5">
                {s.technologies.map((t) => <li key={t} className="flex items-center justify-between border-b border-white/10 pb-2.5 font-display text-[17px] last:border-0">{t}<span className="h-1.5 w-1.5 rounded-full bg-brand-emerald" aria-hidden /></li>)}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-line bg-paper-off py-20 lg:py-28" aria-labelledby="related-h">
          <div className="container">
            <Reveal className="mb-12 flex items-end justify-between gap-6">
              <h2 id="related-h" className="h-sub">Related work</h2>
              <Link to="/work" className="inline-flex items-center gap-1 text-[14px] font-medium">All work <ArrowRight className="h-4 w-4" aria-hidden /></Link>
            </Reveal>
            <div className="grid gap-12 md:grid-cols-2">
              {related.slice(0, 2).map((p) => <Reveal key={p.slug}><ProjectCard project={p} /></Reveal>)}
            </div>
          </div>
        </section>
      )}

      <CTASection title={`Ready to talk about ${s.shortTitle.toLowerCase()}?`} body="Tell us what you’re trying to achieve. We’ll come back with questions, an approach and an honest view of effort." primary={['Start a Project', `/contact?service=${encodeURIComponent(s.title)}`]} secondary={['All Services', '/services']} />

      <nav className="container pb-20" aria-label="Next service">
        <Link to={`/services/${next.slug}`} className="group flex items-center justify-between border-t border-line pt-8">
          <span><span className="eyebrow">Next service</span><span className="mt-2 block font-display text-[28px] font-medium tracking-tight sm:text-[40px]">{next.title}</span></span>
          <ArrowRight className="h-7 w-7 transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden />
        </Link>
      </nav>
    </>
  );
}
