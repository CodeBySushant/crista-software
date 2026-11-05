import type { MockKind } from '@/data/types';
import { BrowserFrame, PhoneFrame, ScaledCanvas } from './Frames';
import * as S from './Screens';
import { cn } from '@/utils/cn';

const BROWSER = { w: 960, h: 600 };
const PHONE = { w: 300, h: 620 };

const config: Record<MockKind, { phone?: boolean; url?: string; dark?: boolean; alt: string; render: () => JSX.Element }> = {
  web: { url: 'app.northwind-ops.com', alt: 'Operations dashboard with order metrics, fulfilment chart and recent orders', render: () => <S.WebScreen /> },
  erp: { url: 'erp.internal/inventory', alt: 'Inventory module of a custom ERP system with stock status table', render: () => <S.ErpScreen /> },
  ai: { url: 'assistant.internal', alt: 'AI knowledge assistant answering a policy question with cited sources', render: () => <S.AiScreen /> },
  design: { url: 'design-system / checkout', alt: 'Design canvas with mobile checkout frames and a token panel', render: () => <S.DesignScreen /> },
  cloud: { url: 'ci.internal/deployments', dark: true, alt: 'CI/CD pipeline deploying a release with build logs and health metrics', render: () => <S.CloudScreen /> },
  mobility: { url: 'mobility-intelligence · concept', alt: 'Concept dashboard showing transport demand by zone as a heatmap', render: () => <S.MobilityScreen /> },
  ledger: { url: 'demo-product', alt: 'Placeholder interface for a demonstration product entry', render: () => <S.DemoProductScreen label="Codename Ledger" /> },
  campus: { url: 'demo-product', alt: 'Placeholder interface for a demonstration product entry', render: () => <S.DemoProductScreen label="Codename Campus" /> },
  resume: { url: 'resumecraft · editor', alt: 'Résumé editor with structured fields, writing suggestion and live preview', render: () => <S.ResumeScreen /> },
  mobile: { phone: true, alt: 'Mobile field-operations app listing today’s jobs', render: () => <S.MobileAppScreen /> },
  cabs: { phone: true, alt: 'Ride booking screen with map route and ride options', render: () => <S.CabsScreen /> },
  music: { phone: true, dark: true, alt: 'Music player screen with mood collection artwork', render: () => <S.MusicScreen /> },
  rental: { phone: true, alt: 'Rental management app showing rent collected and units due soon', render: () => <S.RentalScreen /> },
};

export const isPhoneMock = (k: MockKind) => !!config[k].phone;

/** Framed, proportionally scaled interface demonstration. */
export function Mock({ kind, className, label = true, labelSide = 'right' }: { kind: MockKind; className?: string; label?: boolean; labelSide?: 'left' | 'right' }) {
  const c = config[kind];
  const size = c.phone ? PHONE : BROWSER;
  return (
    <figure className={cn('relative', className)} role="img" aria-label={`Interface demonstration: ${c.alt}`}>
      <ScaledCanvas width={size.w} height={size.h}>
        {c.phone ? <PhoneFrame dark={c.dark}>{c.render()}</PhoneFrame> : <BrowserFrame url={c.url!} dark={c.dark}>{c.render()}</BrowserFrame>}
      </ScaledCanvas>
      {label && (
        <figcaption className={cn('pointer-events-none absolute -bottom-3 rounded-full', labelSide === 'left' ? 'left-3' : 'right-3', ' bg-white px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.12em] text-muted shadow-soft ring-1 ring-line')}>
          Interface demo
        </figcaption>
      )}
    </figure>
  );
}
