import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Navbar } from '@/components/Navbar/Navbar';
import { Footer } from '@/components/Footer/Footer';

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) { el.scrollIntoView(); return; }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, hash]);
  return null;
}

export function MainLayout() {
  const { pathname } = useLocation();
  const reduce = useReducedMotion();
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollManager />
      <Navbar />
      <motion.main
        id="main"
        key={pathname}
        className="flex-1"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <Outlet />
      </motion.main>
      <Footer />
    </div>
  );
}
