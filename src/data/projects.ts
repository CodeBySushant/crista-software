import type { Project, ProjectCategory } from './types';

/**
 * PORTFOLIO — DRAFT.
 * Spec: use real projects only when details and presentation are approved.
 * These are the internal projects named in the brief. Descriptions, stacks
 * and screens are working drafts (`draft: true` renders a visible notice);
 * screens are labelled interface demonstrations, not real screenshots.
 * `outcomes` stays empty until results are verified — the section is hidden.
 */
export const projects: Project[] = [
  {
    slug: 'rent-erp',
    title: 'Rent ERP',
    category: 'Custom Business Systems',
    summary: 'A rental-management system with a Spring Boot backend and a Flutter app for day-to-day rental operations.',
    stack: ['Spring Boot', 'Java', 'Flutter', 'Dart'],
    mock: 'rental',
    draft: true,
    overview:
      'Rent ERP is a rental-management platform made up of a Spring Boot API and a Flutter application. It brings properties, tenants and rent tracking into a single system.',
    problem:
      'Rental operations are often managed through notebooks, spreadsheets and messages, which makes it hard to see what is due, what is paid and what needs attention.',
    objectives: [
      'Keep property, tenant and payment records in one place.',
      'Give owners a clear mobile view of what is due and overdue.',
      'Build on a backend that can grow into a multi-tenant service.',
    ],
    solution:
      'A Flutter app for owners and managers, backed by a Spring Boot REST API. The API owns authentication, records and business rules; the app focuses on fast, everyday tasks.',
    designApproach:
      'Screens are organised around the questions an owner asks most often — who has paid, what is due, and what changed — with the most common actions one tap away.',
    architecture: [
      { layer: 'Client', items: ['Flutter (Android / iOS)'] },
      { layer: 'API', items: ['Spring Boot', 'REST', 'Authentication'] },
      { layer: 'Data', items: ['Relational database'] },
      { layer: 'Hosting', items: ['VPS deployment (planned)'] },
    ],
    features: [
      { title: 'Property & unit records', description: 'Organise properties, units and tenants.' },
      { title: 'Rent tracking', description: 'See dues, payments and overdue balances.' },
      { title: 'Account sign-up', description: 'User accounts with verification flows.' },
    ],
    outcomes: [],
    seo: { title: 'Rent ERP — Case Study', description: 'Rental management system built with Spring Boot and Flutter.' },
  },
  {
    slug: 'shayrecabs',
    title: 'ShayreCabs',
    category: 'Mobile Applications',
    summary: 'A cab-booking and ride-sharing experience for riders, with live trip status and fare visibility.',
    stack: ['Flutter', 'Node.js', 'MongoDB', 'Maps API'],
    mock: 'cabs',
    draft: true,
    overview:
      'ShayreCabs is a ride-booking application concept focused on shared and point-to-point cab trips, with a rider app and a supporting backend.',
    problem:
      'Riders want to know the fare, the vehicle and the arrival time before they commit — and to share rides where it makes sense.',
    objectives: ['Make booking a ride a three-step task.', 'Show fare and arrival estimates up front.', 'Support shared trips on common routes.'],
    solution:
      'A mobile app for booking and tracking rides, backed by an API that manages trips, drivers and pricing rules.',
    designApproach:
      'Map-first layout with a single bottom sheet that changes as the trip progresses — search, confirm, track, complete.',
    architecture: [
      { layer: 'Client', items: ['Rider app'] },
      { layer: 'API', items: ['Trips', 'Pricing', 'Drivers'] },
      { layer: 'Data', items: ['Document database'] },
      { layer: 'Services', items: ['Maps & geolocation'] },
    ],
    features: [
      { title: 'Ride booking', description: 'Pick-up, drop-off and vehicle selection.' },
      { title: 'Fare estimate', description: 'Fare shown before confirming.' },
      { title: 'Trip tracking', description: 'Live status from booking to drop-off.' },
    ],
    outcomes: [],
    seo: { title: 'ShayreCabs — Case Study', description: 'Cab booking and ride-sharing mobile application.' },
  },
  {
    slug: 'resumecraft',
    title: 'ResumeCraft',
    category: 'AI-Powered Applications',
    summary: 'A web application for building structured, well-formatted résumés with guided, AI-assisted writing.',
    stack: ['React', 'TypeScript', 'Node.js', 'AI APIs'],
    mock: 'resume',
    draft: true,
    overview:
      'ResumeCraft helps people turn their experience into a clean, structured résumé, with templates and writing suggestions along the way.',
    problem: 'Writing a résumé is slow and formatting it consistently is harder than it should be.',
    objectives: ['Separate content from layout so templates can be switched freely.', 'Offer writing suggestions without taking control away from the user.', 'Export clean, consistent documents.'],
    solution:
      'A web editor with structured sections, live preview and template switching, with optional AI suggestions for bullet points.',
    designApproach: 'Split-view editor: structured input on the left, live document on the right, so every change is visible immediately.',
    architecture: [
      { layer: 'Client', items: ['React', 'TypeScript'] },
      { layer: 'API', items: ['Node.js'] },
      { layer: 'AI', items: ['Text suggestions via AI API'] },
      { layer: 'Output', items: ['Document export'] },
    ],
    features: [
      { title: 'Structured editor', description: 'Sections for experience, education and skills.' },
      { title: 'Templates', description: 'Switch layouts without rewriting content.' },
      { title: 'Writing assistance', description: 'Suggested phrasing for bullet points.' },
    ],
    outcomes: [],
    seo: { title: 'ResumeCraft — Case Study', description: 'AI-assisted résumé builder web application.' },
  },
  {
    slug: 'aurabeats',
    title: 'AuraBeats',
    category: 'Mobile Applications',
    summary: 'A music listening experience built around mood-based discovery and a focused, distraction-free player.',
    stack: ['Flutter', 'Dart', 'Supabase'],
    mock: 'music',
    draft: true,
    overview: 'AuraBeats is a music app concept centred on discovering tracks by mood and listening without clutter.',
    problem: 'Large catalogues make it hard to find the right music for the moment.',
    objectives: ['Browse by mood, not just by artist or genre.', 'Keep the player simple and fast.', 'Make playlists quick to create and share.'],
    solution: 'A mobile app with mood-based collections, a minimal player and lightweight playlist tools.',
    designApproach: 'Dark, image-led interface where artwork and mood colour set the tone of every screen.',
    architecture: [
      { layer: 'Client', items: ['Flutter'] },
      { layer: 'Backend', items: ['Supabase'] },
      { layer: 'Data', items: ['PostgreSQL'] },
    ],
    features: [
      { title: 'Mood collections', description: 'Curated sets for focus, energy and calm.' },
      { title: 'Minimal player', description: 'Controls that stay out of the way.' },
      { title: 'Playlists', description: 'Create and organise in a few taps.' },
    ],
    outcomes: [],
    seo: { title: 'AuraBeats — Case Study', description: 'Mood-based music listening mobile app.' },
  },
];

export const getProject = (slug?: string) => projects.find((p) => p.slug === slug);

export const projectCategories: ProjectCategory[] = [
  'Web Applications',
  'Mobile Applications',
  'SaaS Platforms',
  'AI-Powered Applications',
  'Custom Business Systems',
];
