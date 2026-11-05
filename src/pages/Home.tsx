import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { Button, ArrowLink } from '@/components/Buttons/Button';
import { RevealText, Reveal } from '@/components/Motion/Reveal';
import { SectionHeading } from '@/components/SectionHeading/SectionHeading';
import { Mock } from '@/components/Mock/Mock';
import { ServiceExplorer } from '@/components/ServiceCard/ServiceExplorer';
import { ProjectCard } from '@/components/ProjectCard/ProjectCard';
import { ProductShowcase, StatusPill } from '@/components/ProductCard/ProductShowcase';
import { ProductGlyph } from '@/components/ProductCard/ProductGlyph';
import { DraftNotice } from '@/components/Notice/DraftNotice';
import { CTASection } from '@/components/CTA/CTASection';
import { ProcessTimeline } from '@/components/Sections/ProcessTimeline';
import { TechStack } from '@/components/Sections/TechStack';
import { services } from '@/data/services';
import { products } from '@/data/products';
import { projects } from '@/data/projects';
import { industries, principles } from '@/data/navigation';

export default function Home() {
  useDocumentMeta('', 'Crista Software designs, builds and scales digital products for businesses — and develops its own software products. Ideas Into Impact.');
  return (
    <>
      <Hero />
      <Intro />
      <WhatWeDo />
      <section className="container py-24 lg:py-32" aria-labelledby="svc-h">
        <SectionHeading
          index="03"
          eyebrow="Services"
          title={<span id="svc-h">Engineering Solutions for Real Business Challenges.</span>}
          intro="Six disciplines, one team. Each engagement draws on the ones your problem actually needs."
          align="split"
          className="mb-14 lg:mb-20"
        />
        <ServiceExplorer />
      </section>
      <ProcessTimeline />
      <SelectedWork />
      <OurProducts />
      <TechStack />
      <Industries />
      <WhyCrista />
      <CTASection />
    </>
  );
}

