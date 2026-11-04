// =============================================================================
// FULL-STACK APPLICATIONS — sourced from real repos at github.com/ActubKylle.
// HTTA details were re-verified against the repository on 2026-11-03
// (composer.json, package.json, routes, middleware, migrations, jobs, events).
// No invented features or metrics.
//
// Shape:
//   slug, featured, category, title, blurb, role, features[], tech[],
//   links[{ type: 'repo' | 'demo', label, href }],
//   image: { base, width, height } | null   (base → <base>-640/-1280.webp)
//   caseStudy: { sections[] } | null         (renders at /projects/<slug>)
//   draft: true → hidden in production until the details are confirmed.
//
// Add screenshots with:  py scripts/make-thumbnail.py --file shot.png --out public/images/projects/<slug> --crop none
// =============================================================================

export const projects = [
  // ----------------------------- FLAGSHIP -----------------------------------
  {
    slug: 'htta',
    featured: true,
    category: 'Full-stack web app + mobile app',
    title: 'HTTA Enrollment Management System',
    blurb:
      'An enrollment and training management system for a skills-training academy: ' +
      'a public site with online learner registration, a staff back-office, a learner ' +
      'scholarship portal, and a mobile attendance app.',
    // TODO: confirm — solo build, or part of a team? Adjust if needed.
    role: 'Full-stack developer: database design, Laravel backend, React frontend, mobile app',
    features: [
      'Online learner registration with consent and digital signature',
      'Staff review flow: accept, reject, edit, export registration PDF',
      'Role-based access for staff and learners via custom middleware',
      'Programs, batches, and scholarship management',
      'Queued bulk student import from Excel/CSV',
      'Real-time staff alerts for new registrations (Pusher)',
      'Mobile check-in with GPS location and on-device face detection',
    ],
    tech: ['Laravel 12', 'Inertia.js', 'React', 'TypeScript', 'MySQL', 'Tailwind CSS', 'Pusher', 'Expo'],
    links: [
      { type: 'repo', label: 'Web platform code', href: 'https://github.com/ActubKylle/httainc_tabang' },
      { type: 'repo', label: 'Mobile app code', href: 'https://github.com/ActubKylle/httagpsselfieapp' },
    ],
    // TODO: add 2–3 real screenshots (staff dashboard, enrollment review, mobile check-in).
    image: null,
    caseStudy: {
      sections: [
        {
          id: 'overview',
          heading: 'Overview',
          body: [
            'HTTA needed one place to take learner registrations online, review and accept ' +
              'enrollments, manage programs and scholarships, and record attendance.',
            'The system has four parts: a public website with the registration form, a staff ' +
              'back-office, a learner portal for scholarship applications, and an Expo mobile ' +
              'app for attendance check-in.',
          ],
        },
        {
          id: 'architecture',
          heading: 'Architecture',
          diagram: 'htta',
          body: [
            'A Laravel 12 monolith serves the web app through Inertia.js, so pages are React ' +
              '+ TypeScript components that receive data straight from Laravel controllers. ' +
              'There is no separate SPA API to keep in sync.',
            'Slow work runs outside the request cycle. Excel imports are dispatched as queued ' +
              'jobs (database queue driver), and new registrations are broadcast to staff over ' +
              'a private Pusher channel. The mobile app talks to a dedicated API endpoint.',
          ],
          list: [
            'Backend: Laravel 12 (PHP 8.2), Inertia.js 2, Laravel queues and broadcasting',
            'Frontend: React 19, TypeScript, Tailwind CSS 4, Radix UI primitives',
            'Database: MySQL',
            'Integrations: Pusher + Laravel Echo, SMTP mail, DomPDF, Laravel Excel',
            'Mobile: Expo / React Native with camera, location, and ML Kit face detection',
          ],
        },
        {
          id: 'database',
          heading: 'Database design',
          body: [
            'The schema normalizes the learner registration form into focused tables, keeping ' +
              'program delivery data (programs, batches, enrollments, attendance) separate from ' +
              'personal profile data. Foreign keys cascade on delete, and attendance has a ' +
              'unique (learner, date) constraint so a learner can only be marked once per day.',
          ],
          table: {
            columns: ['Table', 'Purpose', 'Key relationships'],
            rows: [
              ['users', 'Login accounts with a role column (default: learner)', 'has one learner'],
              ['learners', 'Learner profile from the registration form', 'belongs to user'],
              ['learner_addresses, educational_attainments', 'Address and education details', 'belong to learner'],
              ['classifications, disabilities', 'Learner classifications and disability records', 'learner ↔ lookup tables'],
              ['privacy_consents, registration_signatures', 'Consent and signature captured at registration', 'belong to learner'],
              ['programs, batches', 'Training programs and their scheduled batches', 'program has many batches'],
              ['course_enrollments', 'A learner enrolled in a program and batch', 'learner, program, batch'],
              ['attendances', 'Daily status, time in/out, and who marked it', 'learner, program, batch, marked_by user'],
              ['scholarships, student_scholarships', 'Scholarship offers and learner applications', 'learner ↔ scholarship'],
              ['scholarship_application_documents', 'Files uploaded with an application', 'belong to an application'],
            ],
          },
        },
        {
          id: 'auth',
          heading: 'Authentication & permissions',
          list: [
            'Session authentication with email verification, password reset, and password confirmation',
            'Profile, password, and appearance settings for every signed-in user',
            'A role column on users; custom staff and learner middleware guard each route group',
            'Non-staff users get a 403 on every /staff route; /dashboard redirects staff to their dashboard',
          ],
        },
        {
          id: 'workflow',
          heading: 'Application workflow',
          steps: [
            'A learner completes the registration form on the public site, including consent and a digital signature.',
            'Laravel stores the registration and broadcasts a learner.registered event to staff in real time.',
            'Staff review the enrollment and accept, reject, or edit it, or export it as a PDF. Accepting a pending learner activates their account and emails them generated login credentials.',
            'Staff manage programs, batches, and scholarships, and can bulk-import students from Excel as a queued job.',
            'Learners apply for scholarships with supporting documents; staff update each application’s status.',
            'Attendance is recorded by staff per program and date, or by learners through the mobile app check-in.',
          ],
        },
        {
          id: 'backend',
          heading: 'Backend functionality',
          list: [
            'Resource controllers for enrollments, programs, nested program batches, scholarships, and attendance',
            'Server-side request validation, Eloquent relationships, and eager loading for list views',
            'Queued ImportStudentsJob built on Laravel Excel for bulk student imports',
            'Enrollment acceptance guarded against re-processing (pending → accepted/rejected), with credential emails',
            'PDF export of a learner’s registration record with DomPDF',
          ],
        },
        {
          id: 'frontend',
          heading: 'Frontend implementation',
          list: [
            'Inertia pages in TypeScript for the public site, staff back-office, learner portal, auth, and settings',
            'UI built on Radix UI primitives (dialogs, dropdowns, selects, tooltips) and Tailwind CSS 4',
            'Laravel Echo subscribes staff screens to the private staff-enrollments channel',
            'Mobile app: camera selfie, GPS location with map, and on-device face detection before check-in',
          ],
        },
      ],
    },
  },

  // --------------------------- SUPPORTING -----------------------------------
  {
    slug: 'lifelog',
    category: 'Full-stack web app + mobile app',
    title: 'LifeLog',
    blurb:
      'A life and health logging app for web and mobile. A shared Laravel API backs both ' +
      'a React web client and an Expo mobile app.',
    role: 'Full-stack developer: Laravel API, React web client, Expo app',
    features: ['Shared REST API for web and mobile', 'Charts and analytics of logged data'],
    tech: ['Laravel', 'React', 'React Native', 'Chart.js'],
    links: [
      { type: 'demo', label: 'Live demo', href: 'https://lifelog-web-finalproject.vercel.app' },
      { type: 'repo', label: 'Code', href: 'https://github.com/ActubKylle/lifelog-web' },
    ],
    // TODO: replace with a screenshot of the logging/analytics screens (current one shows a quote).
    image: { base: '/images/projects/life-log', width: 1280, height: 613 },
  },
  {
    slug: 'expense-tracker',
    category: 'Full-stack web app',
    title: 'Expense Tracker',
    blurb:
      'An expense tracker with charts, CSV import, and PDF export, built on a Laravel + ' +
      'Sanctum API with real-time updates and a Material UI React dashboard.',
    role: 'Full-stack developer: Laravel/Sanctum API, React dashboard, exports',
    features: ['Token auth with Laravel Sanctum', 'CSV import and PDF export', 'Real-time updates via Pusher', 'Spending charts'],
    tech: ['Laravel', 'React', 'Material UI', 'Chart.js', 'Pusher'],
    links: [
      { type: 'demo', label: 'Live demo', href: 'https://expense-trackers-frontend.vercel.app' },
      { type: 'repo', label: 'Code', href: 'https://github.com/ActubKylle/expenseTrackers-frontend' },
    ],
    // TODO: the landing-page screenshot shows placeholder ratings ("4.9 stars",
    //       "10,000+ users"). Remove those from the app or use a dashboard screenshot.
    image: { base: '/images/projects/expense-tracker', width: 1280, height: 609 },
  },
  {
    // Hidden in production: the demo URL returns 404, the old repo link pointed
    // at a different project, and the description did not match the screenshot.
    // TODO: confirm what you built, the stack, and working links — then remove `draft`.
    draft: true,
    slug: 'american-real-world-assets',
    category: 'Website',
    title: 'American Real World Assets',
    blurb: 'Marketing website for a real-world asset tokenization platform.',
    role: 'TODO: your contribution',
    features: [],
    tech: [],
    links: [],
    image: { base: '/images/projects/arwa', width: 1280, height: 608 },
  },
];
