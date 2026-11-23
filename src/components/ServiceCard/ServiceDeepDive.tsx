import type { Service } from '@/data/types';
import { Mock } from '@/components/Mock/Mock';
import { Reveal } from '@/components/Motion/Reveal';
import { cn } from '@/utils/cn';

/**
 * One signature visual per service, so each detail page explains its
 * discipline in its own way instead of repeating a template.
 */
export function ServiceDeepDive({ service }: { service: Service }) {
  switch (service.slug) {
    case 'web-development':
      return <WebLayers />;
    case 'mobile-development':
      return <MobilePlatforms />;
    case 'custom-software':
      return <ModuleMap />;
    case 'ai-automation':
      return <AiLoop />;
    case 'ui-ux-design':
      return <DesignSpecimen />;
    case 'cloud-devops':
      return <CloudFlow />;
    default:
      return null;
  }
}

function Frame({ title, intro, children, dark }: { title: string; intro: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <section className={cn('py-20 lg:py-28', dark ? 'bg-inverse text-white' : 'border-y border-line bg-paper-off')}>
      <div className="container">
        <Reveal className="mb-12 grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 className={cn('h-sub text-balance sm:text-[40px] sm:leading-[1.1] lg:col-span-6', dark && 'text-white')}>{title}</h2>
          <p className={cn('lede lg:col-span-5 lg:col-start-8', dark && 'text-white/60')}>{intro}</p>
        </Reveal>
        {children}
      </div>
    </section>
  );
}

