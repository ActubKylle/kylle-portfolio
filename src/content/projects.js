// =============================================================================
// PROJECTS — sourced from real repos at github.com/ActubKylle, verified by
// reading each codebase (deps, models, controllers, screens) on 2026-06-07.
// No invented features or metrics. The flagship (featured) gets a full
// case-study layout; the rest render as concise alternating rows.
//
// TODO (you): add screenshots → drop images in /public/projects/ and set `image`.
//   For apps with a live demo you can screenshot the deployed site directly.
// =============================================================================

export const projects = [
  // ----------------------------- FLAGSHIP -----------------------------------
  {
    featured: true,
    category: 'Full-stack · Web + Mobile · Realtime',
    title: 'HTTA Training Management System',
    blurb:
      'An end-to-end management system for a skills-training academy — a Laravel + ' +
      'Inertia + React web platform paired with a React Native attendance app.',
    problem:
      'Learner enrollment, scholarships, and attendance were handled manually, and ' +
      'attendance needed to be verifiable rather than proxied.',
    solution:
      'A role-based platform (Admin / Staff / Learner) covering the full learner ' +
      'lifecycle — registration, program enrollment, scholarships, and attendance — ' +
      'plus a mobile app where learners check in with a GPS-located, face-verified selfie.',
    highlights: [
      'Role-based access for Admin, Staff & Learner',
      'Multi-step registration w/ digital signature & consent',
      'Queued bulk Excel/CSV student import',
      'Scholarship management + email notifications',
      'Real-time events via Pusher broadcasting',
      'Mobile check-in: GPS + on-device face detection',
    ],
    tech: ['Laravel', 'Inertia.js', 'React', 'TypeScript', 'React Native', 'Pusher'],
    links: [
      { type: 'repo', label: 'Platform code', href: 'https://github.com/ActubKylle/httainc_tabang' },
      { type: 'repo', label: 'Mobile app code', href: 'https://github.com/ActubKylle/httagpsselfieapp' },
    ],
    image: null, // Laravel + Inertia monolith / native app — falls back to system diagram.
  },

  // --------------------------- SUPPORTING -----------------------------------
  {
    category: 'Full-stack · Web + Mobile',
    title: 'LifeLog',
    blurb:
      'A life/health logging app spanning web and mobile, with charts and analytics. ' +
      'A Laravel API backs both a React web client and an Expo mobile app.',
    role: 'Full-stack + mobile — shared Laravel API, React web, Expo app',
    tech: ['Laravel', 'React', 'React Native', 'Chart.js'],
    repo: 'https://github.com/ActubKylle/lifelog-web',
    demo: 'https://lifelog-web-finalproject.vercel.app',
    image: '/life-log.png',
  },
  {
    category: 'Full-stack · Realtime + Exports',
    title: 'Expense Tracker',
    blurb:
      'A full-stack expense tracker with charts, CSV import, and PDF export — a ' +
      'Laravel + Sanctum API with real-time updates and a Material UI React dashboard.',
    role: 'Full-stack — Laravel/Sanctum API, MUI dashboard, PDF/CSV export',
    tech: ['Laravel', 'React', 'Material UI', 'Chart.js', 'Pusher'],
    repo: 'https://github.com/ActubKylle/expenseTrackers-frontend',
    demo: 'https://expense-trackers-frontend.vercel.app',
    image: '/expense-tracker.png',
  },
  {
    category: 'Full-stack · Web + Mobile',
    title: 'American Real World Assets',
    blurb:
      'American Real-World Assets (RWAs) refer to tangible (real estate, gold) or financial (U.S. Treasury bills, stocks) assets based in the U.S. that are digitized or "tokenized" on a blockchain. This process allows for fractional ownership, 24/7 trading, and instant settlement using decentralized finance (DeFi) platforms' +
      'A Laravel API serves both a React web client and an Expo mobile app, enabling users to explore, invest in, and manage tokenized RWAs with real-time updates and secure transactions.',
    role: 'Full-stack + mobile — Laravel/Sanctum API, Expo client',
    tech: ['Laravel', 'React Native', 'Expo', 'Zustand'],
    // repo: 'https://github.com/ActubKylle/occrentallaptop-backend',
    demo: 'https://american-real-world-assets.vercel.app',
    image: '/arwa.png',
  },

  // ---------------------------------------------------------------------------
  // TODO — CLIENT / PRODUCTION / WORDPRESS WORK (not on your public GitHub).
  // Fill these from your real client/production work, then they'll render as
  // supporting rows. Do NOT invent — paste real details. Template:
  //
  // {
  //   category: 'Client work · WordPress',
  //   title: '<Client / site name>',
  //   blurb: '<what it is, what you delivered>',
  //   role: '<your role — e.g. custom theme/plugin, headless WP, technical SEO>',
  //   tech: ['WordPress', 'PHP', 'MySQL', '...'],
  //   repo: null,                       // or a private/redacted note
  //   demo: 'https://<live-site>',      // if public
  //   image: '/projects/<name>.png',
  // },
  // ---------------------------------------------------------------------------
];
