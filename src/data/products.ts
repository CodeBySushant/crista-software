import type { Product } from './types';

/**
 * PRODUCT CATALOGUE — NOT FINAL.
 * Spec: "Do not invent products. Use actual approved products or clearly
 * marked demonstration entries until the real product catalogue is finalised."
 *
 * - `mobility-intelligence` is an internal concept in research. Its scope is
 *   listed as *planned*, not as shipped features.
 * - `codename-ledger` and `codename-campus` are DEMONSTRATION ENTRIES that
 *   exist only to show the layout. Replace or delete before launch.
 * Every entry with `draft: true` shows a visible notice on the site.
 */
export const products: Product[] = [
  {
    slug: 'mobility-intelligence',
    name: 'Mobility Intelligence',
    monogram: 'Mi',
    category: 'Transportation',
    tagline: 'Market and demand intelligence for transportation operators.',
    description:
      'An AI-assisted B2B platform concept that helps taxi operators, cab aggregators and airport-transfer services understand where demand is and where to market.',
    useCase: 'Decide where to deploy fleets and focus marketing, based on data rather than instinct.',
    status: 'In research',
    draft: true,
    draftNote: 'Working name. Product is in research — scope below is planned, not released.',
    accent: { from: '#3F3F46', to: '#18181B' },
    featuresLabel: 'Planned scope',
    features: [
      { title: 'Demand mapping', description: 'Visualise trip demand by zone and time of day.' },
      { title: 'Geo-marketing zones', description: 'Identify areas worth targeting with campaigns.' },
      { title: 'Market dashboards', description: 'Track the operator landscape in each city.' },
      { title: 'AI-assisted insights', description: 'Plain-language summaries of what changed and why.' },
    ],
    useCases: [
      { title: 'Cab aggregators', description: 'Plan city expansion and driver supply.' },
      { title: 'Taxi operators', description: 'Focus marketing spend on high-demand zones.' },
      { title: 'Airport transfers', description: 'Anticipate peaks around flight schedules.' },
    ],
    technical: [
      { label: 'Platform', value: 'Web dashboard (planned)' },
      { label: 'Target market', value: 'India' },
      { label: 'Delivery', value: 'B2B SaaS' },
    ],
    mock: 'mobility',
    seo: {
      title: 'Mobility Intelligence',
      description: 'A mobility intelligence and geo-marketing platform concept for transportation operators, in research at Crista Software.',
    },
  },
  {
    slug: 'codename-ledger',
    name: 'Codename Ledger',
    monogram: 'Le',
    category: 'Business Management',
    tagline: 'Demonstration entry — business management product slot.',
    description:
      'Placeholder showing how a business-management product will be presented. Replace with an approved product before publishing.',
    useCase: 'Layout demonstration only.',
    status: 'Demonstration',
    draft: true,
    draftNote: 'Demonstration entry. Not a real product.',
    accent: { from: '#3F3F46', to: '#18181B' },
    featuresLabel: 'Example feature slots',
    features: [
      { title: 'Feature slot one', description: 'Short description of an approved feature.' },
      { title: 'Feature slot two', description: 'Short description of an approved feature.' },
      { title: 'Feature slot three', description: 'Short description of an approved feature.' },
    ],
    useCases: [
      { title: 'Use case slot', description: 'Who the product serves and what it helps them do.' },
      { title: 'Use case slot', description: 'A second audience or scenario.' },
    ],
    mock: 'ledger',
    seo: { title: 'Codename Ledger (demo)', description: 'Demonstration product entry.' },
  },
  {
    slug: 'codename-campus',
    name: 'Codename Campus',
    monogram: 'Ca',
    category: 'Education',
    tagline: 'Demonstration entry — education product slot.',
    description:
      'Placeholder showing how an education product will be presented. Replace with an approved product before publishing.',
    useCase: 'Layout demonstration only.',
    status: 'Demonstration',
    draft: true,
    draftNote: 'Demonstration entry. Not a real product.',
    accent: { from: '#3F3F46', to: '#18181B' },
    featuresLabel: 'Example feature slots',
    features: [
      { title: 'Feature slot one', description: 'Short description of an approved feature.' },
      { title: 'Feature slot two', description: 'Short description of an approved feature.' },
      { title: 'Feature slot three', description: 'Short description of an approved feature.' },
    ],
    useCases: [
      { title: 'Use case slot', description: 'Who the product serves and what it helps them do.' },
      { title: 'Use case slot', description: 'A second audience or scenario.' },
    ],
    mock: 'campus',
    seo: { title: 'Codename Campus (demo)', description: 'Demonstration product entry.' },
  },
];

export const getProduct = (slug?: string) => products.find((p) => p.slug === slug);
export const productCategories = Array.from(new Set(products.map((p) => p.category)));
