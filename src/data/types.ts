/**
 * Shared content types. Everything the site renders comes from the typed
 * files in /src/data, so a CMS or API can replace them later without
 * touching components.
 */

export type MockKind =
  | 'web'
  | 'mobile'
  | 'erp'
  | 'ai'
  | 'design'
  | 'cloud'
  | 'mobility'
  | 'ledger'
  | 'campus'
  | 'resume'
  | 'cabs'
  | 'music'
  | 'rental';

export interface Service {
  slug: string;
  index: string; // "01"
  title: string;
  shortTitle: string;
  navDescription: string;
  headline: string;
  summary: string;
  capabilities: string[];
  problems: string[];
  solutions: { title: string; description: string }[];
  technologies: string[];
  approach: { title: string; description: string }[];
  mock: MockKind;
  relatedWork: string[]; // project slugs
  seo: { title: string; description: string };
}

export type ProductStatus = 'In research' | 'In development' | 'Beta' | 'Live' | 'Demonstration';

export interface Product {
  slug: string;
  name: string;
  monogram: string;
  category: string;
  tagline: string;
  description: string;
  useCase: string;
  status: ProductStatus;
  /** true = not an approved catalogue entry yet; renders a visible notice */
  draft: boolean;
  draftNote?: string;
  accent: { from: string; to: string };
  features: { title: string; description: string }[];
  featuresLabel: string; // "Key features" vs "Planned scope"
  useCases: { title: string; description: string }[];
  technical?: { label: string; value: string }[];
  mock: MockKind;
  seo: { title: string; description: string };
}

export type ProjectCategory =
  | 'Web Applications'
  | 'Mobile Applications'
  | 'SaaS Platforms'
  | 'AI-Powered Applications'
  | 'Custom Business Systems';

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  year?: string;
  summary: string;
  stack: string[];
  mock: MockKind;
  draft: boolean;
  overview: string;
  problem: string;
  objectives: string[];
  solution: string;
  designApproach: string;
  architecture: { layer: string; items: string[] }[];
  features: { title: string; description: string }[];
  /** Only populate with verified results. Empty = section hidden. */
  outcomes: string[];
  seo: { title: string; description: string };
}

export interface NavItem {
  label: string;
  to: string;
  menu?: 'services' | 'products';
}
