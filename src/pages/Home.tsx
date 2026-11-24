import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { DEFAULT_DESCRIPTION } from '@/seo/site';
import { Button, ArrowLink } from '@/components/Buttons/Button';
import { HeroCrystal } from '@/components/HeroCrystal/HeroCrystal';
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
  useDocumentMeta('', DEFAULT_DESCRIPTION);
  return (
    <>
      <Hero />
      <Intro />
      <WhatWeDo />
      <section className="container py-24 lg:py-32" aria-labelledby="svc-h">
        <SectionHeading
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
  const yCrystal = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -80]);

  return (
    <section ref={ref} className="relative -mt-16 overflow-hidden pt-16" aria-labelledby="hero-title">
      <div className="container relative grid items-center gap-10 pb-16 pt-16 sm:pt-24 lg:min-h-[calc(100vh-4rem)] lg:grid-cols-12 lg:gap-6 lg:pb-24 lg:pt-10">
        <div className="lg:col-span-7">
          <RevealText id="hero-title" text="Engineering Ideas Into Digital Impact." className="h-display max-w-[15ch] text-balance text-ink" />

          <motion.div
            className="mt-8 max-w-[34rem]"
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
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button to="/services" variant="gradient" size="lg" arrow>Explore Our Services</Button>
              <Button to="/work" variant="secondary" size="lg">View Our Work</Button>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="relative mx-auto w-full max-w-[380px] sm:max-w-[460px] lg:col-span-5 lg:max-w-none"
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div style={{ y: yCrystal }} className="lg:-mr-10 xl:-mr-20 lg:scale-[1.15] xl:scale-[1.25]">
            <HeroCrystal />
          </motion.div>
        </motion.div>
      </div>
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
            <div className="relative overflow-hidden rounded-[22px] bg-surface p-5 ring-1 ring-line sm:p-8">
              <Mock kind="erp" />
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-4">
            <div className="relative flex h-full flex-col overflow-hidden rounded-[22px] bg-inverse p-6 text-white sm:p-8">
              <div className="grid-paper-dark fade-mask-b absolute inset-0" aria-hidden />
              <p className="relative font-display text-[24px] font-medium leading-snug tracking-tight">
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
              <h3 className="font-display text-[20px] font-medium tracking-tight">{t}</h3>
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
      <SectionHeading title={<span id="wwd-h">From Concept to Production.</span>} intro="One engineering company, working on two fronts: solutions for our clients, and products of our own." align="split" className="mb-14" />

      <div className="relative grid gap-5 lg:grid-cols-2">
        {/* A. Services */}
        <Reveal className="flex flex-col rounded-[24px] bg-surface p-7 ring-1 ring-line sm:p-10">
          <h3 className="font-display text-[30px] font-medium leading-tight tracking-tighter2 sm:text-[36px]">Technology solutions engineered around your business requirements.</h3>
          <ul className="mt-10 divide-y divide-line border-y border-line">
            {services.map((s) => (
              <li key={s.slug}>
                <Link to={`/services/${s.slug}`} className="group flex items-center justify-between py-3.5 text-[15px] text-ink">
                  <span>{s.title}</span>
                  <ArrowRight className="h-4 w-4 -translate-x-1 text-muted opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8"><Button to="/services" arrow>Explore Services</Button></div>
        </Reveal>

        {/* B. Products */}
        <Reveal delay={0.08} className="relative flex flex-col overflow-hidden rounded-[24px] bg-inverse p-7 text-white sm:p-10">
          <div className="grid-paper-dark fade-mask-b absolute inset-0" aria-hidden />
          <h3 className="relative font-display text-[30px] font-medium leading-tight tracking-tighter2 sm:text-[36px]">Purpose-built digital products designed to solve real-world problems.</h3>
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
        title={<span id="work-h">Built with Purpose. Designed to Perform.</span>}
        align="split"
        intro="A selection of software built by the team — business systems, mobile apps and AI-assisted tools."
        action={<ArrowLink to="/work">View all work</ArrowLink>}
        className="mb-10"
      />
      <DraftNotice className="mb-14">Portfolio entries are internal projects shown as drafts. Descriptions and stacks need confirmation, and visuals are interface demonstrations — not client screenshots.</DraftNotice>
      <div className="grid gap-x-8 gap-y-16 lg:grid-cols-12">
        <Reveal className="lg:col-span-12"><ProjectCard project={a} size="lg" /></Reveal>
        <Reveal className="lg:col-span-7"><ProjectCard project={b} /></Reveal>
        <Reveal delay={0.08} className="lg:col-span-5 lg:mt-32"><ProjectCard project={c} /></Reveal>
        <Reveal className="lg:col-span-6 lg:col-start-4"><ProjectCard project={d} /></Reveal>
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
          title={<span id="prod-h">Not Just Building for Others. Building for the Future.</span>}
          intro="Alongside client work, Crista develops software products of its own — tested on real problems before they ever reach a customer."
          align="split"
          className="mb-14"
        />
        <Reveal><ProductShowcase product={featured} /></Reveal>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06}>
              <Link to={`/products/${p.slug}`} className="group flex h-full flex-col rounded-[22px] bg-surface p-6 ring-1 ring-line transition hover:ring-ink/20 sm:p-8">
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
            <SectionHeading title={<span id="ind-h">Technology Across Industries.</span>} />
            <p className="lede mt-6">Bookings, operations, records and data look different in every sector — the engineering underneath is the same. These are the industries our services are set up to support.</p>
          </div>
        </div>
        <ul className="border-t border-line lg:col-span-8">
          {industries.map((ind, i) => (
            <Reveal key={ind.name} delay={i * 0.03}>
              <li className="group relative grid items-baseline gap-x-4 border-b border-line py-6 sm:grid-cols-[1fr_1fr] sm:py-7">
                <span className="font-display text-[22px] font-medium tracking-tight transition-transform duration-500 group-hover:translate-x-1.5 sm:text-[28px]">{ind.name}</span>
                <span className="mt-1 text-[14.5px] text-muted sm:mt-0 sm:text-right">{ind.note}</span>
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
        <SectionHeading title={<span id="why-h">A Technology Partner, Not Just a Development Vendor.</span>} align="split" intro="Vendors deliver tickets. Partners take responsibility for whether the software works for the business." className="mb-14" />
        <div className="grid gap-px overflow-hidden rounded-[22px] bg-line ring-1 ring-line sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 0.06} className="group relative bg-surface p-7 sm:p-9">
              <Glyph i={i} />
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
      <defs><linearGradient id={`gl${i}`} x1="0" x2="1"><stop offset="0" stopColor="#F4F4F5" /><stop offset="1" stopColor="#A1A1AA" /></linearGradient></defs>
      <path d={paths[i]} stroke={`url(#gl${i})`} />
    </svg>
  );
}
