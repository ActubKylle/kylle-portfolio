// =============================================================================
// WEBSITES I'VE WORKED ON — website development, WordPress customization,
// maintenance & technical SEO.
//
// To add a site: capture a thumbnail with
//   py scripts/make-thumbnail.py --url https://site.com --out public/images/websites/<slug>
// then copy an entry below. Use `draft: true` while details are unconfirmed,
// and `client: { confidential: true }` to hide a client's name and link.
// `platform` lists only what was verified on the live site.
// =============================================================================

export const websitesIntro = {
  title: "Websites I've Worked On",
  subtitle:
    "A collection of website development, WordPress customization, " +
    "website maintenance, and technical SEO projects.",
  note: "Each card lists my own contribution to that site.",
};

export const websiteCategories = [
  { id: "business", label: "Business & Corporate" },
  { id: "landing", label: "Landing Pages & Marketing" },
  { id: "ecommerce", label: "E-commerce" },
  { id: "content", label: "Blogs & Content" },
  { id: "saas", label: "SaaS & Technology" },
];

export const websites = [
  // =========================================================
  // FEATURED
  // =========================================================
  {
    slug: "funnel-digital-marketing",
    title: "Funnel Digital Marketing",
    client: { name: "Funnel Digital Marketing", confidential: false },
    url: "https://funneldigitalmarketing.com/",
    showLink: true,
    category: "business",
    type: "Digital marketing agency website",
    // Verified from the live site's HTML.
    platform: ["WordPress", "WPBakery", "Salient Theme", "Yoast SEO"],
    contributions: [
      "WordPress website development and customization",
      "WPBakery page implementation",
      "Responsive layout implementation",
      "Website content and page structure updates",
      "Technical SEO improvements",
    ],
    year: "",
    featured: true,
    image: { base: "/images/websites/funnel-digital-marketing", width: 1280, height: 800 },
    caseStudy: {
      overview:
        "A WordPress website for a full-funnel digital marketing agency, presenting " +
        "its services, case studies, and insights to prospective clients.",
      role: "WordPress Developer (agency project)",
      builder: ["WPBakery page implementation and customization", "Website page updates"],
      responsive: ["Responsive layout adjustments"],
      seo: ["Technical SEO improvements"],
      performance: [],
      screenshots: [],
      pagespeed: [],
    },
  },
  {
    slug: "influencer-marketing-ai",
    title: "InfluencerMarketing.ai",
    client: { name: "InfluencerMarketing.ai", confidential: false },
    url: "https://influencermarketing.ai/",
    showLink: true,
    category: "saas",
    type: "Influencer marketing SaaS website",
    // Verified from the live site's HTML.
    platform: ["WordPress", "Elementor"],
    contributions: ["Website content implementation", "Website updates", "Page maintenance"],
    year: "",
    featured: true,
    image: { base: "/images/websites/influencer-marketing-ai", width: 1280, height: 800 },
    caseStudy: null,
  },

  // =========================================================
  // OTHER SITES
  // =========================================================
  {
    slug: "gymverse",
    title: "Gymverse",
    client: { name: "Gymverse", confidential: false },
    url: "https://gymverse.com/",
    showLink: true,
    category: "business",
    type: "Fitness equipment brand website",
    // Verified from the live site's HTML.
    platform: ["WordPress"],
    contributions: ["Website content implementation", "Website updates and maintenance", "Page updates"],
    year: "",
    featured: false,
    image: { base: "/images/websites/gymverse", width: 1280, height: 800 },
    caseStudy: null,
  },
  {
    slug: "mdhair",
    title: "MDhair",
    client: { name: "MDhair", confidential: false },
    url: "https://www.mdhair.co/",
    showLink: true,
    category: "ecommerce",
    type: "Hair care brand website",
    // The live site is not WordPress (custom build), so no platform is claimed.
    // TODO: add the tools you actually used here, if any.
    platform: [],
    contributions: ["Website content implementation", "Website updates and maintenance", "Page updates"],
    year: "",
    featured: false,
    image: { base: "/images/websites/mdhair", width: 1280, height: 800 },
    caseStudy: null,
  },
  {
    slug: "velaro",
    title: "Velaro",
    client: { name: "Velaro", confidential: false },
    url: "https://velaro.com/",
    showLink: true,
    category: "saas",
    type: "Customer engagement software website",
    // The live site runs on Webflow, not WordPress, so no platform is claimed.
    // TODO: add 'Webflow' if you worked in it.
    platform: [],
    contributions: ["Website content implementation", "Website maintenance", "Website updates"],
    year: "",
    featured: false,
    image: { base: "/images/websites/velaro", width: 1280, height: 800 },
    caseStudy: null,
  },
  {
    // TODO: add the live URL + screenshot, then set featured back to true.
    slug: "warvena-construction",
    title: "Warvena Construction",
    client: { name: "Warvena Construction", confidential: false },
    url: "",
    showLink: false,
    category: "business",
    type: "Construction company website",
    platform: ["WordPress", "Elementor", "HTML", "CSS", "JavaScript"],
    contributions: [
      "Website page implementation",
      "Frontend customization",
      "Responsive design adjustments",
      "Website content and layout updates",
    ],
    year: "",
    featured: false,
    image: null,
    caseStudy: null,
  },
];

export function categoryLabel(id) {
  return websiteCategories.find((category) => category.id === id)?.label ?? id;
}
