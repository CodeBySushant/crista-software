import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';
import { anchorClick } from '@/utils/scroll';

type Variant = 'primary' | 'gradient' | 'secondary' | 'ghost-dark' | 'light';
type Props = {
  to?: string;
  href?: string;
  variant?: Variant;
  size?: 'md' | 'lg';
  arrow?: boolean;
  external?: boolean;
  className?: string;
  children: ReactNode;
  type?: 'button' | 'submit';
  onClick?: () => void;
  disabled?: boolean;
};

const variants: Record<Variant, string> = {
  // Dark pill with a fine light edge
  primary: 'bg-[#161618] text-white ring-1 ring-inset ring-white/10 hover:bg-[#1F1F22] hover:ring-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,.08)]',
  // Main call to action: silver
  gradient: 'text-black bg-brand-gradient shadow-[0_8px_30px_-12px_rgba(255,255,255,.35)] hover:brightness-110',
  secondary: 'text-ink ring-1 ring-inset ring-white/15 hover:ring-white/30 hover:bg-white/[0.04]',
  'ghost-dark': 'text-white ring-1 ring-inset ring-white/15 hover:ring-white/40 hover:bg-white/5',
  light: 'bg-white text-black hover:bg-white/90',
};

export function Button({ to, href, variant = 'primary', size = 'md', arrow, external, className, children, type = 'button', onClick, disabled }: Props) {
  const cls = cn(
    'group inline-flex select-none items-center justify-center gap-2 rounded-full font-medium tracking-[-0.01em] transition-all duration-300 disabled:opacity-60',
    size === 'lg' ? 'h-12 px-6 text-[15px]' : 'h-10 px-[18px] text-sm',
    variants[variant],
    className,
  );
  const Icon = external ? ArrowUpRight : ArrowRight;
  const inner = (
    <>
      <span>{children}</span>
      {arrow && <Icon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />}
    </>
  );
  if (to) return <Link to={to} className={cls} onClick={onClick}>{inner}</Link>;
  if (href) return <a href={href} onClick={anchorClick(href)} className={cls} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>{inner}</a>;
  return <button type={type} className={cls} onClick={onClick} disabled={disabled}>{inner}</button>;
}

/** Inline text link with a sliding arrow. */
export function ArrowLink({ to, children, className, dark }: { to: string; children: ReactNode; className?: string; dark?: boolean }) {
  return (
    <Link
      to={to}
      className={cn(
        'group inline-flex items-center gap-1.5 text-sm font-medium',
        dark ? 'text-white' : 'text-ink',
        className,
      )}
    >
      <span className={cn('bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 group-hover:bg-[length:100%_1px]', dark ? 'bg-[linear-gradient(white,white)]' : 'bg-[linear-gradient(#17191C,#17191C)]')}>
        {children}
      </span>
      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
    </Link>
  );
}
