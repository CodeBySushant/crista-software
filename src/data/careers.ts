/**
 * Careers page content.
 *
 * ⚠ SAMPLE CONTENT — every item marked SAMPLE is placeholder copy written to show
 * the design. Replace it with Crista's real story, team, figures and roles before
 * launch. Open positions will come from the backend later (see services/careers.ts).
 */
import { company } from './navigation';

/* ---------------- Journey (horizontal timeline) ---------------- */
export type JourneyIcon = 'spark' | 'building' | 'code' | 'phone' | 'route' | 'chart' | 'book' | 'music' | 'cpu' | 'users';
export interface Milestone {
  /** Group label shown on the ruler. Use a year once you have real dates. */
  period: string;
  title: string;
  description: string;
  icon: JourneyIcon;
}

// SAMPLE: phases instead of years until real dates are added.
export const journey: Milestone[] = [
  { period: 'Foundation', icon: 'building', title: 'Crista Enterprises', description: 'Crista begins as a B2B supplier of lighting, fitness equipment and corporate gifting.' },
  { period: 'Foundation', icon: 'spark', title: 'A software division', description: 'Crista Software starts, to build the digital tools our own business kept needing.' },
  { period: 'Client work', icon: 'code', title: 'First client platforms', description: 'Web platforms, dashboards and portals for businesses moving their operations online.' },
  { period: 'Client work', icon: 'building', title: 'Rent ERP', description: 'A rental-management system with a Spring Boot backend and a Flutter app.' },
  { period: 'Client work', icon: 'route', title: 'ShayreCabs', description: 'A ride-sharing experience for riders, drivers and operators.' },
  { period: 'Client work', icon: 'book', title: 'ResumeCraft', description: 'An AI-assisted resume builder that tailors applications to each role.' },
  { period: 'Client work', icon: 'music', title: 'AuraBeats', description: 'A music experience designed around discovery and mood.' },
  { period: 'Products', icon: 'chart', title: 'Mobility Intelligence', description: 'Research into a geo-marketing platform for transportation companies.' },
  { period: 'Products', icon: 'cpu', title: 'Codename Ledger', description: 'Early work on a product to simplify everyday business finance.' },
  { period: 'Products', icon: 'phone', title: 'Codename Campus', description: 'Exploring software that makes life on campus simpler.' },
  { period: 'Today', icon: 'users', title: 'Growing the team', description: 'We are looking for people who want to build products with care.' },
];

/* ---------------- Values ---------------- */
// SAMPLE: proposed values — adjust the wording to how Crista really works.
export const values = [
  { title: 'Clarity', body: 'We say what we mean, write things down and keep problems small enough to understand.' },
  { title: 'Craft', body: 'Details matter. We sweat the code, the copy and the pixels, because users notice.' },
  { title: 'Ownership', body: 'Everyone owns their work from idea to production, and the outcome after it ships.' },
  { title: 'Honesty', body: 'We give real estimates, share bad news early and are open about what we do not know.' },
  { title: 'Pragmatism', body: 'We pick the simplest thing that works, and only add complexity when it earns its place.' },
  { title: 'Learning', body: 'We read, experiment and teach each other. Today’s junior is tomorrow’s lead.' },
];

/* ---------------- Team ---------------- */
export interface Member {
  name: string;
  role: string;
  /** Optional photo in /public; initials are shown when missing. */
  photo?: string;
}
// SAMPLE: replace with the real team (name + role). Initials are generated automatically.
export const team: Member[] = [
  { name: 'Sushant', role: 'Founder' },
  { name: 'Alok Thakur', role: 'Engineering' },
  { name: 'Team Member', role: 'Design' },
  { name: 'Team Member', role: 'Mobile' },
  { name: 'Team Member', role: 'Backend' },
  { name: 'Team Member', role: 'AI' },
  { name: 'Team Member', role: 'Product' },
  { name: 'Team Member', role: 'Operations' },
];

export const teamIntro =
  'A small team of engineers and designers who have shipped web platforms, mobile apps and AI tools for businesses across India.';

// SAMPLE: replace with real figures, or remove ones you cannot back up.
export const stats = [
  { value: String(team.length), label: 'People' },
  { value: '10+', label: 'Projects shipped' },
  { value: '3', label: 'Products in progress' },
  { value: '1', label: 'Shared mission' },
];

export const teamStory = [
  'We work in small, focused teams where everyone talks to users and everyone ships. Fewer handoffs, more ownership.',
  'Crista Software is part of Crista Enterprises, so we build for real businesses from day one, including our own.',
];

