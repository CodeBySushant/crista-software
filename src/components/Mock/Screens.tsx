/**
 * Hand-built interface demonstrations. These are illustrative UI, not
 * screenshots of shipped software — every use is labelled as such.
 * Drawn at a fixed canvas size and scaled by <ScaledCanvas>.
 */
import { cn } from '@/utils/cn';

const G = 'linear-gradient(110deg,#22C55E 0%,#10B981 48%,#06B6D4 100%)';

function Bar({ w, className }: { w: string; className?: string }) {
  return <div className={cn('h-2 rounded-full bg-[#EEF0EF]', className)} style={{ width: w }} />;
}

function Sidebar({ items, active = 0, title }: { items: string[]; active?: number; title: string }) {
  return (
    <div className="flex h-full w-[190px] shrink-0 flex-col border-r border-line bg-paper-off px-3 py-4">
      <div className="mb-5 flex items-center gap-2 px-2">
        <div className="h-5 w-5 rounded-md" style={{ background: G }} />
        <span className="text-[13px] font-semibold tracking-tight text-ink">{title}</span>
      </div>
      {items.map((it, i) => (
        <div key={it} className={cn('mb-0.5 flex items-center gap-2.5 rounded-md px-2 py-1.5 text-[12px]', i === active ? 'bg-white font-medium text-ink shadow-soft ring-1 ring-line' : 'text-muted')}>
          <span className={cn('h-3 w-3 rounded-[4px]', i === active ? 'bg-ink' : 'bg-[#DADDDB]')} />
          {it}
        </div>
      ))}
      <div className="mt-auto rounded-lg border border-line bg-white p-3">
        <Bar w="70%" />
        <Bar w="45%" className="mt-2" />
      </div>
    </div>
  );
}

