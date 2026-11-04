import { useId, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import Section from './Section';
import SectionHeading from './SectionHeading';
import WebsiteCard from './WebsiteCard';
import { websites, websiteCategories, websitesIntro } from '../content/websites';
import { published } from '../lib/drafts';
import { countByCategory, filterWebsites } from '../lib/filterWebsites';
import { fadeUp, inView } from '../lib/motion';

const PAGE_SIZE = 9;

const chipBase =
  'rounded-md border px-3 py-1.5 text-sm transition-colors focus-visible:outline-none ' +
  'focus-visible:ring-2 focus-visible:ring-accent';

export default function WebsiteGallery({ sites = published(websites) }) {
  const searchId = useId();
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(PAGE_SIZE);

  const counts = useMemo(() => countByCategory(sites), [sites]);
  const categories = websiteCategories.filter((c) => counts[c.id]);

  // Featured sites lead the default view; any filter or search switches to a
  // single flat result list so nothing is hidden from the results.
  const browsing = category === 'all' && !query.trim();
  const featured = browsing ? sites.filter((s) => s.featured) : [];
  const results = browsing ? sites.filter((s) => !s.featured) : filterWebsites(sites, { category, query });
  const shown = results.slice(0, limit);
  const remaining = results.length - shown.length;
  const matchCount = featured.length + results.length;

  function selectCategory(id) {
    setCategory(id);
    setLimit(PAGE_SIZE);
  }

  function updateQuery(value) {
    setQuery(value);
    setLimit(PAGE_SIZE);
  }

  function reset() {
    setCategory('all');
    setQuery('');
    setLimit(PAGE_SIZE);
  }

  return (
    <Section id="websites">
      <SectionHeading eyebrow="WordPress & web development" title={websitesIntro.title} description={websitesIntro.subtitle} />

      {/* Controls */}
      <motion.div variants={fadeUp} {...inView} className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Filter websites by category" className="flex flex-wrap gap-2">
          {[{ id: 'all', label: 'All' }, ...categories].map((c) => {
            const active = category === c.id;
            const count = c.id === 'all' ? sites.length : counts[c.id];
            return (
              <button
                key={c.id}
                type="button"
                aria-pressed={active}
                onClick={() => selectCategory(c.id)}
                className={`${chipBase} ${
                  active ? 'border-heading bg-heading text-bg' : 'border-line text-muted hover:border-muted hover:text-ink'
                }`}
              >
                {c.label} <span className={active ? 'opacity-70' : 'text-muted/80'}>{count}</span>
              </button>
            );
          })}
        </div>

        <div className="relative w-full lg:max-w-xs">
          <label htmlFor={searchId} className="sr-only">
            Search websites
          </label>
          <Search size={16} aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(e) => updateQuery(e.target.value)}
            placeholder="Search by name, platform, or task"
            className="w-full rounded-md border border-line bg-surface py-2 pl-9 pr-9 text-sm text-ink placeholder:text-muted/80 focus:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => updateQuery('')}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <X size={14} aria-hidden="true" />
            </button>
          )}
        </div>
      </motion.div>

      <p role="status" aria-live="polite" className="mt-5 text-sm text-muted">
        {browsing
          ? `${sites.length} ${sites.length === 1 ? 'website' : 'websites'} listed. ${websitesIntro.note}`
          : `${matchCount} ${matchCount === 1 ? 'match' : 'matches'}`}
      </p>

      {/* Featured */}
      {featured.length > 0 && (
        <ul className="mt-8 space-y-6" aria-label="Featured websites">
          {featured.map((site) => (
            <li key={site.slug}>
              <WebsiteCard site={site} featured />
            </li>
          ))}
        </ul>
      )}

      {/* Grid */}
      {shown.length > 0 && (
        <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-label="Websites">
          {shown.map((site) => (
            <li key={site.slug} className="flex">
              <WebsiteCard site={site} />
            </li>
          ))}
        </ul>
      )}

      {matchCount === 0 && (
        <div className="mt-8 rounded-lg border border-dashed border-line px-6 py-12 text-center">
          <p className="text-heading">No websites match your filters.</p>
          <button
            type="button"
            onClick={reset}
            className="mt-3 rounded text-sm font-medium text-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Clear filters
          </button>
        </div>
      )}

      {remaining > 0 && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setLimit((l) => l + PAGE_SIZE)}
            className="rounded-md border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Show more ({remaining} more)
          </button>
        </div>
      )}
    </Section>
  );
}
