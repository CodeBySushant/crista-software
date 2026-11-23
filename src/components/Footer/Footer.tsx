import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Logo } from '@/components/Logo/Logo';
import { company, telHref } from '@/data/navigation';

const cols = [
  {
    title: 'Services',
    links: [
      ['Web Development', '/services/web-development'],
      ['Mobile Development', '/services/mobile-development'],
      ['Custom Software', '/services/custom-software'],
      ['AI & Automation', '/services/ai-automation'],
      ['UI/UX Design', '/services/ui-ux-design'],
      ['Cloud & DevOps', '/services/cloud-devops'],
    ],
  },
  {
    title: 'Products',
    links: [
      ['All Products', '/products'],
      ['Product Categories', '/products#catalogue'],
      ['Product Enquiries', '/contact?topic=product'],
    ],
  },
  {
    title: 'Company',
    links: [
      ['About', '/about'],
      ['Our Work', '/work'],
      ['Contact', '/contact'],
    ],
  },
];

function Placeholder({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-white/40">
      {children}
      <span className="rounded border border-dashed border-white/25 px-1.5 py-px font-mono text-[9.5px] uppercase tracking-wider text-white/40">to add</span>
    </span>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-inverse text-white">
      <BrandHorizon />
      <div className="container relative pb-10 pt-16 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo dark />
            <p className="mt-6 font-display text-2xl font-medium tracking-tight">{company.tagline}</p>
            <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-white/55">
              Crista Software designs and builds digital products for businesses and develops its own software — the technology division of {company.parent}.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {company.social.length ? (
                company.social.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="rounded-full px-3 py-1.5 text-[13px] text-white/70 ring-1 ring-white/15 hover:text-white hover:ring-white/40">{s.label}</a>
                ))
              ) : (
                <span className="text-[13px]"><Placeholder>Social links</Placeholder></span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:col-span-8">
            {cols.map((c) => (
              <div key={c.title}>
                <p className="eyebrow text-white/40">{c.title}</p>
                <ul className="mt-5 space-y-3">
                  {c.links.map(([l, to]) => (
                    <li key={l}><Link to={to} className="text-[14px] text-white/70 transition-colors hover:text-white">{l}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <p className="eyebrow text-white/40">Connect</p>
              <ul className="mt-5 space-y-3 text-[14px]">
                <li>{company.email ? <a href={`mailto:${company.email}`} className="text-white/70 hover:text-white">{company.email}</a> : <Placeholder>Email</Placeholder>}</li>
                <li>{company.phone ? <a href={telHref(company.phone)} className="text-white/70 hover:text-white">{company.phone}</a> : <Placeholder>Phone</Placeholder>}</li>
                <li><a href={company.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-white/70 hover:text-white">GitHub <ArrowUpRight className="h-3.5 w-3.5" aria-hidden /></a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-20 select-none overflow-hidden" aria-hidden>
          <p className="whitespace-nowrap font-display text-[clamp(2.5rem,10.4vw,9.25rem)] font-medium leading-[0.85] tracking-tightest text-white/[0.05]">Ideas&nbsp;Into&nbsp;Impact</p>
        </div>

        <div className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-6 text-[13px] text-white/45 md:flex-row md:items-center md:justify-between">
          <p>© {year} {company.name}. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white">Terms and Conditions</Link>
            <a href={company.parentUrl} className="inline-flex items-center gap-1 hover:text-white">{company.parent} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/**
 * Giant dark "Crista" wordmark that sinks below a thin horizon line,
 * with a soft glow spilling under the line.
 */
function BrandHorizon() {
  const mask = {
    WebkitMaskImage: 'url(/brand/crista-logo-white.svg)',
    maskImage: 'url(/brand/crista-logo-white.svg)',
    WebkitMaskSize: '100% auto',
    maskSize: '100% auto',
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
    WebkitMaskPosition: 'top center',
    maskPosition: 'top center',
  } as const;
  return (
    <div className="relative bg-black" aria-hidden>
      <div className="container">
        {/* Shows the top ~72% of the wordmark; the rest is cut by the line */}
        <div className="relative mx-auto aspect-[1489/290] w-full max-w-[1240px] overflow-hidden pt-0">
          <div
            className="absolute inset-x-0 top-[12%] aspect-[1489/406] bg-gradient-to-b from-[#141414] to-[#0c0c0c]"
            style={mask}
          />
        </div>
      </div>
      {/* Horizon line */}
      <div className="h-px w-full bg-gradient-to-r from-white/[0.06] via-white/[0.16] to-white/[0.06]" />
      {/* Glow under the line */}
      <div
        className="pointer-events-none absolute inset-x-0 top-full h-40"
        style={{ background: 'radial-gradient(50% 100% at 50% 0%, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 45%, transparent 75%)' }}
      />
    </div>
  );
}
