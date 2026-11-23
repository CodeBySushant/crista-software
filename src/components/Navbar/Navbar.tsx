import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ChevronDown, Menu } from 'lucide-react';
import { mainNav, company } from '@/data/navigation';
import { Logo } from '@/components/Logo/Logo';
import { Button } from '@/components/Buttons/Button';
import { ServicesMenu, ProductsMenu } from '@/components/MegaMenu/MegaMenu';
import { MobileDrawer } from './MobileDrawer';
import { cn } from '@/utils/cn';
import { anchorClick } from '@/utils/scroll';

type MenuKey = 'services' | 'products' | null;

export function Navbar() {
  const [open, setOpen] = useState<MenuKey>(null);
  const [drawer, setDrawer] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const reduce = useReducedMotion();
  const closeTimer = useRef<number>();
  const triggers = useRef<Record<string, HTMLButtonElement | null>>({});
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(null);
    setDrawer(false);
  }, [pathname]);

  // Escape closes the menu and returns focus to its trigger.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        triggers.current[open]?.focus();
        setOpen(null);
      }
    };
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (panelRef.current?.contains(t) || Object.values(triggers.current).some((b) => b?.contains(t))) return;
      setOpen(null);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [open]);

  const hoverOpen = (k: MenuKey) => {
    window.clearTimeout(closeTimer.current);
    setOpen(k);
  };
  const hoverClose = () => {
    closeTimer.current = window.setTimeout(() => setOpen(null), 140);
  };

  const isActive = (to: string) => (to === '/' ? pathname === '/' : pathname.startsWith(to));
  const solid = scrolled || !!open;

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300',
          solid ? 'border-b border-line/80 bg-black/70 backdrop-blur-xl' : 'border-b border-transparent bg-transparent',
        )}
        onMouseLeave={hoverClose}
      >
        <a href="#main" onClick={anchorClick('#main')} className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded-md focus:bg-inverse focus:px-3 focus:py-2 focus:text-sm focus:text-white">
          Skip to content
        </a>
        <nav className="container flex h-16 items-center justify-between gap-6" aria-label="Main">
          <Link to="/" aria-label="Crista Software — home" className="shrink-0">
            <Logo />
          </Link>

          <ul className="hidden items-center gap-0.5 lg:flex">
            {mainNav.map((item) => {
              const active = isActive(item.to);
              if (item.menu) {
                const k = item.menu;
                return (
                  <li key={item.label} onMouseEnter={() => hoverOpen(k)}>
                    <button
                      ref={(el) => (triggers.current[k] = el)}
                      type="button"
                      aria-expanded={open === k}
                      aria-controls={`menu-${k}`}
                      onClick={() => setOpen((o) => (o === k ? null : k))}
                      className={cn(
                        'relative flex h-9 items-center gap-1 rounded-full px-3.5 text-[14px] transition-colors',
                        active || open === k ? 'text-ink' : 'text-muted hover:text-ink',
                      )}
                    >
                      {item.label}
                      <ChevronDown className={cn('h-3.5 w-3.5 transition-transform duration-300', open === k && 'rotate-180')} aria-hidden />
                      {active && <ActiveDot />}
                    </button>
                  </li>
                );
              }
              return (
                <li key={item.label} onMouseEnter={() => hoverOpen(null)}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={cn('relative flex h-9 items-center rounded-full px-3.5 text-[14px] transition-colors', active ? 'text-ink' : 'text-muted hover:text-ink')}
                  >
                    {item.label}
                    {active && <ActiveDot />}
                  </NavLink>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={company.parentUrl}
              className="hidden items-center gap-1 whitespace-nowrap rounded-full px-3 py-2 text-[13px] text-muted transition-colors hover:text-ink xl:inline-flex"
            >
              {company.parent}
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </a>
            <Button to="/contact" variant="gradient" className="hidden sm:inline-flex" arrow>
              Let’s Talk
            </Button>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-full ring-1 ring-inset ring-line lg:hidden"
              aria-label="Open menu"
              aria-expanded={drawer}
              onClick={() => setDrawer(true)}
            >
              <Menu className="h-[18px] w-[18px]" aria-hidden />
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              key={open}
              ref={panelRef}
              id={`menu-${open}`}
              onMouseEnter={() => hoverOpen(open)}
              initial={reduce ? false : { opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-0 top-full hidden border-b border-line bg-surface shadow-[0_30px_60px_-30px_rgba(23,25,28,.25)] lg:block"
            >
              <div className="container py-8">
                {open === 'services' ? <ServicesMenu onNavigate={() => setOpen(null)} /> : <ProductsMenu onNavigate={() => setOpen(null)} />}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence>{open && <motion.div className="fixed inset-0 z-40 hidden bg-inverse/10 lg:block" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} aria-hidden />}</AnimatePresence>

      <MobileDrawer open={drawer} onClose={() => setDrawer(false)} />
    </>
  );
}

function ActiveDot() {
  return <span className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-brand-emerald" aria-hidden />;
}
