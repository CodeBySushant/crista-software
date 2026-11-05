import { lazy, Suspense } from 'react';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { MainLayout } from '@/layouts/MainLayout';
import Home from '@/pages/Home';

// Route-level code splitting keeps the first load small.
const Services = lazy(() => import('@/pages/Services'));
const ServiceDetails = lazy(() => import('@/pages/ServiceDetails'));
const Products = lazy(() => import('@/pages/Products'));
const ProductDetails = lazy(() => import('@/pages/ProductDetails'));
const Portfolio = lazy(() => import('@/pages/Portfolio'));
const CaseStudy = lazy(() => import('@/pages/CaseStudy'));
const About = lazy(() => import('@/pages/About'));
const Contact = lazy(() => import('@/pages/Contact'));
const Legal = lazy(() => import('@/pages/Legal'));
const NotFound = lazy(() => import('@/pages/NotFound'));

// Hash routing is only used for the single-file preview build.
const Router = import.meta.env.VITE_ROUTER === 'hash' ? HashRouter : BrowserRouter;

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
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
              <Route path="contact" element={<Contact />} />
              <Route path="privacy" element={<Legal kind="privacy" />} />
              <Route path="terms" element={<Legal kind="terms" />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </MotionConfig>
  );
}
