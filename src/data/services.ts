import type { Service } from './types';

export const services: Service[] = [
  {
    slug: 'web-development',
    index: '01',
    title: 'Web Development',
    shortTitle: 'Web',
    navDescription: 'Platforms, portals and dashboards built to scale.',
    headline: 'Web platforms engineered for the long run.',
    summary:
      'Custom websites, business platforms, dashboards, portals and scalable web applications — fast to load, simple to operate and built on an architecture your team can keep extending.',
    capabilities: ['Web applications', 'Customer & partner portals', 'Admin dashboards', 'Marketing websites', 'E-commerce builds', 'Progressive web apps'],
    problems: [
      'Spreadsheets and email threads are standing in for a real system.',
      'An existing site is slow, hard to update or impossible to extend.',
      'Customers and partners need self-service access to data and orders.',
      'Teams juggle several tools that never share the same data.',
    ],
    solutions: [
      { title: 'Business platforms', description: 'Role-based web applications that bring operations, customers and data into one place.' },
      { title: 'Portals & dashboards', description: 'Self-service portals and live dashboards connected to the systems you already use.' },
      { title: 'Websites that convert', description: 'Fast, accessible and SEO-ready sites with content your team can manage.' },
      { title: 'Modernisation', description: 'Incremental rebuilds of legacy front ends without stopping the business.' },
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Tailwind CSS'],
    approach: [
      { title: 'Information architecture', description: 'Map users, roles and data before a single screen is designed.' },
      { title: 'Component system', description: 'A shared UI library keeps every page consistent and quick to build.' },
      { title: 'Performance budget', description: 'Load time and bundle size are tracked from the first sprint.' },
      { title: 'Handover', description: 'Documented code, environments and runbooks your team can own.' },
    ],
    mock: 'web',
    relatedWork: ['resumecraft', 'rent-erp'],
    seo: {
      title: 'Web Development',
      description: 'Custom web applications, portals, dashboards and websites engineered by Crista Software.',
    },
  },
  {
    slug: 'mobile-development',
    index: '02',
    title: 'Mobile App Development',
    shortTitle: 'Mobile',
    navDescription: 'Android and iOS apps with reliable architecture.',
    headline: 'Mobile apps people keep on their home screen.',
    summary:
      'Android and iOS applications with intuitive interfaces and reliable architecture — from customer-facing apps to field tools that work on patchy networks.',
    capabilities: ['Cross-platform apps (Flutter)', 'Native Android (Kotlin)', 'Offline-first data', 'Push notifications', 'Maps & location', 'Payments integration'],
    problems: [
      'Customers expect to book, order or track from their phone.',
      'Field teams still rely on paper forms or messaging apps.',
      'An existing app crashes, drains battery or is hard to update.',
      'Two separate codebases double the cost of every change.',
    ],
    solutions: [
      { title: 'Customer apps', description: 'Booking, ordering and account apps designed around everyday tasks.' },
      { title: 'Operations apps', description: 'Tools for drivers, technicians and staff, built to work offline.' },
      { title: 'One codebase', description: 'Flutter delivers Android and iOS from a single, well-tested codebase.' },
      { title: 'Store readiness', description: 'Release builds, store listings and staged rollouts handled end to end.' },
    ],
    technologies: ['Flutter', 'Dart', 'Kotlin', 'Firebase', 'Supabase', 'REST & GraphQL APIs'],
    approach: [
      { title: 'Platform decision', description: 'Cross-platform or native, chosen per project and explained in writing.' },
      { title: 'Prototype on device', description: 'Clickable prototypes tested on real phones before development.' },
      { title: 'Release pipeline', description: 'Automated builds and test tracks for every platform.' },
      { title: 'Post-launch care', description: 'Crash monitoring and OS updates, where support is agreed.' },
    ],
    mock: 'mobile',
    relatedWork: ['shayrecabs', 'aurabeats', 'rent-erp'],
    seo: {
      title: 'Mobile App Development',
      description: 'Android and iOS app development with Flutter and Kotlin by Crista Software.',
    },
  },
  {
    slug: 'custom-software',
    index: '03',
    title: 'Custom Software Development',
    shortTitle: 'Custom Software',
    navDescription: 'ERP, CRM and operational systems built for you.',
    headline: 'Software shaped around how your business actually works.',
    summary:
      'Business management systems, ERP solutions, CRM platforms and custom operational software — plus the APIs and integrations that connect them to everything else.',
    capabilities: ['ERP & operations systems', 'CRM platforms', 'Inventory & billing', 'API development', 'Third-party integrations', 'Reporting & exports'],
    problems: [
      'Off-the-shelf software forces your process to change, not the other way round.',
      'Data is re-typed between systems, creating errors and delays.',
      'Reporting means exporting, merging and cleaning spreadsheets every week.',
      'Licence costs grow with every new user and module.',
    ],
    solutions: [
      { title: 'Operations systems', description: 'Modules for orders, inventory, billing, staff and assets — only the ones you need.' },
      { title: 'CRM platforms', description: 'Pipelines, contacts and follow-ups modelled on your sales process.' },
      { title: 'API development', description: 'Secure, versioned and documented APIs for apps, partners and internal tools.' },
      { title: 'Software integration', description: 'Connect payment, messaging, accounting and logistics services into one flow.' },
    ],
    technologies: ['Java', 'Spring Boot', 'Node.js', 'Express', 'PostgreSQL', 'MySQL', 'Docker', 'OpenAPI'],
    approach: [
      { title: 'Process mapping', description: 'Workshops with the people who will use the system every day.' },
      { title: 'Modular delivery', description: 'Ship the most valuable module first, then extend.' },
      { title: 'Data migration', description: 'Planned imports from spreadsheets and legacy tools.' },
      { title: 'Access & audit', description: 'Roles, permissions and activity logs from day one.' },
    ],
    mock: 'erp',
    relatedWork: ['rent-erp'],
    seo: {
      title: 'Custom Software Development',
      description: 'Custom ERP, CRM, operational software, API development and integrations by Crista Software.',
    },
  },
  {
    slug: 'ai-automation',
    index: '04',
    title: 'AI & Automation',
    shortTitle: 'AI & Automation',
    navDescription: 'Intelligent workflows, assistants and data pipelines.',
    headline: 'Put AI to work where it saves real hours.',
    summary:
      'AI-powered applications, intelligent workflows, chatbots, automation and data-driven solutions — designed with clear guardrails and measured against the task they replace.',
    capabilities: ['Document & data extraction', 'AI assistants & chatbots', 'Workflow automation', 'Retrieval over company knowledge', 'Classification & routing', 'Data processing pipelines'],
    problems: [
      'Staff spend hours copying data out of documents and emails.',
      'Customers wait for answers that already exist in your documentation.',
      'Repetitive approvals and hand-offs slow every process down.',
      'Data exists, but nobody has time to turn it into decisions.',
    ],
    solutions: [
      { title: 'Knowledge assistants', description: 'Assistants grounded in your own documents, with sources shown for every answer.' },
      { title: 'Document automation', description: 'Extract, validate and route data from invoices, forms and records.' },
      { title: 'Workflow automation', description: 'Trigger-based automations across the tools your team already uses.' },
      { title: 'AI features in products', description: 'Search, summarisation and recommendations inside your own applications.' },
    ],
    technologies: ['Python', 'AI APIs', 'Machine Learning', 'Vector search', 'FastAPI', 'Node.js', 'PostgreSQL'],
    approach: [
      { title: 'Task selection', description: 'Start with one high-volume task where accuracy can be measured.' },
      { title: 'Evaluation set', description: 'Real examples define what “good” looks like before building.' },
      { title: 'Human in the loop', description: 'Review steps where errors would be costly.' },
      { title: 'Monitoring', description: 'Track quality, cost and latency once it is live.' },
    ],
    mock: 'ai',
    relatedWork: ['resumecraft'],
    seo: {
      title: 'AI & Automation',
      description: 'AI applications, assistants, document automation and workflow automation by Crista Software.',
    },
  },
  {
    slug: 'ui-ux-design',
    index: '05',
    title: 'UI/UX & Product Design',
    shortTitle: 'Design',
    navDescription: 'Research, interface systems and prototypes.',
    headline: 'Design that makes complex software feel obvious.',
    summary:
      'Research-driven product design, interface systems, user journeys and prototypes — for new products, redesigns and the websites that introduce them.',
    capabilities: ['User research', 'Journey mapping', 'Wireframes & prototypes', 'Design systems', 'Website design', 'Usability testing'],
    problems: [
      'Users get lost, call support or abandon key flows.',
      'Every new screen looks slightly different from the last.',
      'The team cannot agree what to build because nothing is visible yet.',
      'Developers interpret designs differently, slowing every release.',
    ],
    solutions: [
      { title: 'Product design', description: 'End-to-end design of new products, from first flows to final UI.' },
      { title: 'Design systems', description: 'Tokens, components and documentation shared by design and code.' },
      { title: 'Website design', description: 'Editorial, conversion-minded websites for companies and products.' },
      { title: 'Prototypes', description: 'Clickable prototypes to test with users and align stakeholders.' },
    ],
    technologies: ['Figma', 'Design tokens', 'Prototyping', 'Accessibility (WCAG)', 'React component libraries'],
    approach: [
      { title: 'Understand', description: 'Interviews and existing data reveal where users struggle.' },
      { title: 'Structure', description: 'Flows and wireframes agree on the shape before the style.' },
      { title: 'Systemise', description: 'Reusable components replace one-off screens.' },
      { title: 'Validate', description: 'Test with users, then hand over specs developers can trust.' },
    ],
    mock: 'design',
    relatedWork: ['aurabeats', 'resumecraft'],
    seo: {
      title: 'UI/UX & Product Design',
      description: 'Product design, UX research, design systems and website design by Crista Software.',
    },
  },
  {
    slug: 'cloud-devops',
    index: '06',
    title: 'Cloud & DevOps',
    shortTitle: 'Cloud & DevOps',
    navDescription: 'Infrastructure, CI/CD and reliable hosting.',
    headline: 'Infrastructure you never have to think about.',
    summary:
      'Cloud deployment, infrastructure setup, CI/CD, application hosting and performance optimisation — so releases are routine and downtime is rare.',
    capabilities: ['Cloud setup & migration', 'CI/CD pipelines', 'Containerisation', 'Monitoring & alerts', 'Backups & recovery', 'Performance tuning'],
    problems: [
      'Deployments are manual, risky and depend on one person.',
      'The application slows down or fails under real traffic.',
      'Hosting costs keep rising without a clear reason.',
      'There is no tested plan for backups or recovery.',
    ],
    solutions: [
      { title: 'Cloud foundations', description: 'Environments, networking and access set up properly from the start.' },
      { title: 'CI/CD', description: 'Every change tested and deployed automatically, with one-click rollback.' },
      { title: 'Containers', description: 'Docker-based builds that run the same everywhere.' },
      { title: 'Observability', description: 'Logs, metrics and alerts that surface problems before users do.' },
    ],
    technologies: ['Docker', 'GitHub Actions', 'Cloud hosting', 'Nginx', 'Linux', 'PostgreSQL', 'CI/CD'],
    approach: [
      { title: 'Audit', description: 'Review current hosting, costs, security and release process.' },
      { title: 'Codify', description: 'Infrastructure and pipelines defined in version control.' },
      { title: 'Automate', description: 'Tests, builds and deployments run on every change.' },
      { title: 'Observe', description: 'Dashboards and alerts agreed with your team.' },
    ],
    mock: 'cloud',
    relatedWork: ['rent-erp'],
    seo: {
      title: 'Cloud & DevOps',
      description: 'Cloud infrastructure, CI/CD, containerisation and hosting by Crista Software.',
    },
  },
];

export const getService = (slug?: string) => services.find((s) => s.slug === slug);

/** Grouped for the Services mega menu (spec §5). Items without a dedicated
 *  page link to the closest detail page. */
export const serviceMenuGroups = [
  {
    label: 'Development',
    items: [
      { label: 'Web Development', description: 'Platforms, portals and dashboards.', to: '/services/web-development' },
      { label: 'Mobile App Development', description: 'Android and iOS with Flutter & Kotlin.', to: '/services/mobile-development' },
      { label: 'Custom Software Development', description: 'ERP, CRM and operations systems.', to: '/services/custom-software' },
      { label: 'API Development', description: 'Secure, documented, versioned APIs.', to: '/services/custom-software' },
    ],
  },
  {
    label: 'Design',
    items: [
      { label: 'UI/UX Design', description: 'Research, flows and interface systems.', to: '/services/ui-ux-design' },
      { label: 'Product Design', description: 'From first prototype to shipped UI.', to: '/services/ui-ux-design' },
      { label: 'Website Design', description: 'Editorial, conversion-minded sites.', to: '/services/ui-ux-design' },
    ],
  },
  {
    label: 'Technology',
    items: [
      { label: 'AI & Automation', description: 'Assistants, extraction and workflows.', to: '/services/ai-automation' },
      { label: 'Cloud & DevOps', description: 'CI/CD, hosting and observability.', to: '/services/cloud-devops' },
      { label: 'Software Integration', description: 'Connect the tools you already use.', to: '/services/custom-software' },
    ],
  },
];
