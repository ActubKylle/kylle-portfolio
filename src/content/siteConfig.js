// =============================================================================
// SITE CONFIG — single source of truth for identity, links, and hero copy.
// Section order + nav labels live in src/content/sections.js.
// =============================================================================

export const siteConfig = {
  name: 'Kylle Nichole Actub',
  shortName: 'KA',
  role: 'Full-Stack Web Developer',
  location: 'Cagayan de Oro City, PH',

  // TODO: only keep this if it is true right now. Set to '' to hide the badge.
  status: 'Available for work',

  // Live address, used for canonical URLs, the sitemap and social previews.
  // Change it if you move to a custom domain (no trailing slash).
  siteUrl: 'https://kylle-portfolio.vercel.app',

  // Search-result / link-preview description for the home page.
  description:
    'Kylle Nichole Actub is a full-stack web developer in Cagayan de Oro City, PH building ' +
    'web applications with Laravel, React, and MySQL, plus WordPress development and technical SEO.',

  headline: 'Building web applications that solve real problems.',
  intro:
    "I'm a full-stack web developer focused on building practical web applications " +
    'with Laravel, React, and modern web technologies, plus WordPress development ' +
    'and technical SEO for business websites.',

  email: 'kyllenichole123@gmail.com',

  // TODO: drop your résumé PDF at public/resume.pdf, then set this to '/resume.pdf'.
  //       While empty, every résumé button is hidden (no broken downloads).
  resumeUrl: '',

  socials: {
    github: 'https://github.com/ActubKylle',
    linkedin: 'https://www.linkedin.com/in/kylle-nichole-actub-4349713a4/',
  },

  // TODO: get a free access key at https://web3forms.com to enable the contact
  //       form. While unset, the Contact section shows direct links only.
  web3formsKey: '',

  // Short "what I'm up to" line for the footer (set to '' to hide).
  now: 'Open to remote full-stack and WordPress development roles.',
};

export const isFormConfigured = Boolean(siteConfig.web3formsKey);