/* ---------------- 1. Hero ---------------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yStage = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);
  const yPhone = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -130]);

  return (
    <section ref={ref} className="relative -mt-16 overflow-hidden pt-16" aria-labelledby="hero-title">
      <div className="grid-paper fade-mask-b pointer-events-none absolute inset-x-0 top-0 h-[720px] opacity-70" aria-hidden />
      <div className="container relative pb-10 pt-14 sm:pt-20 lg:pt-24">
        <motion.div initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-white py-1 pl-1 pr-3 text-[12.5px] text-muted shadow-soft ring-1 ring-line">
            <span className="rounded-full bg-ink px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-white">Services</span>
            <span className="rounded-full bg-brand-gradient px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-ink">Products</span>
            Software engineering, two ways
          </span>
        </motion.div>

        <RevealText id="hero-title" text="Engineering Ideas Into Digital Impact." className="h-display max-w-[15ch] text-balance text-ink lg:max-w-[16ch]" />

        <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-12 lg:gap-10">
          <motion.div
            className="lg:col-span-4"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            <p className="font-display text-[20px] font-medium leading-snug tracking-tight text-ink sm:text-[22px]">
              We design, build and scale digital products that help businesses move forward.
            </p>
            <p className="mt-4 text-[15.5px] leading-relaxed text-muted">
              From custom software and mobile applications to intelligent automation and our own digital products, Crista turns complex challenges into practical technology.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Button to="/services" variant="gradient" size="lg" arrow>Explore Our Services</Button>
              <Button to="/work" variant="secondary" size="lg">View Our Work</Button>
            </div>
            <dl className="mt-10 hidden grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-6 text-[13px] lg:grid">
              {[['Build', 'Web · Mobile · Custom'], ['Think', 'AI · Product design'], ['Run', 'Cloud · DevOps'], ['Own', 'Crista products']].map(([k, v]) => (
                <div key={k}><dt className="eyebrow">{k}</dt><dd className="mt-1 text-ink">{v}</dd></div>
              ))}
            </dl>
          </motion.div>

          <motion.div
            className="relative lg:col-span-8"
            initial={reduce ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div style={{ y: yStage }} className="relative lg:-mr-24 xl:-mr-40">
              <Mock kind="web" labelSide="left" />
            </motion.div>
            <motion.div style={{ y: yPhone }} className="absolute -bottom-10 right-2 w-[30%] max-w-[210px] sm:right-6 lg:-bottom-16 lg:right-[-1rem]">
              <Mock kind="mobile" label={false} />
            </motion.div>
            <div className="absolute -left-3 bottom-10 hidden w-[230px] rounded-2xl bg-white p-4 shadow-lift ring-1 ring-line sm:block lg:-left-10">
              <p className="eyebrow">Release pipeline</p>
              <div className="mt-3 space-y-2">
                {['Tests passed', 'Image built', 'Deployed to production'].map((t, i) => (
                  <div key={t} className="flex items-center gap-2 text-[12.5px] text-ink">
                    <span className="grid h-4 w-4 place-items-center rounded-full" style={{ background: i === 2 ? 'linear-gradient(110deg,#22C55E,#06B6D4)' : '#17191C' }}>
                      <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 text-white"><path d="M2.5 6.2 5 8.5l4.5-5" fill="none" stroke="currentColor" strokeWidth="1.8" /></svg>
                    </span>
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="h-16 lg:h-24" />
    </section>
  );
}

/* ---------------- 2. Introduction ---------------- */
function Intro() {
  const pillars = [
    ['Software engineering', 'Clean architecture, tested code and infrastructure that holds up in production.'],
    ['Product thinking', 'We question the brief, prioritise ruthlessly and design for real users.'],
    ['Business understanding', 'Technology decisions measured against cost, time and operational reality.'],
  ];
  return (
    <section className="border-t border-line bg-paper-off py-24 lg:py-32" aria-labelledby="intro-h">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow mb-5 flex items-center gap-3"><span className="text-ink">01</span><span className="h-px w-6 bg-line" />Introduction</p>
            <h2 id="intro-h" className="h-section text-balance">Technology Should Move Business Forward.</h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5 lg:pt-14">
            <p className="text-[18px] leading-relaxed text-ink">
              Crista Software is the technology division of Crista Enterprises. We help organisations turn ideas and operational problems into dependable software — and we build our own products with the same standards.
            </p>
            <p className="mt-4 lede">Good software is not measured by features shipped, but by the work it removes, the decisions it enables and how well it holds up a year later.</p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 lg:mt-20 lg:grid-cols-12">
          <Reveal className="lg:col-span-8">
            <div className="relative overflow-hidden rounded-[22px] bg-white p-5 ring-1 ring-line sm:p-8">
              <Mock kind="erp" />
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-4">
            <div className="relative flex h-full flex-col overflow-hidden rounded-[22px] bg-ink p-6 text-white sm:p-8">
              <div className="grid-paper-dark fade-mask-b absolute inset-0" aria-hidden />
              <p className="eyebrow relative text-white/45">Systems + intelligence</p>
              <p className="relative mt-5 font-display text-[24px] font-medium leading-snug tracking-tight">
                Operational systems and the intelligence layered on top — built as one coherent product.
              </p>
              <ol className="relative mt-8 space-y-0 lg:mt-auto">
                {[['Capture', 'Orders, records, documents'], ['Organise', 'One model, one source of truth'], ['Automate', 'Workflows and AI assistance'], ['Decide', 'Dashboards and reporting']].map(([t, d], i) => (
                  <li key={t} className="flex items-center gap-4 border-t border-white/10 py-3.5">
                    <span className={i === 2 ? 'h-2 w-2 rounded-full bg-brand-gradient' : 'h-2 w-2 rounded-full bg-white/30'} />
                    <span className="w-24 text-[14px] font-medium">{t}</span>
                    <span className="text-[13px] text-white/50">{d}</span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-[18px] bg-line ring-1 ring-line sm:grid-cols-3">
          {pillars.map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.06} className="bg-paper-off p-6 sm:p-8">
              <p className="font-mono text-[11px] text-muted">0{i + 1}</p>
              <h3 className="mt-6 font-display text-[20px] font-medium tracking-tight">{t}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- 3. What We Do ---------------- */
function WhatWeDo() {
  return (
    <section className="container py-24 lg:py-32" aria-labelledby="wwd-h">
      <SectionHeading index="02" eyebrow="What we do" title={<span id="wwd-h">From Concept to Production.</span>} intro="One engineering company, working on two fronts: solutions for our clients, and products of our own." align="split" className="mb-14" />

      <div className="relative grid gap-5 lg:grid-cols-2">
        {/* A. Services */}
        <Reveal className="flex flex-col rounded-[24px] bg-white p-7 ring-1 ring-line sm:p-10">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">A — Software Services</span>
            <span className="h-2 w-2 rounded-full bg-ink" aria-hidden />
          </div>
          <h3 className="mt-10 font-display text-[30px] font-medium leading-tight tracking-tighter2 sm:text-[36px]">Technology solutions engineered around your business requirements.</h3>
          <ul className="mt-10 divide-y divide-line border-y border-line">
            {services.map((s) => (
              <li key={s.slug}>
                <Link to={`/services/${s.slug}`} className="group flex items-center justify-between py-3.5 text-[15px] text-ink">
                  <span className="flex items-baseline gap-4"><span className="font-mono text-[11px] text-muted">{s.index}</span>{s.title}</span>
                  <ArrowRight className="h-4 w-4 -translate-x-1 text-muted opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8"><Button to="/services" arrow>Explore Services</Button></div>
        </Reveal>

        {/* B. Products */}
        <Reveal delay={0.08} className="relative flex flex-col overflow-hidden rounded-[24px] bg-ink p-7 text-white sm:p-10">
          <div className="grid-paper-dark fade-mask-b absolute inset-0" aria-hidden />
          <div className="relative flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/50">B — Software Products</span>
            <span className="h-2 w-2 rounded-full bg-brand-gradient" aria-hidden />
          </div>
          <h3 className="relative mt-10 font-display text-[30px] font-medium leading-tight tracking-tighter2 sm:text-[36px]">Purpose-built digital products designed to solve real-world problems.</h3>
          <ul className="relative mt-10 space-y-3">
            {products.map((p) => (
              <li key={p.slug}>
                <Link to={`/products/${p.slug}`} className="group flex items-center gap-4 rounded-2xl bg-white/[0.04] p-3 ring-1 ring-white/10 transition hover:bg-white/[0.07]">
                  <ProductGlyph product={p} />
                  <div className="min-w-0 flex-1">
                    <p className="text-[15px] font-medium">{p.name}</p>
                    <p className="truncate text-[13px] text-white/50">{p.category}</p>
                  </div>
                  <StatusPill status={p.status} dark />
                </Link>
              </li>
            ))}
          </ul>
          <div className="relative mt-8 lg:mt-auto lg:pt-8"><Button to="/products" variant="light" arrow>Explore Products</Button></div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- 6. Selected Work ---------------- */
function SelectedWork() {
  const [a, b, c, d] = projects;
  return (
    <section className="container py-24 lg:py-32" aria-labelledby="work-h">
      <SectionHeading
        index="05"
        eyebrow="Selected work"
        title={<span id="work-h">Built with Purpose. Designed to Perform.</span>}
        align="split"
        intro="A selection of software built by the team — business systems, mobile apps and AI-assisted tools."
        action={<ArrowLink to="/work">View all work</ArrowLink>}
        className="mb-10"
      />
      <DraftNotice className="mb-14">Portfolio entries are internal projects shown as drafts. Descriptions and stacks need confirmation, and visuals are interface demonstrations — not client screenshots.</DraftNotice>
      <div className="grid gap-x-8 gap-y-16 lg:grid-cols-12">
        <Reveal className="lg:col-span-12"><ProjectCard project={a} size="lg" index={0} /></Reveal>
        <Reveal className="lg:col-span-7"><ProjectCard project={b} index={1} /></Reveal>
        <Reveal delay={0.08} className="lg:col-span-5 lg:mt-32"><ProjectCard project={c} index={2} /></Reveal>
        <Reveal className="lg:col-span-6 lg:col-start-4"><ProjectCard project={d} index={3} /></Reveal>
      </div>
    </section>
  );
}

/* ---------------- 7. Products ---------------- */
function OurProducts() {
  const [featured, ...rest] = products;
  return (
    <section className="border-y border-line bg-paper-off py-24 lg:py-32" aria-labelledby="prod-h">
      <div className="container">
        <SectionHeading
          index="06"
          eyebrow="Our products"
          title={<span id="prod-h">Not Just Building for Others. Building for the Future.</span>}
          intro="Alongside client work, Crista develops software products of its own — tested on real problems before they ever reach a customer."
          align="split"
          className="mb-14"
        />
        <Reveal><ProductShowcase product={featured} /></Reveal>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06}>
              <Link to={`/products/${p.slug}`} className="group flex h-full flex-col rounded-[22px] bg-white p-6 ring-1 ring-line transition hover:ring-ink/20 sm:p-8">
                <div className="flex items-center gap-3">
                  <ProductGlyph product={p} />
                  <div className="flex-1"><p className="font-display text-[18px] font-medium tracking-tight">{p.name}</p><p className="eyebrow">{p.category}</p></div>
                  <StatusPill status={p.status} />
                </div>
                <p className="mt-6 text-[15px] leading-relaxed text-muted">{p.description}</p>
                <span className="mt-6 inline-flex items-center gap-1 text-[13.5px] font-medium text-ink">Explore Product <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden /></span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- 9. Industries ---------------- */
function Industries() {
  return (
    <section className="container py-24 lg:py-32" aria-labelledby="ind-h">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading index="08" eyebrow="Industries" title={<span id="ind-h">Technology Across Industries.</span>} />
            <p className="lede mt-6">Bookings, operations, records and data look different in every sector — the engineering underneath is the same. These are the industries our services are set up to support.</p>
          </div>
        </div>
        <ul className="border-t border-line lg:col-span-8">
          {industries.map((ind, i) => (
            <Reveal key={ind.name} delay={i * 0.03}>
              <li className="group relative grid grid-cols-[2.25rem_1fr] items-baseline gap-x-4 border-b border-line py-6 sm:grid-cols-[3rem_1fr_1fr] sm:py-7">
                <span className="font-mono text-[11px] text-muted">{String(i + 1).padStart(2, '0')}</span>
                <span className="font-display text-[22px] font-medium tracking-tight transition-transform duration-500 group-hover:translate-x-1.5 sm:text-[28px]">{ind.name}</span>
                <span className="col-start-2 mt-1 text-[14.5px] text-muted sm:col-start-3 sm:mt-0 sm:text-right">{ind.note}</span>
                <span className="absolute bottom-[-1px] left-0 h-px w-0 bg-brand-gradient transition-all duration-700 group-hover:w-full" aria-hidden />
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- 10. Why Crista ---------------- */
function WhyCrista() {
  return (
    <section className="border-t border-line bg-paper-off py-24 lg:py-32" aria-labelledby="why-h">
      <div className="container">
        <SectionHeading index="09" eyebrow="Why Crista" title={<span id="why-h">A Technology Partner, Not Just a Development Vendor.</span>} align="split" intro="Vendors deliver tickets. Partners take responsibility for whether the software works for the business." className="mb-14" />
        <div className="grid gap-px overflow-hidden rounded-[22px] bg-line ring-1 ring-line sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 0.06} className="group relative bg-white p-7 sm:p-9">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-muted">{String(i + 1).padStart(2, '0')}</span>
                <Glyph i={i} />
              </div>
              <h3 className="mt-8 font-display text-[21px] sm:mt-14 font-medium tracking-tight">{p.title}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Small line glyphs — one per principle, drawn in the brand stroke. */
function Glyph({ i }: { i: number }) {
  const paths = [
    'M4 20h16M7 16l4-5 3 3 5-7', // business-first: rising
    'M12 3v18M3 12h18', // purpose: crosshair
    'M4 18h4v-4H4zM10 18h4v-8h-4zM16 18h4V6h-4z', // scalable
    'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21c1.5-4 4.5-6 8-6s6.5 2 8 6', // user
    'M3 12h4l2-5 4 10 2-5h6', // transparent: signal
    'M12 3a9 9 0 1 0 9 9M12 7v5l3 2', // long-term
  ];
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 transition-transform duration-500 group-hover:rotate-[8deg]" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <defs><linearGradient id={`gl${i}`} x1="0" x2="1"><stop offset="0" stopColor="#22C55E" /><stop offset="1" stopColor="#06B6D4" /></linearGradient></defs>
      <path d={paths[i]} stroke={`url(#gl${i})`} />
    </svg>
  );
}