/* ---------- Web: operations dashboard ---------- */
export function WebScreen() {
  const pts = [38, 44, 40, 52, 49, 61, 58, 70, 66, 78, 74, 86];
  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${i * 44} ${110 - p}`).join(' ');
  return (
    <div className="flex h-full bg-white">
      <Sidebar title="Northwind Ops" items={['Overview', 'Orders', 'Customers', 'Inventory', 'Reports', 'Settings']} />
      <div className="flex-1 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] text-muted">Overview</p>
            <p className="text-[19px] font-semibold tracking-tight text-ink">Good morning, Priya</p>
          </div>
          <div className="flex gap-2">
            <div className="h-8 w-40 rounded-md border border-line bg-paper-off" />
            <div className="flex h-8 items-center rounded-md bg-ink px-3 text-[11px] font-medium text-white">New order</div>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-4 gap-3">
          {[['Open orders', '128'], ['Dispatched', '342'], ['Pending invoices', '19'], ['Low stock', '7']].map(([l, v], i) => (
            <div key={l} className="rounded-lg border border-line p-3">
              <p className="text-[10.5px] text-muted">{l}</p>
              <p className="mt-1 text-[20px] font-semibold tracking-tight text-ink">{v}</p>
              <div className="mt-2 h-1 rounded-full bg-[#EEF0EF]">
                <div className="h-1 rounded-full" style={{ width: `${[64, 82, 30, 18][i]}%`, background: i === 0 ? G : '#17191C' }} />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-5 gap-3">
          <div className="col-span-3 rounded-lg border border-line p-4">
            <div className="flex items-center justify-between">
              <p className="text-[12px] font-medium text-ink">Fulfilment, last 12 weeks</p>
              <div className="flex gap-1 text-[10px] text-muted"><span className="rounded bg-paper-grey px-1.5 py-0.5 text-ink">12W</span><span className="px-1.5 py-0.5">6M</span></div>
            </div>
            <svg viewBox="0 0 484 120" className="mt-3 h-[150px] w-full">
              <defs>
                <linearGradient id="wfill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#10B981" stopOpacity=".18" /><stop offset="1" stopColor="#10B981" stopOpacity="0" /></linearGradient>
                <linearGradient id="wline" x1="0" x2="1"><stop offset="0" stopColor="#22C55E" /><stop offset="1" stopColor="#06B6D4" /></linearGradient>
              </defs>
              {[0, 1, 2, 3].map((r) => <line key={r} x1="0" x2="484" y1={10 + r * 33} y2={10 + r * 33} stroke="#EEF0EF" />)}
              <path d={`${path} L 484 120 L 0 120 Z`} fill="url(#wfill)" />
              <path d={path} fill="none" stroke="url(#wline)" strokeWidth="2.2" />
            </svg>
          </div>
          <div className="col-span-2 rounded-lg border border-line p-4">
            <p className="text-[12px] font-medium text-ink">Recent orders</p>
            {['#4821 · Ready', '#4820 · Packed', '#4819 · In transit', '#4818 · Delivered', '#4817 · Delivered'].map((r, i) => (
              <div key={r} className="flex items-center justify-between border-b border-line/70 py-2 text-[11px] last:border-0">
                <span className="text-ink">{r.split(' · ')[0]}</span>
                <span className={cn('rounded-full px-2 py-0.5 text-[10px]', i < 2 ? 'bg-emerald-50 text-emerald-700' : 'bg-paper-grey text-muted')}>{r.split(' · ')[1]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- ERP: modules + table ---------- */
export function ErpScreen() {
  return (
    <div className="flex h-full bg-white">
      <Sidebar title="Operations" active={2} items={['Dashboard', 'Sales', 'Inventory', 'Purchasing', 'Billing', 'Staff', 'Audit log']} />
      <div className="flex-1 p-6">
        <div className="flex items-center justify-between">
          <p className="text-[19px] font-semibold tracking-tight text-ink">Inventory</p>
          <div className="flex gap-2 text-[11px]">
            {['All', 'Low stock', 'Reorder'].map((t, i) => <span key={t} className={cn('rounded-full px-3 py-1', i === 0 ? 'bg-ink text-white' : 'border border-line text-muted')}>{t}</span>)}
          </div>
        </div>
        <div className="mt-5 overflow-hidden rounded-lg border border-line">
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] bg-paper-off px-4 py-2 text-[10.5px] font-medium uppercase tracking-wider text-muted">
            <span>Item</span><span>SKU</span><span>On hand</span><span>Location</span><span>Status</span>
          </div>
          {[
            ['Steel bracket 40mm', 'SB-040', '1,240', 'WH-A', 'ok'],
            ['Panel housing', 'PH-112', '86', 'WH-B', 'low'],
            ['Driver unit 24V', 'DU-024', '412', 'WH-A', 'ok'],
            ['Mounting clip', 'MC-007', '18', 'WH-C', 'reorder'],
            ['Cable set 2m', 'CS-200', '930', 'WH-A', 'ok'],
            ['Diffuser cover', 'DC-310', '264', 'WH-B', 'ok'],
            ['End cap', 'EC-015', '41', 'WH-C', 'low'],
            ['Wall plate', 'WP-220', '588', 'WH-A', 'ok'],
            ['Junction box', 'JB-090', '132', 'WH-B', 'ok'],
            ['Sensor module', 'SM-401', '9', 'WH-C', 'reorder'],
            ['Lens kit', 'LK-075', '317', 'WH-A', 'ok'],
          ].map((r) => (
            <div key={r[1]} className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] items-center border-t border-line px-4 py-2.5 text-[11.5px] text-ink">
              <span className="font-medium">{r[0]}</span><span className="font-mono text-muted">{r[1]}</span><span>{r[2]}</span><span className="text-muted">{r[3]}</span>
              <span><span className={cn('rounded-full px-2 py-0.5 text-[10px]', r[4] === 'ok' && 'bg-emerald-50 text-emerald-700', r[4] === 'low' && 'bg-amber-50 text-amber-700', r[4] === 'reorder' && 'bg-rose-50 text-rose-700')}>{r[4] === 'ok' ? 'In stock' : r[4] === 'low' ? 'Low' : 'Reorder'}</span></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- AI: grounded assistant ---------- */
export function AiScreen() {
  return (
    <div className="grid h-full grid-cols-[1fr_300px] bg-white">
      <div className="flex flex-col p-6">
        <p className="text-[11px] text-muted">Knowledge assistant · Policies & SOPs</p>
        <div className="mt-4 space-y-4">
          <div className="ml-auto max-w-[70%] rounded-2xl rounded-br-md bg-ink px-4 py-2.5 text-[12.5px] text-white">What is the approval limit for a purchase order without a director sign-off?</div>
          <div className="max-w-[86%] rounded-2xl rounded-bl-md border border-line bg-paper-off px-4 py-3 text-[12.5px] leading-relaxed text-ink">
            Purchase orders up to the department threshold need only a manager approval. Anything above it requires director sign-off, and capital items always do.
            <div className="mt-3 flex flex-wrap gap-1.5">
              {['Procurement SOP §4.2', 'Finance policy v3'].map((s) => (
                <span key={s} className="inline-flex items-center gap-1 rounded-md bg-white px-2 py-1 font-mono text-[10px] text-muted ring-1 ring-line"><span className="h-1.5 w-1.5 rounded-full" style={{ background: G }} />{s}</span>
              ))}
            </div>
          </div>
          <div className="ml-auto max-w-[60%] rounded-2xl rounded-br-md bg-ink px-4 py-2.5 text-[12.5px] text-white">Draft the request for the new scanners.</div>
          <div className="flex items-center gap-2 text-[11px] text-muted"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-emerald" />Drafting from template “PO request”…</div>
        </div>
        <div className="mt-auto flex h-11 items-center rounded-xl border border-line px-4 text-[12px] text-muted">Ask about a policy, process or document…</div>
      </div>
      <div className="border-l border-line bg-paper-off p-5">
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted">Pipeline</p>
        {[['Ingest', 'PDF, DOCX, Wiki'], ['Chunk & embed', 'Vector index'], ['Retrieve', 'Top-k with filters'], ['Generate', 'Cited answer'], ['Review', 'Human approval']].map(([t, d], i) => (
          <div key={t} className="relative mt-3 flex gap-3">
            <div className="flex flex-col items-center">
              <span className={cn('grid h-6 w-6 place-items-center rounded-full font-mono text-[10px]', i < 4 ? 'text-white' : 'bg-white text-muted ring-1 ring-line')} style={i < 4 ? { background: i === 3 ? G : '#17191C' } : undefined}>{i + 1}</span>
              {i < 4 && <span className="h-7 w-px bg-line" />}
            </div>
            <div>
              <p className="text-[12px] font-medium text-ink">{t}</p>
              <p className="text-[10.5px] text-muted">{d}</p>
            </div>
          </div>
        ))}
        <div className="mt-5 rounded-lg border border-line bg-white p-3">
          <p className="text-[10.5px] text-muted">Answers with sources</p>
          <div className="mt-2 h-1.5 rounded-full bg-[#EEF0EF]"><div className="h-1.5 w-[92%] rounded-full" style={{ background: G }} /></div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Design: canvas + tokens ---------- */
export function DesignScreen() {
  return (
    <div className="grid h-full grid-cols-[1fr_230px] bg-[#F4F5F4]">
      <div className="relative overflow-hidden p-8" style={{ backgroundImage: 'radial-gradient(#D9DCDA 1px, transparent 1px)', backgroundSize: '16px 16px' }}>
        <p className="mb-2 font-mono text-[10px] text-muted">Checkout / Mobile</p>
        <div className="flex gap-6">
          {[0, 1, 2].map((f) => (
            <div key={f} className={cn('w-[168px] rounded-[20px] bg-white p-3 shadow-soft', f === 1 && 'ring-2 ring-brand-cyan')}>
              <Bar w="50%" className="mb-3 bg-ink/80" />
              <div className="h-[86px] rounded-xl bg-paper-grey" />
              <Bar w="80%" className="mt-3" /><Bar w="60%" className="mt-1.5" />
              <div className="mt-3 space-y-1.5">{[0, 1, 2].map((r) => <div key={r} className="h-7 rounded-lg border border-line" />)}</div>
              <div className="mt-3 h-8 rounded-full" style={{ background: f === 1 ? G : '#17191C' }} />
            </div>
          ))}
        </div>
        <div className="absolute left-[262px] top-[60px] rounded bg-brand-cyan px-1.5 py-0.5 font-mono text-[9px] text-white">168 × 340</div>
        <svg className="absolute left-[200px] top-[300px]" width="60" height="40"><path d="M2 2 C 30 2, 30 38, 58 38" stroke="#06B6D4" strokeWidth="1.5" fill="none" strokeDasharray="3 3" /></svg>
      </div>
      <div className="border-l border-line bg-white p-4">
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted">Tokens</p>
        <div className="mt-3 grid grid-cols-5 gap-1.5">
          {['#17191C', '#3A3F45', '#737A80', '#E5E7EB', '#F8FAF9', '#22C55E', '#10B981', '#06B6D4', '#FFFFFF', '#F1F3F2'].map((c) => <span key={c} className="h-7 rounded-md ring-1 ring-black/5" style={{ background: c }} />)}
        </div>
        <p className="mt-5 font-mono text-[10px] uppercase tracking-widest text-muted">Type</p>
        {[['Display', 28], ['Heading', 20], ['Body', 14], ['Caption', 11]].map(([l, s]) => (
          <div key={l} className="mt-2 flex items-baseline justify-between border-b border-line pb-1.5">
            <span className="font-display font-medium text-ink" style={{ fontSize: Number(s) * 0.8 }}>{l}</span>
            <span className="font-mono text-[10px] text-muted">{s}px</span>
          </div>
        ))}
        <p className="mt-5 font-mono text-[10px] uppercase tracking-widest text-muted">Components</p>
        <div className="mt-2 space-y-1.5 text-[11px] text-ink">{['Button', 'Input', 'Sheet', 'Tabs'].map((c) => <div key={c} className="flex items-center gap-2"><span className="h-2.5 w-2.5 rotate-45 rounded-[2px] border border-[#7C3AED]/60" />{c}</div>)}</div>
      </div>
    </div>
  );
}

/* ---------- Cloud: CI/CD pipeline ---------- */
export function CloudScreen() {
  const stages = [['Commit', 'main · a3f9c1e', 'done'], ['Test', '214 passed', 'done'], ['Build', 'docker image', 'done'], ['Staging', 'healthy', 'done'], ['Production', 'rolling 2/4', 'run']];
  return (
    <div className="flex h-full flex-col bg-ink-900 p-6 text-white">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-mono text-[10.5px] text-white/40">deployments / api-service</p>
          <p className="text-[18px] font-semibold tracking-tight">Release v2.14.0</p>
        </div>
        <span className="rounded-full bg-emerald-400/10 px-3 py-1 font-mono text-[10.5px] text-emerald-300 ring-1 ring-emerald-400/30">● deploying</span>
      </div>
      <div className="mt-6 flex items-center">
        {stages.map(([t, d, s], i) => (
          <div key={t} className="flex flex-1 items-center">
            <div className="flex-1 rounded-lg border border-white/10 bg-white/[0.03] p-3">
              <div className="flex items-center gap-2">
                <span className={cn('h-2 w-2 rounded-full', s === 'done' ? 'bg-emerald-400' : 'animate-pulse bg-cyan-400')} />
                <span className="text-[12px] font-medium">{t}</span>
              </div>
              <p className="mt-1 font-mono text-[10px] text-white/45">{d}</p>
            </div>
            {i < stages.length - 1 && <div className="h-px w-4" style={{ background: G }} />}
          </div>
        ))}
      </div>
      <div className="mt-5 grid flex-1 grid-cols-3 gap-4">
        <div className="col-span-2 rounded-lg border border-white/10 bg-black/30 p-4 font-mono text-[11px] leading-[1.75] text-white/60">
          <p><span className="text-emerald-300">✓</span> lint &amp; typecheck <span className="text-white/30">12.4s</span></p>
          <p><span className="text-emerald-300">✓</span> unit + integration tests <span className="text-white/30">48.1s</span></p>
          <p><span className="text-emerald-300">✓</span> docker build api-service:2.14.0 <span className="text-white/30">31.7s</span></p>
          <p><span className="text-emerald-300">✓</span> migrate staging db <span className="text-white/30">3.2s</span></p>
          <p><span className="text-emerald-300">✓</span> smoke tests staging <span className="text-white/30">9.8s</span></p>
          <p><span className="text-cyan-300">›</span> rolling update production 2/4 replicas</p>
          <p className="text-white/35">  health check /readyz … 200 OK</p>
          <p className="text-white/35">  waiting for replica 3 <span className="animate-pulse">▍</span></p>
        </div>
        <div className="space-y-3">
          {[['p95 latency', '182 ms', 62], ['Error rate', '0.02%', 8], ['CPU', '41%', 41]].map(([l, v, w]) => (
            <div key={l as string} className="rounded-lg border border-white/10 p-3">
              <div className="flex justify-between text-[10.5px] text-white/45"><span>{l}</span><span className="text-white">{v}</span></div>
              <div className="mt-2 h-1 rounded-full bg-white/10"><div className="h-1 rounded-full" style={{ width: `${w}%`, background: G }} /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Mobility intelligence: demand map ---------- */
export function MobilityScreen() {
  const cols = 22, rows = 14;
  const heat = (x: number, y: number) => {
    const d1 = Math.hypot(x - 7, y - 5), d2 = Math.hypot(x - 15, y - 9), d3 = Math.hypot(x - 18, y - 3);
    return Math.max(0, 1 - d1 / 5) * 0.95 + Math.max(0, 1 - d2 / 4) * 0.8 + Math.max(0, 1 - d3 / 3) * 0.5;
  };
  return (
    <div className="grid h-full grid-cols-[1fr_250px] bg-white">
      <div className="relative bg-[#F3F5F4] p-5">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[13px] font-semibold text-ink">Demand by zone · Weekday evenings</p>
          <span className="rounded-full bg-white px-2.5 py-1 font-mono text-[10px] text-muted ring-1 ring-line">Concept preview</span>
        </div>
        <div className="grid gap-[3px]" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
          {Array.from({ length: cols * rows }).map((_, i) => {
            const x = i % cols, y = Math.floor(i / cols); const h = Math.min(1, heat(x, y));
            return <div key={i} className="aspect-square rounded-[3px]" style={{ background: h > 0.08 ? `rgba(16,185,129,${0.12 + h * 0.85})` : '#E6E9E7' }} />;
          })}
        </div>
        <div className="mt-3 flex items-center gap-2 font-mono text-[10px] text-muted">Low<div className="h-1.5 w-24 rounded-full" style={{ background: 'linear-gradient(90deg,#E6E9E7,#10B981)' }} />High</div>
      </div>
      <div className="border-l border-line p-5">
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted">Top zones</p>
        {['Zone A · Airport corridor', 'Zone B · Business district', 'Zone C · Rail terminus', 'Zone D · University belt'].map((z, i) => (
          <div key={z} className="mt-3">
            <div className="flex justify-between text-[11.5px] text-ink"><span>{z}</span></div>
            <div className="mt-1.5 h-1.5 rounded-full bg-[#EEF0EF]"><div className="h-1.5 rounded-full" style={{ width: `${90 - i * 17}%`, background: i === 0 ? G : '#17191C' }} /></div>
          </div>
        ))}
        <div className="mt-6 rounded-lg border border-line bg-paper-off p-3 text-[11px] leading-relaxed text-ink">
          <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-muted">Insight</p>
          Evening demand concentrates around transit hubs. Consider shifting campaign spend toward Zones A and C.
        </div>
      </div>
    </div>
  );
}

/* ---------- Generic demonstration product ---------- */
export function DemoProductScreen({ label }: { label: string }) {
  return (
    <div className="flex h-full bg-white">
      <Sidebar title={label} items={['Home', 'Module', 'Module', 'Module', 'Settings']} />
      <div className="flex-1 p-6">
        <div className="flex items-center justify-between">
          <Bar w="180px" className="h-3 bg-ink/80" />
          <span className="rounded-full border border-dashed border-amber-400 bg-amber-50 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-amber-700">Demonstration</span>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-3">{[0, 1, 2].map((i) => <div key={i} className="h-24 rounded-lg border border-line bg-paper-off p-3"><Bar w="50%" /><Bar w="30%" className="mt-6 h-4 bg-[#E3E6E4]" /></div>)}</div>
        <div className="mt-4 h-[230px] rounded-lg border border-line p-4">
          <Bar w="30%" />
          <div className="mt-6 flex h-[150px] items-end gap-3">{[40, 65, 50, 80, 60, 90, 72, 55, 84, 68].map((h, i) => <div key={i} className="flex-1 rounded-t-md" style={{ height: `${h}%`, background: i === 5 ? G : '#E3E6E4' }} />)}</div>
        </div>
      </div>
    </div>
  );
}

/* ---------- ResumeCraft: split editor ---------- */
export function ResumeScreen() {
  return (
    <div className="grid h-full grid-cols-2 bg-paper-off">
      <div className="border-r border-line bg-white p-6">
        <p className="text-[11px] text-muted">Section · Experience</p>
        {['Job title', 'Company', 'Dates'].map((f) => (
          <div key={f} className="mt-3"><p className="mb-1 text-[10.5px] text-muted">{f}</p><div className="h-8 rounded-md border border-line" /></div>
        ))}
        <p className="mb-1 mt-3 text-[10.5px] text-muted">Highlights</p>
        <div className="space-y-1.5 rounded-md border border-line p-3"><Bar w="92%" /><Bar w="78%" /><Bar w="85%" /></div>
        <div className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50/60 p-3 text-[11px] leading-relaxed text-ink">
          <p className="mb-1 font-mono text-[9.5px] uppercase tracking-widest text-emerald-700">Suggestion</p>
          Lead with the result, then the action. Keep each bullet to one line.
          <div className="mt-2 flex gap-2"><span className="rounded bg-ink px-2 py-0.5 text-[10px] text-white">Apply</span><span className="rounded px-2 py-0.5 text-[10px] text-muted ring-1 ring-line">Dismiss</span></div>
        </div>
      </div>
      <div className="p-6">
        <div className="mx-auto h-full w-[78%] bg-white p-6 shadow-lift">
          <div className="h-3 w-1/2 rounded bg-ink" /><div className="mt-2 h-1.5 w-2/3 rounded bg-[#D9DCDA]" />
          <div className="mt-2 h-[2px] w-10" style={{ background: G }} />
          {[0, 1, 2].map((s) => (
            <div key={s} className="mt-5">
              <div className="h-2 w-1/4 rounded bg-ink/70" />
              <div className="mt-2 space-y-1.5"><Bar w="95%" className="h-1.5" /><Bar w="88%" className="h-1.5" /><Bar w="70%" className="h-1.5" /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Phone screens ---------- */
export function MobileAppScreen() {
  return (
    <div className="flex h-full flex-col bg-paper-off px-4 pb-4">
      <p className="mt-2 text-[11px] text-muted">Tuesday</p>
      <p className="text-[21px] font-semibold tracking-tight text-ink">Today’s jobs</p>
      <div className="mt-3 flex gap-1.5 text-[10.5px]">{['All', 'Pending', 'Done'].map((t, i) => <span key={t} className={cn('rounded-full px-3 py-1', i === 0 ? 'bg-ink text-white' : 'bg-white text-muted ring-1 ring-line')}>{t}</span>)}</div>
      <div className="mt-3 space-y-2">
        {[['Site inspection', '09:30 · Sector 18', 'live'], ['Install & handover', '12:00 · Ring Road', ''], ['Service visit', '15:15 · Old Town', ''], ['Quote follow-up', '17:00 · Remote', '']].map(([t, d, s]) => (
          <div key={t} className="rounded-2xl bg-white p-3 shadow-soft ring-1 ring-line/70">
            <div className="flex items-center justify-between"><p className="text-[12.5px] font-medium text-ink">{t}</p>{s && <span className="h-2 w-2 rounded-full" style={{ background: G }} />}</div>
            <p className="mt-0.5 text-[10.5px] text-muted">{d}</p>
          </div>
        ))}
      </div>
      <div className="mt-auto flex h-11 items-center justify-center rounded-full text-[12px] font-medium text-ink" style={{ background: G }}>Start next job</div>
    </div>
  );
}

export function CabsScreen() {
  return (
    <div className="relative h-full bg-[#EDF1EF]">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 280 560" preserveAspectRatio="none">
        <path d="M0 120 L280 180 M0 300 L280 250 M80 0 L120 560 M200 0 L170 560 M0 420 L280 460" stroke="#fff" strokeWidth="10" />
        <path d="M100 330 C 130 280, 150 240, 185 170" stroke="#17191C" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <circle cx="100" cy="330" r="7" fill="#17191C" /><circle cx="185" cy="170" r="7" fill="#10B981" stroke="#fff" strokeWidth="3" />
      </svg>
      <div className="absolute inset-x-0 bottom-0 rounded-t-3xl bg-white p-4 shadow-lift">
        <div className="mx-auto mb-3 h-1 w-9 rounded-full bg-line" />
        <p className="text-[15px] font-semibold text-ink">Choose a ride</p>
        {[['Shared', '2 seats left'], ['Mini', '4 min away'], ['Sedan', '6 min away']].map(([t, d], i) => (
          <div key={t} className={cn('mt-2 flex items-center justify-between rounded-xl p-2.5', i === 0 ? 'ring-2 ring-brand-emerald' : 'ring-1 ring-line')}>
            <div className="flex items-center gap-2.5"><div className="h-7 w-10 rounded-md bg-paper-grey" /><div><p className="text-[12px] font-medium text-ink">{t}</p><p className="text-[10px] text-muted">{d}</p></div></div>
            <div className="h-2 w-10 rounded-full bg-[#E3E6E4]" />
          </div>
        ))}
        <div className="mt-3 flex h-10 items-center justify-center rounded-full bg-ink text-[12px] font-medium text-white">Confirm Shared</div>
      </div>
    </div>
  );
}

export function MusicScreen() {
  return (
    <div className="flex h-full flex-col px-5 pb-6 text-white">
      <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-widest text-white/40">Mood · Focus</p>
      <div className="mx-auto mt-5 aspect-square w-full rounded-3xl" style={{ background: 'radial-gradient(120% 120% at 20% 10%, #22C55E 0%, #0E7C6B 40%, #0B3B44 70%, #0E1012 100%)' }} />
      <p className="mt-5 text-[17px] font-semibold tracking-tight">Deep Work, Vol. 2</p>
      <p className="text-[12px] text-white/50">Focus collection</p>
      <div className="mt-5 h-1 rounded-full bg-white/15"><div className="h-1 w-[38%] rounded-full" style={{ background: G }} /></div>
      <div className="mt-1.5 flex justify-between font-mono text-[9.5px] text-white/40"><span>1:24</span><span>3:52</span></div>
      <div className="mt-auto flex items-center justify-between px-4">
        <span className="h-4 w-4 rounded-sm border-2 border-white/40" />
        <span className="h-0 w-0 border-y-[7px] border-r-[10px] border-y-transparent border-r-white/80" />
        <span className="grid h-14 w-14 place-items-center rounded-full bg-white"><span className="flex gap-1"><span className="h-4 w-1.5 rounded-sm bg-ink" /><span className="h-4 w-1.5 rounded-sm bg-ink" /></span></span>
        <span className="h-0 w-0 border-y-[7px] border-l-[10px] border-y-transparent border-l-white/80" />
        <span className="h-4 w-4 rounded-full border-2 border-white/40" />
      </div>
    </div>
  );
}

export function RentalScreen() {
  return (
    <div className="flex h-full flex-col bg-white px-4 pb-4">
      <p className="mt-2 text-[11px] text-muted">This month</p>
      <p className="text-[21px] font-semibold tracking-tight text-ink">Rent overview</p>
      <div className="mt-3 rounded-2xl bg-ink p-4 text-white">
        <p className="text-[10.5px] text-white/50">Collected</p>
        <div className="mt-2 h-1.5 rounded-full bg-white/15"><div className="h-1.5 w-[68%] rounded-full" style={{ background: G }} /></div>
        <div className="mt-3 grid grid-cols-3 text-[10px] text-white/55"><span>Paid · 17</span><span>Due · 6</span><span>Late · 2</span></div>
      </div>
      <p className="mb-1 mt-4 text-[11px] font-medium text-ink">Due soon</p>
      {[['Unit 2B', 'Due in 2 days'], ['Unit 4A', 'Due in 3 days'], ['Shop 1', 'Overdue · 4 days'], ['Unit 1C', 'Due in 6 days']].map(([u, d], i) => (
        <div key={u} className="flex items-center justify-between border-b border-line py-2.5">
          <div className="flex items-center gap-2.5"><div className="grid h-8 w-8 place-items-center rounded-full bg-paper-grey text-[10px] font-medium text-ink">{u.split(' ')[1]}</div><div><p className="text-[12px] font-medium text-ink">{u}</p><p className={cn('text-[10px]', i === 2 ? 'text-rose-600' : 'text-muted')}>{d}</p></div></div>
          <span className="rounded-full px-2.5 py-1 text-[10px] ring-1 ring-line">Remind</span>
        </div>
      ))}
    </div>
  );
}
