import { company } from '@/data/navigation';

/** Production address. Every canonical URL, the sitemap and social previews use it. */
export const SITE_URL = 'https://getcrista.com';
export const SITE_NAME = 'Crista Software';

export const DEFAULT_TITLE = 'Crista Software — Custom Software, Web & Mobile App Development';
export const DEFAULT_DESCRIPTION =
  'Crista Software designs and builds custom software, web platforms, mobile apps and AI automation for businesses in India and worldwide, and develops its own software products.';
export const DEFAULT_IMAGE = '/og-image.png';

export interface PageMeta {
  /** Page title without the site name. Empty for the homepage. */
  title: string;
  description: string;
  /** Path such as /services/web-development (no trailing slash). */
  path: string;
  noindex?: boolean;
  image?: string;
}

export const fullTitle = (title: string) => (title ? `${title} — ${SITE_NAME}` : DEFAULT_TITLE);
export const absoluteUrl = (path: string) => `${SITE_URL}${path === '/' ? '/' : path.replace(/\/+$/, '')}`;

/** Normalises a router pathname: no trailing slash, root stays "/". */
export const cleanPath = (p: string) => (p.length > 1 ? p.replace(/\/+$/, '') : '/');

const ORG_ID = `${SITE_URL}/#organization`;

/** schema.org data Google uses for the brand panel, sitelinks and breadcrumbs. */
export function structuredData(meta: PageMeta) {
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'Organization',
      '@id': ORG_ID,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/icon-512.png`,
      image: `${SITE_URL}${DEFAULT_IMAGE}`,
      description: DEFAULT_DESCRIPTION,
      slogan: company.tagline,
      ...(company.email ? { email: company.email } : {}),
      ...(company.phone ? { telephone: company.phone } : {}),
      parentOrganization: { '@type': 'Organization', name: company.parent, url: company.parentUrl },
      sameAs: [...company.social.map((s) => s.href), company.github],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      publisher: { '@id': ORG_ID },
      inLanguage: 'en',
    },
  ];

  const parts = meta.path.split('/').filter(Boolean);
  if (parts.length) {
    const labels: Record<string, string> = {
      services: 'Services', products: 'Products', work: 'Work', about: 'About',
      contact: 'Contact', privacy: 'Privacy Policy', terms: 'Terms and Conditions',
    };
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        ...parts.map((seg, i) => ({
          '@type': 'ListItem',
          position: i + 2,
          name: i === parts.length - 1 && meta.title ? meta.title : labels[seg] ?? seg,
          item: absoluteUrl('/' + parts.slice(0, i + 1).join('/')),
        })),
      ],
    });
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Head tags for a pre-rendered page (used at build time). */
export function headTags(meta: PageMeta) {
  const title = fullTitle(meta.title);
  const url = absoluteUrl(meta.path);
  const image = `${SITE_URL}${meta.image ?? DEFAULT_IMAGE}`;
  const tags = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    meta.noindex
      ? `<meta name="robots" content="noindex, follow" />`
      : `<meta name="robots" content="index, follow, max-image-preview:large" />`,
    meta.noindex ? '' : `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:locale" content="en_IN" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${SITE_NAME} — ${esc(company.tagline)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    meta.noindex ? '' : `<script type="application/ld+json">${JSON.stringify(structuredData(meta)).replace(/</g, '\\u003c')}</script>`,
  ];
  return tags.filter(Boolean).join('\n    ');
}
