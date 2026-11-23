import { Link } from 'react-router-dom';
import { Check, Minus } from 'lucide-react';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { PageHero } from '@/components/Sections/PageHero';
import { Button, ArrowLink } from '@/components/Buttons/Button';
import { Mock } from '@/components/Mock/Mock';
import { Reveal } from '@/components/Motion/Reveal';
import { ProcessTimeline } from '@/components/Sections/ProcessTimeline';
import { CTASection } from '@/components/CTA/CTASection';
import { services } from '@/data/services';
import { getProject } from '@/data/projects';
import { cn } from '@/utils/cn';
import { anchorClick } from '@/utils/scroll';

export default function Services() {
  useDocumentMeta('Services', 'Web, mobile, custom software, AI & automation, UI/UX design and cloud & DevOps services from Crista Software.');
  return (
    <>
      <PageHero
        title="Software Solutions Built Around Your Business."
        description="From the first idea to a production-ready platform, we help businesses design, develop and scale digital solutions."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button to="/contact" variant="gradient" size="lg" arrow>Start a Project</Button>
          <Button href="#service-index" variant="secondary" size="lg">Browse services</Button>
        </div>
      </PageHero>

      {/* Index strip */}
      <nav id="service-index" aria-label="Service index" className="sticky top-16 z-30 border-y border-line bg-black/70 backdrop-blur-xl">
        <ul className="container flex gap-1 overflow-x-auto py-2.5 [scrollbar-width:none]">
          {services.map((s) => (
            <li key={s.slug} className="shrink-0">
              <a href={`#${s.slug}`} onClick={anchorClick(`#${s.slug}`)} className="flex items-center gap-2 rounded-full px-3.5 py-2 text-[13.5px] text-muted transition-colors hover:bg-paper-off hover:text-ink">
{s.shortTitle}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="container">
        {services.map((s, i) => {
          const flip = i % 2 === 1;
          const related = s.relatedWork.map(getProject).filter(Boolean);
          return (
            <section key={s.slug} id={s.slug} className="scroll-mt-32 border-b border-line py-20 last:border-0 lg:py-28" aria-labelledby={`${s.slug}-h`}>
              <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
                <div className={cn('lg:col-span-6', flip && 'lg:order-2')}>
                  <Reveal>
                    <h2 id={`${s.slug}-h`} className="h-sub text-balance sm:text-[40px] sm:leading-[1.1]">{s.title}</h2>
                    <p className="mt-4 text-[19px] leading-snug text-ink/90 sm:text-[21px]">{s.headline}</p>
                    <p className="lede mt-5">{s.summary}</p>
                  </Reveal>

                  <div className="mt-10 grid gap-8 sm:grid-cols-2">
                    <Reveal>
                      <p className="eyebrow mb-4">Problems it addresses</p>
                      <ul className="space-y-3">
                        {s.problems.slice(0, 3).map((p) => (
                          <li key={p} className="flex gap-3 text-[14.5px] leading-relaxed text-ink"><Minus className="mt-1 h-3.5 w-3.5 shrink-0 text-muted" aria-hidden />{p}</li>
                        ))}
                      </ul>
                    </Reveal>
                    <Reveal delay={0.06}>
                      <p className="eyebrow mb-4">Solutions offered</p>
                      <ul className="space-y-3">
                        {s.solutions.map((x) => (
                          <li key={x.title} className="flex gap-3 text-[14.5px] leading-relaxed text-ink"><Check className="mt-1 h-3.5 w-3.5 shrink-0 text-brand-emerald" aria-hidden />{x.title}</li>
                        ))}
                      </ul>
                    </Reveal>
                  </div>

                  <Reveal className="mt-10 border-t border-line pt-6">
                    <p className="eyebrow mb-3">Technologies</p>
                    <p className="font-mono text-[13px] leading-relaxed text-ink/80">{s.technologies.join('  ·  ')}</p>
                  </Reveal>

                  <Reveal className="mt-6 border-t border-line pt-6">
                    <p className="eyebrow mb-3">Development approach</p>
                    <ol className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
                      {s.approach.map((a, j) => <li key={a.title} className="text-[14px] text-ink"><span className="mr-2 font-mono text-[11px] text-muted">{j + 1}</span>{a.title}</li>)}
                    </ol>
                  </Reveal>

                  {related.length > 0 && (
                    <Reveal className="mt-6 border-t border-line pt-6">
                      <p className="eyebrow mb-3">Related work</p>
                      <div className="flex flex-wrap gap-2">
                        {related.map((p) => <Link key={p!.slug} to={`/work/${p!.slug}`} className="rounded-full px-3 py-1.5 text-[13px] text-ink ring-1 ring-line transition hover:ring-ink/30">{p!.title}</Link>)}
                      </div>
                    </Reveal>
                  )}

                  <div className="mt-10 flex flex-wrap items-center gap-5">
                    <Button to={`/contact?service=${encodeURIComponent(s.title)}`} arrow>Enquire about {s.shortTitle}</Button>
                    <ArrowLink to={`/services/${s.slug}`}>Service details</ArrowLink>
                  </div>
                </div>

                <div className={cn('lg:col-span-6', flip && 'lg:order-1')}>
                  <div className="lg:sticky lg:top-36">
                    <Reveal className="rounded-[22px] bg-paper-off p-5 pb-8 ring-1 ring-line sm:p-8 sm:pb-10">
                      <div className={cn('mx-auto', s.mock === 'mobile' ? 'w-[55%] sm:w-[45%]' : '')}><Mock kind={s.mock} /></div>
                    </Reveal>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <ProcessTimeline />
      <CTASection title="Not sure which service you need?" body="Describe the problem. We’ll recommend the approach — and tell you honestly if you don’t need custom software at all." primary={['Discuss Your Requirements', '/contact?topic=requirements']} secondary={['View Our Work', '/work']} />
    </>
  );
}
