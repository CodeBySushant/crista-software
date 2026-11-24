import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Github, Instagram, type LucideIcon } from 'lucide-react';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { Reveal } from '@/components/Motion/Reveal';
import { Journey } from '@/components/Careers/Journey';
import { HiringProcess } from '@/components/Careers/HiringProcess';
import { ApplyDialog } from '@/components/Careers/ApplyDialog';
import { benefitIcons } from '@/components/Careers/icons';
import {
  benefits, community, howWeWork, photos, positions, stats, team, teamIntro, teamStory, values,
} from '@/data/careers';
import { anchorClick, scrollToId } from '@/utils/scroll';
import { cn } from '@/utils/cn';

const SECTIONS = [
  { id: 'top', label: 'Introduction' },
  { id: 'journey', label: 'Our journey' },
  { id: 'values', label: 'Values' },
  { id: 'team', label: 'Team' },
  { id: 'how-we-work', label: 'How we work' },
  { id: 'benefits', label: 'Benefits' },
  { id: 'positions', label: 'Open positions' },
  { id: 'hiring', label: 'Hiring process' },
];

export default function Careers() {
  useDocumentMeta(
    'Careers',
    'Join Crista Software. Build web platforms, mobile apps and AI products with a small team that cares about craft. See our values, benefits, open positions and hiring process.',
  );
  const [apply, setApply] = useState<{ open: boolean; role: string }>({ open: false, role: '' });
  const openApply = (role: string) => setApply({ open: true, role });
  const closeApply = useCallback(() => setApply((a) => ({ ...a, open: false })), []);

  return (
    <div className="relative">
      <SectionRail />

      <Hero />

      <Section id="journey" className="pt-6">
        <Journey />
      </Section>

      <Section id="values" title="Our values" intro="The way we work, written down. We hire for these, and we hold each other to them.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={(i % 3) * 0.05} className="rounded-2xl bg-[#111113] p-8 ring-1 ring-white/[0.04]">
              <h3 className="text-[17px] font-semibold text-white">{v.title}</h3>
              <p className="mt-2.5 text-[15.5px] leading-relaxed text-zinc-400">{v.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="team" title="Team" intro={teamIntro}>
        <TeamGrid />
        <TeamStory />
      </Section>

      <Section id="how-we-work" title="How we work" intro="Good work comes from focus, small teams and time to think. Here is what that looks like day to day.">
        <div className="gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {howWeWork.map((w, i) => (
            <Reveal key={w.title} delay={(i % 3) * 0.05} className="break-inside-avoid rounded-2xl bg-[#111113] p-8 ring-1 ring-white/[0.04]">
              <h3 className="text-[20px] font-semibold text-white"><Emphasis text={w.title} /></h3>
              {w.cadence && <p className="mt-1 text-[14px] text-zinc-500">{w.cadence}</p>}
              <p className="mt-4 text-[15.5px] leading-relaxed text-zinc-400">{w.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {photos.length > 0 && <Gallery />}

      <Section id="benefits" title="Our benefits" intro="We look after the people who build Crista, so they can do the best work of their careers.">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {benefits.map((b, i) => {
            const Icon = benefitIcons[b.icon];
            return (
              <Reveal key={b.title} delay={(i % 4) * 0.04} className="rounded-2xl bg-[#111113] px-5 py-8 text-center ring-1 ring-white/[0.04] sm:px-7 sm:py-10">
                <span className="mx-auto grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-b from-zinc-100 to-zinc-400 text-black shadow-[0_6px_20px_-8px_rgba(255,255,255,.5)]">
                  <Icon className="h-[18px] w-[18px]" strokeWidth={2} aria-hidden />
                </span>
                <h3 className="mt-6 text-[16.5px] font-semibold text-white">{b.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-zinc-400">{b.body}</p>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section
        id="positions"
        title="Open positions"
        intro={positions.length ? 'Find a role that fits, or send us a general application.' : 'There are no open positions right now, but we are always glad to hear from exceptional people.'}
      >
        {positions.length > 0 && (
          <ul className="mx-auto max-w-[880px] space-y-3">
            {positions.map((p) => (
              <li key={p.id}>
                <Reveal className="group flex flex-col gap-5 rounded-2xl bg-[#111113] p-6 ring-1 ring-white/[0.04] transition-colors hover:bg-[#151518] sm:flex-row sm:items-center sm:justify-between sm:p-7">
                  <div>
                    <h3 className="text-[18px] font-semibold text-white">{p.title}</h3>
                    <p className="mt-1 text-[14px] text-zinc-500">{p.team} · {p.location} · {p.type}</p>
                    <p className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-zinc-400">{p.summary}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => openApply(p.id)}
                    className="inline-flex shrink-0 items-center gap-2 self-start rounded-xl bg-white px-5 py-3 text-[15px] font-medium text-black transition hover:bg-white/90 sm:self-center"
                  >
                    Apply <ArrowRight className="h-4 w-4" aria-hidden />
                  </button>
                </Reveal>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => openApply('')}
            className="rounded-2xl bg-[#18181B] px-7 py-5 text-[15.5px] text-zinc-400 ring-1 ring-white/[0.05] transition-colors hover:bg-[#1E1E21]"
          >
            {positions.length ? 'Don’t see your role?' : 'Want to apply anyway?'}{' '}
            <span className="font-semibold text-white">Get in touch →</span>
          </button>
        </div>
      </Section>

      <Section id="hiring" title="Hiring process" intro="What to expect after you apply. Clear steps, quick replies and no trick questions.">
        <HiringProcess />
      </Section>

      <Community />

      <ApplyDialog open={apply.open} onClose={closeApply} positions={positions} initialPosition={apply.role} />
    </div>
  );
}

/* ---------------- building blocks ---------------- */

function Section({ id, title, intro, className, children }: { id: string; title?: string; intro?: string; className?: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={title ? `${id}-h` : undefined} className={cn('scroll-mt-24 py-20 sm:py-28', className)}>
      <div className="container">
        {title && (
          <Reveal className="mx-auto mb-14 max-w-[680px] text-center sm:mb-20">
            <h2 id={`${id}-h`} className="font-display text-[2.4rem] font-semibold leading-[1.1] text-white sm:text-[3.25rem]">{title}</h2>
            {intro && <p className="mt-5 text-[17.5px] leading-relaxed text-zinc-400 sm:text-[19px]">{intro}</p>}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}

/** "Time for *actual* work" → italic emphasis on the starred word. */
function Emphasis({ text }: { text: string }) {
  return <>{text.split(/\*(.+?)\*/g).map((t, i) => (i % 2 ? <em key={i} className="font-semibold">{t}</em> : t))}</>;
}

function Hero() {
  const reduce = useReducedMotion();
  return (
    <section id="top" className="relative -mt-16 overflow-hidden pt-16">
      <WaveLines />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-white/[0.07] blur-[120px]"
        aria-hidden
      />
      <div className="container relative flex min-h-[78vh] flex-col items-center justify-center py-24 text-center">
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[14ch] font-display text-[3rem] font-semibold leading-[1.04] text-white sm:text-[4.5rem] lg:text-[5.5rem]"
        >
          Help us turn ideas into impact
        </motion.h1>
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-7 max-w-[40ch] text-[18px] leading-relaxed text-zinc-400 sm:text-[21px]"
        >
          Join a small team building software for businesses, and products of our own.
        </motion.p>
        <motion.a
          href="#positions"
          onClick={anchorClick('#positions')}
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="group relative mt-12 inline-flex"
        >
          <span className="absolute -inset-x-6 -bottom-6 top-4 rounded-full bg-gradient-to-r from-zinc-400/40 via-white/50 to-zinc-500/40 opacity-70 blur-2xl transition-opacity group-hover:opacity-100" aria-hidden />
          <span className="relative rounded-xl bg-gradient-to-b from-white to-zinc-200 px-9 py-4 text-[17px] font-medium text-black ring-1 ring-white/60 shadow-[inset_0_-2px_0_rgba(0,0,0,.08)]">
            See open positions
          </span>
        </motion.a>
      </div>
    </section>
  );
}

/** Thin flowing contour lines behind the hero. */
function WaveLines() {
  const lines = Array.from({ length: 26 }, (_, i) => {
    const y = 40 + i * 26;
    const a = 38 + (i % 5) * 6;
    return `M-100 ${y} C 250 ${y - a}, 520 ${y + a}, 800 ${y} S 1350 ${y - a}, 1700 ${y + a / 2}`;
  });
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full [mask-image:radial-gradient(70%_65%_at_50%_35%,#000_30%,transparent_80%)]"
      viewBox="0 0 1600 760"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      {lines.map((d, i) => (
        <path key={i} d={d} fill="none" stroke="white" strokeOpacity={0.05} strokeWidth={1} />
      ))}
    </svg>
  );
}

const initials = (name: string) =>
  name.split(/\s+/).filter(Boolean).slice(0, 3).map((w) => w[0]!.toUpperCase()).join('');

const SHADES = [
  'from-zinc-200 to-zinc-500', 'from-zinc-500 to-zinc-800', 'from-zinc-300 to-zinc-600',
  'from-neutral-400 to-neutral-800', 'from-stone-300 to-stone-600', 'from-slate-300 to-slate-700',
];

function TeamGrid() {
  return (
    <ul className="mx-auto grid max-w-[920px] grid-cols-4 justify-items-center gap-x-4 gap-y-8 sm:grid-cols-6 lg:grid-cols-8">
      {team.map((m, i) => (
        <li key={`${m.name}-${i}`}>
          <Reveal delay={(i % 8) * 0.03} className="group flex flex-col items-center">
            {m.photo ? (
              <img src={m.photo} alt={m.name} width={76} height={76} className="h-[68px] w-[68px] rounded-full object-cover grayscale sm:h-[76px] sm:w-[76px]" />
            ) : (
              <span
                className={cn(
                  'grid h-[68px] w-[68px] place-items-center rounded-full bg-gradient-to-br text-[17px] font-semibold text-white/90 ring-1 ring-white/10 sm:h-[76px] sm:w-[76px]',
                  SHADES[i % SHADES.length],
                )}
                aria-hidden
              >
                {initials(m.name)}
              </span>
            )}
            <span className="mt-2.5 text-center text-[12.5px] leading-tight text-zinc-500 transition-colors group-hover:text-zinc-300">
              <span className="sr-only">{m.name}, </span>{m.role}
            </span>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}

function TeamStory() {
  const photo = photos[0];
  return (
    <div className={cn('mx-auto mt-24 grid max-w-[1120px] items-center gap-14', photo && 'lg:grid-cols-2')}>
      {photo && (
        <Reveal className="relative mx-auto w-full max-w-[560px]">
          <div className="absolute inset-0 rotate-[3deg] rounded-2xl bg-zinc-800" aria-hidden />
          <img src={photo.src} alt={photo.alt} className="relative -rotate-[2deg] rounded-2xl object-cover shadow-2xl" />
        </Reveal>
      )}
      <Reveal className={cn(!photo && 'text-center')}>
        <dl className={cn('grid grid-cols-2 gap-6 sm:grid-cols-4', !photo && 'mx-auto max-w-[760px]')}>
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="bg-gradient-to-b from-white to-zinc-500 bg-clip-text font-display text-[44px] font-semibold leading-none text-transparent">{s.value}</dd>
              <dd className="mt-2 text-[14.5px] text-zinc-500">{s.label}</dd>
            </div>
          ))}
        </dl>
        <div className={cn('mt-10 space-y-5 text-[17px] leading-relaxed text-zinc-300', !photo && 'mx-auto max-w-[620px]')}>
          {teamStory.map((t) => <p key={t}>{t}</p>)}
        </div>
      </Reveal>
    </div>
  );
}

function Gallery() {
  return (
    <section aria-label="Life at Crista" className="py-10">
      <div className="no-scrollbar flex snap-x gap-3 overflow-x-auto px-4 sm:px-8">
        {photos.map((p) => (
          <img key={p.src} src={p.src} alt={p.alt} className="h-[300px] w-auto shrink-0 snap-start rounded-2xl object-cover grayscale sm:h-[440px]" />
        ))}
      </div>
    </section>
  );
}

const COMMUNITY_ICONS: Record<string, LucideIcon> = { Instagram, GitHub: Github };

function Community() {
  return (
    <section className="py-24">
      <div className="container">
        <Reveal className="mx-auto max-w-[620px] text-center">
          <h2 className="text-[22px] font-semibold text-white">Stay in the loop.</h2>
          <p className="mt-1 text-[19px] leading-relaxed text-zinc-500">Follow along to see what we are building and how we work.</p>
        </Reveal>
        <div className="mx-auto mt-12 grid max-w-[1000px] gap-5 md:grid-cols-2">
          {community.map((c) => {
            const Icon = COMMUNITY_ICONS[c.name] ?? ArrowUpRight;
            return (
              <Reveal key={c.name}>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener"
                  className="group block rounded-2xl bg-[#111113] p-7 ring-1 ring-white/[0.06] transition-colors hover:bg-[#151518]"
                >
                  <span className="flex items-center gap-3 text-[22px] font-medium text-white">
                    <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
                    {c.name}
                  </span>
                  <p className="mt-4 text-[15.5px] leading-relaxed text-zinc-400">{c.body}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-[15px] font-semibold text-white">
                    {c.cta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </a>
              </Reveal>
            );
          })}
        </div>
        <p className="mt-10 text-center text-[14.5px] text-zinc-500">
          Questions about working here? <Link to="/contact" className="text-zinc-300 underline decoration-white/20 underline-offset-4 hover:text-white">Contact us</Link>
        </p>
      </div>
    </section>
  );
}

/** Fixed dash navigation on the left (desktop only). */
function SectionRail() {
  const [active, setActive] = useState('top');
  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <nav aria-label="On this page" className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 rounded-2xl bg-[#0F0F11]/90 px-3 py-5 ring-1 ring-white/[0.05] backdrop-blur 2xl:block">
      <ul className="space-y-1">
        {SECTIONS.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              onClick={(e) => { e.preventDefault(); scrollToId(s.id); }}
              aria-label={s.label}
              aria-current={active === s.id ? 'true' : undefined}
              className="group relative flex h-7 w-9 items-center justify-center"
            >
              <span className={cn('h-[2px] rounded-full transition-all', active === s.id ? 'w-3.5 bg-white' : 'w-2.5 bg-zinc-600 group-hover:bg-zinc-400')} />
              <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-lg bg-[#18181B] px-2.5 py-1 text-[12.5px] text-zinc-300 opacity-0 ring-1 ring-white/10 transition-opacity group-hover:opacity-100">
                {s.label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
