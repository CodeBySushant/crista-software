# Crista Software — Website (frontend)

React 18 · Vite 5 · TypeScript · Tailwind CSS 3 · React Router 6 · Framer Motion · Lucide.
Frontend only: no backend, auth, database or CMS. All content comes from typed files in `src/data/`.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build → dist/
npm run preview
```

Optional single-file preview (hash routing, everything inlined): `npx vite build --mode preview-single` → `dist-preview/index.html`.

## Before launch — content to supply

Everything not provided in the brief is a visible placeholder, never invented:

| What | Where | Shown on site as |
| --- | --- | --- |
| Official Crista logo | `src/components/Logo/Logo.tsx`, `public/favicon.svg` | placeholder mark |
| Email, phone, social links, Crista Enterprises URL | `src/data/navigation.ts` → `company` | "To add" tags |
| Product catalogue | `src/data/products.ts` | "Draft listing" / "Demo entry" tags |
| Portfolio copy, stacks, real screenshots | `src/data/projects.ts` | "Draft" tags + notice |
| Verified project outcomes | `projects[].outcomes` | section hidden while empty |
| Privacy Policy / Terms text | `src/pages/Legal.tsx` | placeholder notice |

When a product or project is approved, set `draft: false` and the notices disappear.

## Structure

```
src/
  assets/fonts/        self-hosted Inter, Inter Tight, JetBrains Mono (latin, woff2)
  components/
    Navbar/            sticky nav, mega-menu triggers, mobile drawer
    MegaMenu/          Services + Products menus
    Footer/  CTA/  Buttons/  Logo/  SectionHeading/  Notice/  Motion/
    Mock/              code-drawn interface demonstrations (scale to any width)
    ServiceCard/       homepage service explorer, per-service deep-dive visuals
    ProductCard/       product showcase ("mini landing page"), glyph, status pill
    ProjectCard/       editorial project tile
    EnquiryForm/       validated form; `onSubmit` prop is the backend seam
    Sections/          page hero, process timeline, tech stack
  data/                services, products, projects, navigation (+ types)
  hooks/useDocumentMeta.ts   per-route title, description, Open Graph
  layouts/MainLayout.tsx     nav + page transition + footer
  pages/               Home, Services, ServiceDetails, Products, ProductDetails,
                       Portfolio, CaseStudy, About, Contact, Legal, NotFound
```

## Routes

`/` · `/services` · `/services/:slug` (6) · `/products` · `/products/:slug` · `/work` · `/work/:slug` · `/about` · `/contact` (`?service=` / `?topic=product` preselect) · `/privacy` · `/terms` · 404.

## Deployment note

Uses `BrowserRouter`, so the host must rewrite unknown paths to `index.html`
(Vercel/Netlify: SPA rewrite; Nginx: `try_files $uri /index.html;`).