/** Optional team photos for the gallery (files in /public). The gallery hides itself while empty. */
export const photos: { src: string; alt: string }[] = [];

/* ---------------- How we work ---------------- */
// SAMPLE: describe Crista's real rituals.
export const howWeWork = [
  { title: 'Time for *actual* work', cadence: '', body: 'Long, uninterrupted blocks for deep work. Meetings are short, have an agenda and end with a decision.' },
  { title: 'Demo day', cadence: 'Every Friday', body: 'Each week we show what we built: working software, not slides. It keeps us honest and moving.' },
  { title: 'Ship small', cadence: '', body: 'We release in small steps, measure what happens and improve. Big-bang launches are the exception.' },
  { title: 'Team offsite', cadence: 'Once a year', body: 'Once a year we get everyone in one place to plan the next year, build something together and celebrate what we shipped.' },
  { title: 'Learn on the job', cadence: '', body: 'Pair programming, code reviews that teach, and time set aside to learn the tools we use.' },
  { title: 'Cut the noise', cadence: '', body: 'No busywork, no politics. We are here to build great software with people we respect.' },
];

/* ---------------- Benefits ---------------- */
export type BenefitIcon = 'wallet' | 'laptop' | 'clock' | 'book' | 'heart' | 'sun' | 'rocket' | 'users';
// SAMPLE: list only benefits Crista actually offers.
export const benefits: { icon: BenefitIcon; title: string; body: string }[] = [
  { icon: 'wallet', title: 'Fair pay', body: 'Competitive salary, reviewed every year' },
  { icon: 'laptop', title: 'Your setup', body: 'A laptop and the tools you need' },
  { icon: 'clock', title: 'Flexible hours', body: 'Work when you do your best work' },
  { icon: 'book', title: 'Learning budget', body: 'Courses, books and conferences' },
  { icon: 'rocket', title: 'Real ownership', body: 'Ship features that reach real users' },
  { icon: 'users', title: 'Mentorship', body: 'Learn directly from senior engineers' },
  { icon: 'sun', title: 'Paid time off', body: 'Rest is part of the job' },
  { icon: 'heart', title: 'Health cover', body: 'Medical insurance for you' },
];

/* ---------------- Open positions ---------------- */
export interface Position {
  id: string;
  title: string;
  team: string;
  location: string;
  type: string;
  summary: string;
}
// SAMPLE roles to show the design. Set to [] to show the "no open positions" state.
export const positions: Position[] = [
  { id: 'frontend-engineer', title: 'Frontend Engineer', team: 'Engineering', location: 'Remote · India', type: 'Full-time', summary: 'React and TypeScript interfaces for client platforms and Crista products.' },
  { id: 'mobile-engineer', title: 'Mobile Engineer (Flutter)', team: 'Engineering', location: 'Remote · India', type: 'Full-time', summary: 'Cross-platform apps from first prototype to the app stores.' },
  { id: 'product-designer', title: 'Product Designer', team: 'Design', location: 'Remote · India', type: 'Full-time', summary: 'Flows, interfaces and design systems for web and mobile products.' },
];

/* ---------------- Hiring process ---------------- */
export type StepIcon = 'send' | 'phone' | 'users' | 'code' | 'check' | 'handshake';
export const hiringSteps: { icon: StepIcon; title: string; body: string }[] = [
  { icon: 'send', title: 'Send a thoughtful application', body: 'Tell us what you have built and why Crista. A short, specific note beats a long cover letter.' },
  { icon: 'phone', title: 'Intro call', body: 'A 30-minute conversation about your experience, what you are looking for and how we work.' },
  { icon: 'users', title: 'Meet the team', body: 'You meet a couple of people you would work with. We talk through real problems, not trivia.' },
  { icon: 'code', title: 'Practical task', body: 'A small, paid task close to the work you would actually do. No whiteboard puzzles.' },
  { icon: 'check', title: 'Task review', body: 'We walk through your solution together: the decisions you made and what you would change.' },
  { icon: 'handshake', title: 'Offer', body: 'If it is a match, you get a clear offer and a plan for your first weeks.' },
];

/* ---------------- Community ---------------- */
export const community = [
  ...company.social.map((s) => ({ name: s.label, href: s.href, body: 'Behind the scenes, launches and life at Crista.', cta: 'Follow' })),
  { name: 'GitHub', href: company.github, body: 'See what we build and the tools we share.', cta: 'Explore' },
];
