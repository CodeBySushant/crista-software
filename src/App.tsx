import { lazy, Suspense, type ComponentType } from 'react';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { MainLayout } from '@/layouts/MainLayout';
import Home from '@/pages/Home';

// Route-level code splitting keeps the first load small.
// lazyPage() behaves like React.lazy, but once preloaded it renders synchronously,
// which lets the browser attach to the pre-rendered HTML without re-drawing it.
type PageModule<P> = { default: ComponentType<P> };
function lazyPage<P extends object>(factory: () => Promise<PageModule<P>>) {
  let Loaded: ComponentType<P> | null = null;
  const load = () => factory().then((m) => ((Loaded = m.default), m));
  const Lazy = lazy(load) as unknown as ComponentType<P>;
  const Page = (props: P) => (Loaded ? <Loaded {...props} /> : <Lazy {...props} />);
  Page.preload = load;
  return Page;
}

const Services = lazyPage(() => import('@/pages/Services'));
const ServiceDetails = lazyPage(() => import('@/pages/ServiceDetails'));
const Products = lazyPage(() => import('@/pages/Products'));
const ProductDetails = lazyPage(() => import('@/pages/ProductDetails'));
const Portfolio = lazyPage(() => import('@/pages/Portfolio'));
const CaseStudy = lazyPage(() => import('@/pages/CaseStudy'));
const About = lazyPage(() => import('@/pages/About'));
const Careers = lazyPage(() => import('@/pages/Careers'));
const Contact = lazyPage(() => import('@/pages/Contact'));
const Legal = lazyPage(() => import('@/pages/Legal'));
const NotFound = lazyPage(() => import('@/pages/NotFound'));

/** Loads the code for the page at `pathname` before the app starts. */
export function preloadRoute(pathname: string): Promise<unknown> {
  const [first, second] = pathname.split('/').filter(Boolean);
  if (!first) return Promise.resolve(); // Home ships with the main bundle
  const pages: Record<string, { preload: () => Promise<unknown> }> = {
    services: second ? ServiceDetails : Services,
    products: second ? ProductDetails : Products,
    work: second ? CaseStudy : Portfolio,
    about: About,
    careers: Careers,
    contact: Contact,
    privacy: Legal,
    terms: Legal,
  };
  const nested = ['services', 'products', 'work'].includes(first);
  const page = (second && !nested) || !pages[first] ? NotFound : pages[first];
  return page.preload();
}

// Hash routing is only used for the single-file preview build.
const Router = import.meta.env.VITE_ROUTER === 'hash' ? HashRouter : BrowserRouter;

/** Routes and providers, without a router (the browser and the pre-renderer each supply one). */
export function AppShell() {
  return (
    <MotionConfig reducedMotion="user">
        <Suspense fallback={<div className="min-h-screen" />}>
          <Routes>
            <Route element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="services" element={<Services />} />
              <Route path="services/:slug" element={<ServiceDetails />} />
              <Route path="products" element={<Products />} />
              <Route path="products/:slug" element={<ProductDetails />} />
              <Route path="work" element={<Portfolio />} />
              <Route path="work/:slug" element={<CaseStudy />} />
              <Route path="about" element={<About />} />
              <Route path="careers" element={<Careers />} />
              <Route path="contact" element={<Contact />} />
              <Route path="privacy" element={<Legal kind="privacy" />} />
              <Route path="terms" element={<Legal kind="terms" />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
    </MotionConfig>
  );
}

export default function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppShell />
    </Router>
  );
}
