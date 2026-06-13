// =============================================================================
// SITE CONFIG — single source of truth for identity, links, and nav.
//
// ⚠️  BEFORE LAUNCH: replace every value marked `TODO`. These are the only
//     placeholders in the codebase. Shipping them as-is recreates the exact
//     credibility bugs the audit flagged (fake email, dead links).
// =============================================================================

export const siteConfig = {
  name: 'Kylle Nichole Actub',
  shortName: 'KA',
  role: 'Full-Stack Web Developer',
  location: 'Cebu, PH',

  // Hero portrait overlays.
  status: 'Available for work',
  // TODO: set an HONEST experience label or leave '' to hide the badge.
  //       Don't inflate — e.g. 'BSIT Graduate · 2025' or '1+ yr building full-stack apps'.
  experience: '',
  // Proof shown as a product-UI card beside the hero portrait (credibility,
  // not a tech list — the stack already appears below the CTAs).
  heroProof: {
    flagship: {
      label: 'Currently building',
      name: 'HTTA Training Management System',
      detail: 'Full-stack · web + mobile',
      href: '#work',
    },
    specialization: 'Full-stack web apps + technical SEO',
    // TODO: set HONEST values or leave '' to hide that line. Don't inflate.
    yearsBuilding: '', // e.g. '2+ yrs building web apps'
    recentClient: '', // e.g. a public client/site you can name
  },
  tagline: 'I build full-stack web apps — from database to interface.',
  intro:
    'BSIT graduate based in Cebu, PH. I work across React / Next.js on the ' +
    'front end and Laravel / PHP + MySQL on the back end. Open to remote roles.',

  // TODO: confirm your real, monitored email address.
  email: 'kyllenichole123@gmail.com',

  // TODO: drop your résumé PDF at `public/resume.pdf` (or change this path).
  resumeUrl: '/resume.pdf',

  // TODO: confirm both handles resolve. Use ONE github handle everywhere.
  socials: {
    github: 'https://github.com/ActubKylle',
    linkedin: 'https://www.linkedin.com/in/kylle-actub',
  },

  // TODO: get a free access key at https://web3forms.com (no backend needed).
  //       Until then the contact form falls back to the direct email link.
  web3formsKey: 'YOUR_WEB3FORMS_ACCESS_KEY',

  // Short "what I'm up to" line for the footer (optional — set to '' to hide).
  now: 'Learning TypeScript · open to remote full-stack roles.',

  // Compact stack strip shown in the hero (proof of range, replaces the old
  // standalone Skills section).
  stack: ['React', 'Next.js', 'Laravel', 'PHP', 'MySQL', 'Tailwind'],

  nav: [
    { id: 'work', label: 'Work' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ],
};

// True while the contact form has no real key, so the UI can adapt gracefully.
export const isFormConfigured =
  siteConfig.web3formsKey && siteConfig.web3formsKey !== 'YOUR_WEB3FORMS_ACCESS_KEY';
