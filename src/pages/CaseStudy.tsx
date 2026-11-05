import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { getProject, projects } from '@/data/projects';
import { Mock, isPhoneMock } from '@/components/Mock/Mock';
import { Reveal, RevealText } from '@/components/Motion/Reveal';
import { DraftNotice } from '@/components/Notice/DraftNotice';
import { CTASection } from '@/components/CTA/CTASection';
import NotFound from './NotFound';
import { cn } from '@/utils/cn';

export default function CaseStudy() {
  const { slug } = useParams();
  const p = getProject(slug);
  useDocumentMeta(p?.seo.title ?? 'Project not found', p?.seo.description ?? '');
  if (!p) return <NotFound />;

  const idx = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(idx + 1) % projects.length];
  const phone = isPhoneMock(p.mock);
  const dark = p.mock === 'music';

  return (
    <article>
      <header className="container pb-14 pt-12 sm:pt-16">
        <Link to="/work" className="eyebrow inline-flex items-center gap-1.5 hover:text-ink"><ArrowLeft className="h-3 w-3" aria-hidden />All work</Link>
        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow">{p.category}</p>
            <RevealText text={p.title} className="mt-4 font-display text-[3.2rem] font-medium leading-[0.95] tracking-tightest sm:text-8xl lg:text-[8rem]" />
          </div>
          <p className="text-[17px] leading-relaxed text-muted lg:col-span-4">{p.summary}</p>
        </div>
        <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-line pt-6 sm:grid-cols-4">
          <Meta label="Category" value={p.category} />
          <Meta label="Stack" value={p.stack.join(', ')} />
          <Meta label="Platform" value={phone ? 'Mobile' : 'Web'} />
          <Meta label="Status" value={p.draft ? 'Draft case study' : 'Published'} />
        </dl>
        {p.draft && <DraftNotice className="mt-8">Draft case study. Copy and stack are working drafts that need confirmation; visuals are interface demonstrations rather than product screenshots.</DraftNotice>}
      </header>

      <div className={cn('py-12 sm:py-20', dark ? 'bg-[#141719]' : 'bg-paper-off')}>
        <div className="container">
          {phone ? (
            <div className="mx-auto grid max-w-3xl grid-cols-3 items-end gap-4 sm:gap-10">
              <Reveal className="translate-y-6 opacity-60"><Mock kind={p.mock} label={false} /></Reveal>
              <Reveal delay={0.08}><Mock kind={p.mock} /></Reveal>
              <Reveal delay={0.16} className="translate-y-6 opacity-60"><Mock kind={p.mock} label={false} /></Reveal>
            </div>
          ) : (
            <Reveal className="mx-auto max-w-5xl"><Mock kind={p.mock} /></Reveal>
          )}
        </div>
      </div>

      <div className="container py-20 lg:py-28">
        <Block n="01" title="Project overview"><p>{p.overview}</p></Block>
        <Block n="02" title="Problem statement"><p className="font-display text-[24px] leading-snug tracking-tight text-ink sm:text-[28px]">{p.problem}</p></Block>
        <Block n="03" title="Objectives">
          <ol className="space-y-3">{p.objectives.map((o, i) => <li key={o} className="flex gap-4"><span className="font-mono text-[12px] text-muted">{i + 1}.</span>{o}</li>)}</ol>
        </Block>
        <Block n="04" title="Solution"><p>{p.solution}</p></Block>
        <Block n="05" title="Design approach"><p>{p.designApproach}</p></Block>
        <Block n="06" title="Technology architecture">
          <div className="flex flex-col items-stretch sm:flex-row">
            {p.architecture.map((a, i) => (
              <div key={a.layer} className="flex flex-1 flex-col sm:flex-row sm:items-center">
                <div className={cn('flex-1 self-stretch rounded-xl p-4 ring-1', i === 0 ? 'bg-ink text-white ring-ink' : 'bg-white ring-line')}>
                  <p className={cn('font-mono text-[10.5px] uppercase tracking-widest', i === 0 ? 'text-white/50' : 'text-muted')}>{a.layer}</p>
                  <ul className="mt-2 space-y-1 text-[14px]">{a.items.map((it) => <li key={it}>{it}</li>)}</ul>
                </div>
                {i < p.architecture.length - 1 && <span className="mx-auto h-4 w-px bg-brand-gradient sm:mx-0 sm:h-px sm:w-4" aria-hidden />}
              </div>
            ))}
          </div>
        </Block>
        <Block n="07" title="Key features">
          <div className="grid gap-px overflow-hidden rounded-xl bg-line ring-1 ring-line sm:grid-cols-3">
            {p.features.map((f) => <div key={f.title} className="bg-white p-5"><p className="font-medium text-ink">{f.title}</p><p className="mt-1 text-[14px] text-muted">{f.description}</p></div>)}
          </div>
        </Block>
        {p.outcomes.length > 0 && (
          <Block n="08" title="Outcomes"><ul className="space-y-2">{p.outcomes.map((o) => <li key={o}>{o}</li>)}</ul></Block>
        )}
      </div>

      <nav className="container" aria-label="Next project">
        <Link to={`/work/${next.slug}`} className="group flex items-center justify-between border-t border-line py-10">
          <span><span className="eyebrow">Next project</span><span className="mt-2 block font-display text-[34px] font-medium tracking-tight sm:text-[56px]">{next.title}</span></span>
          <ArrowRight className="h-8 w-8 transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden />
        </Link>
      </nav>
      <CTASection />
    </article>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return <div><dt className="eyebrow">{label}</dt><dd className="mt-1.5 text-[14.5px] text-ink">{value}</dd></div>;
}

function Block({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <Reveal className="grid gap-4 border-t border-line py-10 lg:grid-cols-12 lg:gap-10">
      <div className="flex items-baseline gap-3 lg:col-span-4">
        <span className="font-mono text-[11px] text-muted">{n}</span>
        <h2 className="font-display text-[22px] font-medium tracking-tight">{title}</h2>
      </div>
      <div className="max-w-2xl text-[16.5px] leading-relaxed text-ink/85 lg:col-span-8">{children}</div>
    </Reveal>
  );
}
