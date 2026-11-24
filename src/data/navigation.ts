import type { NavItem } from './types';

export const mainNav: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services', menu: 'services' },
  { label: 'Products', to: '/products', menu: 'products' },
  { label: 'Work', to: '/work' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

/**
 * Business details.
 */
export const company = {
  name: 'Crista Software',
  parent: 'Crista Enterprises',
  parentUrl: 'https://www.cristaenterprises.com',
  tagline: 'Ideas Into Impact.',
  email: 'contact@getcrista.com' as string | null,
  phone: '+91 7857994690' as string | null,
  github: 'https://github.com/CodeBySushant',
  social: [
    { label: 'Instagram', href: 'https://instagram.com/cristaenterprises' },
  ] as { label: string; href: string }[],
};

export const technologyGroups = [
  { label: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'HTML', 'CSS'] },
  { label: 'Backend', items: ['Node.js', 'Express', 'Java', 'Spring Boot'] },
  { label: 'Mobile', items: ['Flutter', 'Dart', 'Kotlin'] },
  { label: 'Databases', items: ['PostgreSQL', 'MongoDB', 'MySQL', 'Supabase'] },
  { label: 'AI & Data', items: ['Python', 'Machine Learning', 'AI APIs', 'Data Processing'] },
  { label: 'Infrastructure', items: ['Docker', 'Cloud Hosting', 'CI/CD', 'GitHub'] },
];

export const industries = [
  { name: 'Transportation & Mobility', note: 'Booking, dispatch and fleet visibility.' },
  { name: 'Retail & E-commerce', note: 'Storefronts, orders and inventory.' },
  { name: 'Education', note: 'Learning platforms and administration.' },
  { name: 'Healthcare', note: 'Scheduling, records and patient communication.' },
  { name: 'Logistics', note: 'Tracking, routing and warehouse operations.' },
  { name: 'Enterprise Operations', note: 'ERP, CRM and internal tooling.' },
  { name: 'Startups & Technology', note: 'MVPs, product teams and scale-up engineering.' },
];

export const processSteps = [
  { n: '01', title: 'Discover', body: 'Understand the business, requirements, users and challenges.' },
  { n: '02', title: 'Strategise', body: 'Define the solution, technical architecture and project roadmap.' },
  { n: '03', title: 'Design', body: 'Create user flows, wireframes, prototypes and visual systems.' },
  { n: '04', title: 'Develop', body: 'Build reliable, scalable and maintainable software.' },
  { n: '05', title: 'Launch', body: 'Test, deploy and deliver the solution.' },
  { n: '06', title: 'Evolve', body: 'Provide improvements, optimisation and ongoing development where agreed.' },
];

export const principles = [
  { title: 'Business-first thinking', body: 'Every technical decision starts with the outcome the business needs.' },
  { title: 'Purpose-driven engineering', body: 'We build what solves the problem — not what pads the scope.' },
  { title: 'Scalable architecture', body: 'Foundations chosen to grow with users, data and teams.' },
  { title: 'User-focused design', body: 'Interfaces shaped by the people who use them every day.' },
  { title: 'Transparent process', body: 'Clear plans, visible progress and honest trade-offs.' },
  { title: 'Long-term product thinking', body: 'Software that stays maintainable long after launch.' },
];

/** `tel:` link value — strips spaces and dashes from the display number. */
export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, '')}`;
