// =============================================================================
// TECHNICAL SEO — practical skills only. Each line describes the work involved,
// not a result. Add measured outcomes to individual website case studies.
// =============================================================================

export const seoIntro =
  'Alongside development, I handle the technical side of SEO on WordPress sites: ' +
  'making sure pages can be crawled, indexed, and loaded quickly.';

export const seoGroups = [
  {
    title: 'Audits',
    items: [
      { name: 'Technical SEO audits', detail: 'Review a site for crawl, index, metadata, and speed issues, then prioritize fixes.' },
      { name: 'Broken link identification', detail: 'Find broken internal and outbound links and fix or redirect them.' },
    ],
  },
  {
    title: 'Crawling & indexing',
    items: [
      { name: 'Crawlability and indexability', detail: 'Check which pages search engines can reach and index, and why others cannot.' },
      { name: 'XML sitemap management', detail: 'Keep sitemaps limited to canonical, indexable URLs.' },
      { name: 'Robots.txt', detail: 'Control crawler access without blocking important pages or assets.' },
      { name: 'Redirect management', detail: 'Set up 301 redirects for moved pages and clean up redirect chains.' },
    ],
  },
  {
    title: 'On-page',
    items: [
      { name: 'Heading structure', detail: 'One clear H1 per page and a logical heading hierarchy.' },
      { name: 'Metadata optimization', detail: 'Write unique titles and meta descriptions that match page intent.' },
    ],
  },
  {
    title: 'Performance',
    items: [
      { name: 'Website speed optimization', detail: 'Reduce page weight: images, caching, and unused scripts and styles.' },
      { name: 'Core Web Vitals monitoring', detail: 'Track LCP, INP, and CLS and investigate regressions.' },
    ],
  },
];
