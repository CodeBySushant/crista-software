import { ArrowUpRight } from 'lucide-react';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { PageHero } from '@/components/Sections/PageHero';
import { Reveal } from '@/components/Motion/Reveal';
import { Mock } from '@/components/Mock/Mock';
import { Button } from '@/components/Buttons/Button';
import { TechStack } from '@/components/Sections/TechStack';
import { CTASection } from '@/components/CTA/CTASection';
import { LogoMark } from '@/components/Logo/Logo';
import { company, principles } from '@/data/navigation';

const engineering = [
  ['Simple before clever', 'The best architecture is the one the next engineer understands on day one.'],
  ['Tested where it matters', 'Automated tests around business rules, payments and data — the parts that can’t break.'],
  ['Observable by default', 'Logs, metrics and alerts are part of the build, not an afterthought.'],
  ['Documented handover', 'Code, environments and decisions written down so you are never locked in.'],
];

const values = [
  ['Clarity', 'Plain language, visible progress, no surprises.'],
  ['Craft', 'Care in the details users notice and the ones they don’t.'],
  ['Ownership', 'We treat your outcome as our responsibility.'],
  ['Integrity', 'We say what we know, what we don’t, and what it will cost.'],
];

export default function About() {
  useDocumentMeta('About', 'Crista Software is the technology division of Crista Enterprises — building software for businesses and developing its own products.');
  return (
    <>
      <PageHero
        eyebrow="About Crista Software"
        title="Building Technology with Purpose."
        description="Crista Software is the software and technology division of Crista Enterprises. We build digital solutions for businesses — and develop our own products with the same care."
      />

      {/* Introduction — editorial two column */}
      <section className="container pb-20 lg:pb-28">
        <div className="grid gap-12 border-t border-line pt-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="font-display text-[28px] font-medium leading-[1.2] tracking-tighter2 text-ink sm:text-[34px]">
              We exist to close the gap between a good idea and software that actually works for a business.
            </p>
          </Reveal>
          <Reveal delay={0.08} className="space-y-5 text-[16.5px] leading-relaxed text-muted lg:col-span-6 lg:col-start-7">
            <p>Many businesses know exactly what slows them down — manual processes, disconnected tools, customers waiting on answers. What they need is a partner who can turn that understanding into a reliable product.</p>
            <p>That is the work of Crista Software: listening first, designing carefully, engineering for the long term and staying honest about trade-offs along the way.</p>
            <p className="text-ink">We combine software engineering, product thinking and business understanding — and we apply all three to our own products as well as to client work.</p>
          </Reveal>
        </div>
      </section>

      {/* Philosophy — dark band */}
      <section className="relative overflow-hidden bg-ink py-24 text-white lg:py-32">
        <div className="grid-paper-dark absolute inset-0 opacity-60" aria-hidden />
        <div className="container relative grid gap-12 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow text-white/45">Our philosophy</p>
            <h2 className="mt-5 h-section text-white">Ideas are cheap. <span className="text-gradient">Impact</span> is engineered.</h2>
            <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-white/60">Our tagline is a working principle. Every feature has to justify itself in time saved, revenue enabled or risk reduced — otherwise it doesn’t ship.</p>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/10">
              {principles.slice(0, 4).map((p) => (
                <div key={p.title} className="bg-ink p-6">
                  <p className="font-display text-[17px] font-medium">{p.title}</p>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-white/50">{p.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Engineering approach */}
      <section className="container py-24 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow">Engineering</p>
            <h2 className="mt-4 h-sub">How we approach engineering.</h2>
          </Reveal>
          <ol className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:col-span-8">
            {engineering.map(([t, d], i) => (
              <Reveal key={t} delay={(i % 2) * 0.06}>
                <li className="list-none border-t border-ink pt-5">
                  <span className="font-mono text-[11px] text-muted">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-3 font-display text-[22px] font-medium tracking-tight">{t}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{d}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Two fronts */}
      <section className="border-y border-line bg-paper-off py-24 lg:py-32">
        <div className="container">
          <Reveal className="max-w-3xl"><p className="eyebrow">Two fronts</p><h2 className="mt-4 h-section">Software services and product development.</h2></Reveal>
          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            <Reveal className="rounded-[22px] bg-white p-6 ring-1 ring-line sm:p-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">For clients</p>
              <h3 className="mt-4 font-display text-[26px] font-medium tracking-tight">We build what your business needs.</h3>
              <p className="mt-3 text-[15px] text-muted">Web, mobile, custom systems, AI and infrastructure — scoped and engineered around your requirements.</p>
              <div className="mt-8"><Mock kind="web" /></div>
              <div className="mt-10"><Button to="/services" arrow>Our services</Button></div>
            </Reveal>
            <Reveal delay={0.08} className="rounded-[22px] bg-ink p-6 text-white sm:p-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/45">For the market</p>
              <h3 className="mt-4 font-display text-[26px] font-medium tracking-tight">We build products of our own.</h3>
              <p className="mt-3 text-[15px] text-white/55">Independent products shaped by problems we see across industries — and honest about their stage.</p>
              <div className="mt-8"><Mock kind="mobility" /></div>
              <div className="mt-10"><Button to="/products" variant="light" arrow>Our products</Button></div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="container py-24 lg:py-32">
        <Reveal className="mb-12"><p className="eyebrow">Values</p><h2 className="mt-4 h-section">What we hold ourselves to.</h2></Reveal>
        <div className="grid gap-px overflow-hidden rounded-[22px] bg-line ring-1 ring-line sm:grid-cols-2 lg:grid-cols-4">
          {values.map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.05} className="bg-white p-7">
              <p className="font-display text-[44px] font-medium leading-none tracking-tightest text-ink/10">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="mt-8 font-display text-[22px] font-medium">{t}</h3>
              <p className="mt-2 text-[14.5px] text-muted">{d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="container"><TechStack index="—" compact /></div>

      {/* Parent company */}
      <section className="container pb-8">
        <Reveal className="flex flex-col items-start gap-6 rounded-[22px] bg-paper-off p-7 ring-1 ring-line sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div className="flex items-center gap-5">
            <LogoMark className="h-12 w-12" />
            <div>
              <p className="eyebrow">Parent company</p>
              <p className="mt-1 font-display text-[24px] font-medium tracking-tight">Part of {company.parent}.</p>
            </div>
          </div>
          <a href={company.parentUrl} className="inline-flex items-center gap-1.5 rounded-full px-5 py-3 text-[14px] font-medium ring-1 ring-line transition hover:ring-ink/30">
            Visit {company.parent} <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
        </Reveal>
      </section>

      <CTASection />
    </>
  );
}
