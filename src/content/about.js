// =============================================================================
// ABOUT — text-only (the portrait now lives in the hero). Sections: philosophy,
// experience, education, technical strengths.
//
// ⚠️  TODO: replace experience entries + school/years with your real, verifiable
//     details. Keep it truthful — do not inflate roles or dates.
// =============================================================================

export const about = {
  lead:
    "I'm Kylle — a full-stack developer who likes turning messy problems into " +
    'clean, working software.',

  // Development philosophy.
  philosophy: [
    'I think about the whole path — schema, API, and interface — not just the ' +
      'screen. Getting the data model and the boundaries right is what makes the ' +
      'UI simple later.',
    'I favor readable code over clever code, ship small and often, and treat ' +
      'performance and accessibility as part of "done," not an afterthought.',
  ],

  // TODO: replace with your real roles/engagements (truthful).
  experience: [
    {
      role: 'Full-Stack Web Developer',
      org: 'Freelance & project-based work',
      period: '2024 — Present',
      note: 'Building full-stack web apps with Laravel / PHP and React / Next.js, plus technical SEO.',
    },
  ],

  // TODO: confirm school + years.
  education: {
    degree: 'BSc in Information Technology',
    school: '[Your University]',
    years: '20XX – 20XX',
  },

  // Grounded in shipped work (HTTA: APIs, roles, realtime) + SEO.
  strengths: [
    'Full-stack web apps (Laravel + React / Next.js)',
    'REST APIs, auth & role-based access control',
    'MySQL schema & query design',
    'Real-time features (Pusher / WebSockets)',
    'Technical SEO & front-end performance',
  ],
};