function WebLayers() {
  const layers = [
    ['Interface', 'React · Next.js · TypeScript', 'Component library, routing, accessibility, performance budget'],
    ['Edge & delivery', 'CDN · caching · SSR / static', 'Fast first load, SEO-ready pages, image optimisation'],
    ['Application API', 'Node.js · Express', 'Business rules, auth, validation, integrations'],
    ['Data', 'PostgreSQL · MongoDB', 'Modelled for reporting as well as transactions'],
  ];
  return (
    <Frame title="Four layers, each with a clear job." intro="We separate the interface, delivery, business logic and data so each can evolve without breaking the others.">
      <div className="space-y-2">
        {layers.map(([t, s, d], i) => (
          <Reveal key={t} delay={i * 0.06}>
            <div className="grid items-center gap-3 rounded-2xl bg-surface p-5 ring-1 ring-line sm:grid-cols-12 sm:p-6" style={{ marginLeft: `${i * 2}%`, marginRight: `${(3 - i) * 2}%` }}>
              <span className="font-mono text-[11px] text-muted sm:col-span-1">L{i + 1}</span>
              <span className="font-display text-[20px] font-medium tracking-tight sm:col-span-3">{t}</span>
              <span className="font-mono text-[12.5px] text-ink/80 sm:col-span-4">{s}</span>
              <span className="text-[14px] text-muted sm:col-span-4">{d}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </Frame>
  );
}

function MobilePlatforms() {
  return (
    <Frame title="One codebase. Two stores. No compromises you didn’t choose." intro="Flutter covers most products with a single codebase; Kotlin is there when a feature needs to go fully native. We explain the trade-off before you commit.">
      <div className="mx-auto grid max-w-3xl grid-cols-3 items-end gap-4 sm:gap-10">
        {(['mobile', 'cabs', 'rental'] as const).map((k, i) => (
          <Reveal key={k} delay={i * 0.08} className={cn(i === 1 && '-translate-y-6 sm:-translate-y-10')}>
            <Mock kind={k} label={false} />
          </Reveal>
        ))}
      </div>
      <div className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-line ring-1 ring-line sm:grid-cols-3">
        {[['Flutter', 'Shared UI and logic for Android and iOS.'], ['Kotlin', 'Native Android where device features demand it.'], ['Shared backend', 'One API serving apps, web and admin tools.']].map(([t, d]) => (
          <div key={t} className="bg-surface p-6"><p className="font-display text-[18px] font-medium">{t}</p><p className="mt-1 text-[14px] text-muted">{d}</p></div>
        ))}
      </div>
    </Frame>
  );
}

function ModuleMap() {
  const mods = ['Sales', 'Inventory', 'Purchasing', 'Billing', 'Staff', 'Reports', 'Customers', 'Audit'];
  return (
    <Frame title="Built module by module, on one shared core." intro="Start with the module that hurts most today. Each new module plugs into the same users, permissions and data — no re-keying between systems.">
      <div className="relative mx-auto max-w-4xl">
        <svg className="absolute inset-0 hidden h-full w-full sm:block" aria-hidden>
          {mods.map((_, i) => {
            const col = i % 4, row = Math.floor(i / 4);
            const x = 12.5 + col * 25, y = row === 0 ? 18 : 82;
            return <line key={i} x1={`${x}%`} y1={`${y}%`} x2="50%" y2="50%" stroke="#D5D9D7" strokeDasharray="4 4" />;
          })}
        </svg>
        <div className="relative grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-y-36">
          {mods.map((m, i) => (
            <Reveal key={m} delay={i * 0.04} className="rounded-xl bg-surface px-4 py-4 text-center ring-1 ring-line">
              <p className="font-mono text-[10px] text-muted">M{String(i + 1).padStart(2, '0')}</p>
              <p className="mt-1 text-[15px] font-medium">{m}</p>
            </Reveal>
          ))}
        </div>
        <div className="relative mx-auto my-6 w-full max-w-sm rounded-2xl bg-inverse p-5 text-center text-white sm:absolute sm:left-1/2 sm:top-1/2 sm:my-0 sm:-translate-x-1/2 sm:-translate-y-1/2">
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/45">Core</p>
          <p className="mt-1 font-display text-[18px] font-medium">Users · Roles · Data · API</p>
          <div className="mx-auto mt-3 h-[2px] w-12 bg-brand-gradient" />
        </div>
      </div>
    </Frame>
  );
}

function AiLoop() {
  const steps = [
    ['Pick the task', 'High-volume, well-defined, measurable.'],
    ['Collect examples', 'Real inputs and the correct outputs.'],
    ['Build & ground', 'Models connected to your data and tools.'],
    ['Evaluate', 'Score against the examples before launch.'],
    ['Review & ship', 'Humans approve where errors are costly.'],
    ['Monitor', 'Quality, cost and latency in production.'],
  ];
  return (
    <Frame dark title="Measured, grounded, reviewable." intro="AI earns its place when it is evaluated against real work. Every engagement follows the same loop, so quality is visible before and after launch.">
      <ol className="grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map(([t, d], i) => (
          <Reveal key={t} delay={i * 0.05} className="bg-inverse p-6 sm:p-8">
            <li className="list-none">
              <span className={cn('grid h-8 w-8 place-items-center rounded-full font-mono text-[11px]', i === 3 ? 'bg-brand-gradient text-ink' : 'ring-1 ring-white/25 text-white/70')}>{i + 1}</span>
              <p className="mt-6 font-display text-[20px] font-medium">{t}</p>
              <p className="mt-1.5 text-[14px] text-white/55">{d}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </Frame>
  );
}

function DesignSpecimen() {
  return (
    <Frame title="A system, not a stack of screens." intro="Tokens, type and components are defined once and shared between design and code — so the hundredth screen is as consistent as the first.">
      <div className="grid gap-5 lg:grid-cols-12">
        <Reveal className="rounded-2xl bg-surface p-6 ring-1 ring-line sm:p-8 lg:col-span-7">
          <p className="eyebrow">Type scale</p>
          {[['Display', 'text-[44px] sm:text-[56px]', '56 / 1.02'], ['Heading', 'text-[30px]', '30 / 1.1'], ['Body', 'text-[17px] font-normal', '17 / 1.6'], ['Caption', 'text-[12px] font-mono uppercase tracking-widest', '12 / 1.4']].map(([l, c, m]) => (
            <div key={l} className="flex items-baseline justify-between gap-4 border-b border-line py-4 last:border-0">
              <span className={cn('font-display font-medium tracking-tight text-ink', c)}>{l}</span>
              <span className="shrink-0 font-mono text-[11px] text-muted">{m}</span>
            </div>
          ))}
        </Reveal>
        <div className="grid gap-5 lg:col-span-5">
          <Reveal className="rounded-2xl bg-surface p-6 ring-1 ring-line sm:p-8">
            <p className="eyebrow">Colour tokens</p>
            <div className="mt-4 grid grid-cols-4 gap-2">
              {[['ink', '#17191C'], ['muted', '#737A80'], ['line', '#E5E7EB'], ['paper', '#F8FAF9'], ['green', '#F4F4F5'], ['emerald', '#D4D4D8'], ['cyan', '#A1A1AA'], ['white', '#FFFFFF']].map(([n, c]) => (
                <div key={n}><div className="h-12 rounded-lg ring-1 ring-black/5" style={{ background: c }} /><p className="mt-1.5 font-mono text-[10px] text-muted">{n}</p></div>
              ))}
            </div>
          </Reveal>
          <Reveal className="rounded-2xl bg-surface p-6 ring-1 ring-line sm:p-8">
            <p className="eyebrow">Components</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-inverse px-4 py-2 text-[13px] text-white">Primary</span>
              <span className="rounded-full px-4 py-2 text-[13px] ring-1 ring-line">Secondary</span>
              <span className="rounded-full bg-brand-gradient px-4 py-2 text-[13px]">Highlight</span>
              <span className="rounded-full bg-paper-grey px-3 py-2 font-mono text-[11px] text-muted">TAG</span>
            </div>
          </Reveal>
        </div>
      </div>
    </Frame>
  );
}

function CloudFlow() {
  return (
    <Frame dark title="Every change, tested and shipped the same way." intro="Pipelines, environments and infrastructure live in version control. Releases become routine; rollbacks take one click.">
      <Reveal><Mock kind="cloud" /></Reveal>
      <div className="mt-12 grid gap-6 sm:grid-cols-4">
        {[['Version-controlled', 'Infra and pipelines as code.'], ['Repeatable', 'Same build on every environment.'], ['Observable', 'Metrics, logs and alerts.'], ['Recoverable', 'Tested backups and rollbacks.']].map(([t, d]) => (
          <div key={t} className="border-t border-white/15 pt-4"><p className="font-display text-[17px] font-medium">{t}</p><p className="mt-1 text-[14px] text-white/55">{d}</p></div>
        ))}
      </div>
    </Frame>
  );
}
