// =============================================================================
// WEBSITES I'VE WORKED ON — WordPress development, customization & technical SEO.
//
// HOW TO ADD A WEBSITE
//   1. Capture a thumbnail:
//        py scripts/make-thumbnail.py --url https://site.com --out public/images/websites/<slug>
//      (paste the printed `image:` line below)
//   2. Copy the template at the bottom of this file into `websites`, fill it in.
//   3. Only list contributions you actually did. Keep `draft: true` until every
//      field is accurate — drafts show in `npm start` and are hidden in builds.
//
// FIELDS
//   slug          unique, url-safe id (also the case-study URL: #/websites/<slug>)
//   title         site name — or an anonymized title, e.g. 'Business Website'
//   client        { name, confidential }  confidential → name/link never shown
//   url, showLink live URL; showLink:false hides it (e.g. no permission)
//   category      one of websiteCategories[].id
//   type          short descriptor shown under the title
//   platform      verified stack (theme, builder, plugins)
//   contributions what YOU did — never the whole site unless you built it
//   year          optional, e.g. '2025'
//   featured      shown large at the top of the gallery
//   image         { base, width, height } | null
//   caseStudy     optional, see the Funnel entry for the supported fields
// =============================================================================

export const websitesIntro = {
  title: "Websites I've Worked On",
  subtitle:
    'Over 40 website projects involving business websites, landing pages, content ' +
    'platforms, and digital experiences.',
  note:
    'Some client sites are listed without names or links to respect client ' +
    'confidentiality.',
};

export const websiteCategories = [
  { id: 'business', label: 'Business & Corporate' },
  { id: 'landing', label: 'Landing Pages & Marketing' },
  { id: 'ecommerce', label: 'E-commerce' },
  { id: 'content', label: 'Blogs & Content' },
  { id: 'saas', label: 'SaaS & Technology' },
];

export const websites = [
  {
    // TODO: confirm/edit `contributions` (they are the "to verify" list you gave
    //       me — I can't see from the live site which parts you built), then
    //       remove `draft`. Platform was detected from the live site's HTML.
    draft: true,
    slug: 'funnel-digital-marketing',
    title: 'Funnel Digital Marketing',
    client: { name: 'Funnel Digital Marketing', confidential: false },
    url: 'https://funneldigitalmarketing.com/',
    showLink: true,
    category: 'business',
    type: 'Digital marketing agency website',
    platform: ['WordPress', 'WPBakery', 'Salient theme', 'Yoast SEO'],
    contributions: [
      'WordPress page implementation and customization',
      'Responsive page layouts',
      'Service page implementation',
      'Website content structure',
      'Technical SEO improvements',
    ],
    year: '', // TODO
    featured: true,
    image: { base: '/images/websites/funnel-digital-marketing', width: 1280, height: 800 },
    caseStudy: {
      overview: '', // TODO: 2–3 sentences — what the site is and what you were asked to do.
      role: '', // TODO: e.g. 'WordPress developer (agency team)'
      builder: [], // TODO: WPBakery work you did, e.g. 'Built service page templates'
      responsive: [], // TODO: responsive fixes/layouts you implemented
      seo: [], // TODO: technical SEO tasks you performed
      performance: [], // TODO: optimizations you made
      // Before/after screenshots: [{ label: 'Before', base, width, height }, …]
      screenshots: [],
      // Only real, measured results. Include tool, device, and date.
      // [{ label: 'Mobile performance', before: 48, after: 86, tool: 'PageSpeed Insights', date: '2025-08-01' }]
      pagespeed: [],
    },
  },

  // ---------------------------------------------------------------------------
  // PLACEHOLDER SLOTS — one per category so you can see the grid, filters, and
  // search in `npm start`. Replace each with a real site (or delete it).
  // Never shipped: drafts are removed from production builds.
  // ---------------------------------------------------------------------------
  ...websiteCategoriesPlaceholder(),

  // ---------------------------------------------------------------------------
  // TEMPLATE — copy, fill in, and remove `draft` when accurate.
  //
  // {
  //   draft: true,
  //   slug: 'confidential-business-site-1',
  //   title: 'Business Website',                 // or the real site name
  //   client: { name: '', confidential: true },  // confidential → "Confidential client"
  //   url: '',
  //   showLink: false,
  //   category: 'business',                      // business | landing | ecommerce | content | saas
  //   type: 'Construction company website',
  //   platform: ['WordPress', 'Elementor'],
  //   contributions: ['Built homepage and service pages in Elementor', 'On-page SEO'],
  //   year: '2025',
  //   featured: false,
  //   image: null,
  //   caseStudy: null,
  // },
  // ---------------------------------------------------------------------------
];

function websiteCategoriesPlaceholder() {
  return websiteCategories.map((c, i) => ({
    draft: true,
    slug: `placeholder-${c.id}`,
    title: `Placeholder ${i + 1}: add a real ${c.label.toLowerCase()} site`,
    client: { name: '', confidential: true },
    url: '',
    showLink: false,
    category: c.id,
    type: 'TODO: short description',
    platform: ['WordPress'],
    contributions: ['TODO: what you did on this site'],
    year: '',
    featured: false,
    image: null,
    caseStudy: null,
  }));
}

export function categoryLabel(id) {
  return websiteCategories.find((c) => c.id === id)?.label ?? id;
}
