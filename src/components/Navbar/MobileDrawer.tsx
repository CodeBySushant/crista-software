import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ChevronDown, X } from 'lucide-react';
import { mainNav, company } from '@/data/navigation';
import { serviceMenuGroups } from '@/data/services';
import { products } from '@/data/products';
import { Logo } from '@/components/Logo/Logo';
import { Button } from '@/components/Buttons/Button';
import { cn } from '@/utils/cn';

export function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [section, setSection] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  const sub: Record<string, { label: string; to: string }[]> = {
    services: [{ label: 'All services', to: '/services' }, ...serviceMenuGroups.flatMap((g) => g.items.map((i) => ({ label: i.label, to: i.to })))],
    products: [{ label: 'All products', to: '/products' }, ...products.map((p) => ({ label: p.name, to: `/products/${p.slug}` }))],
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex flex-col bg-white lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="container flex h-16 shrink-0 items-center justify-between">
            <Link to="/" onClick={onClose} aria-label="Crista Software — home"><Logo /></Link>
            <button ref={closeRef} type="button" onClick={onClose} aria-label="Close menu" className="grid h-10 w-10 place-items-center rounded-full ring-1 ring-inset ring-line">
              <X className="h-[18px] w-[18px]" aria-hidden />
            </button>
          </div>
          <nav className="container flex-1 overflow-y-auto pb-8 pt-4" aria-label="Mobile">
            <ul className="divide-y divide-line border-y border-line">
              {mainNav.map((item, i) => (
                <motion.li key={item.label} initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 * i + 0.05 }}>
                  {item.menu ? (
                    <>
                      <button
                        type="button"
                        className="flex w-full items-center justify-between py-4 text-left font-display text-[26px] font-medium tracking-tight"
                        aria-expanded={section === item.menu}
                        onClick={() => setSection((s) => (s === item.menu ? null : item.menu!))}
                      >
                        {item.label}
                        <ChevronDown className={cn('h-5 w-5 text-muted transition-transform', section === item.menu && 'rotate-180')} aria-hidden />
                      </button>
                      <AnimatePresence initial={false}>
                        {section === item.menu && (
                          <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                            {sub[item.menu].map((s) => (
                              <li key={s.label}>
                                <Link to={s.to} onClick={onClose} className="block py-2.5 pl-1 text-[16px] text-muted active:text-ink">{s.label}</Link>
                              </li>
                            ))}
                            <li className="h-3" />
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link to={item.to} onClick={onClose} className="block py-4 font-display text-[26px] font-medium tracking-tight">{item.label}</Link>
                  )}
                </motion.li>
              ))}
            </ul>
            <a href={company.parentUrl} className="mt-6 inline-flex items-center gap-1 text-[14px] text-muted">
              Part of {company.parent} <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
          </nav>
          <div className="container shrink-0 border-t border-line py-4">
            <Button to="/contact" variant="gradient" size="lg" className="w-full" arrow onClick={onClose}>Let’s Talk</Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
