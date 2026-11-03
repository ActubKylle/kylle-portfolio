import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Picture from './Picture';
import { DraftBadge, TagList } from './Tag';
import { categoryLabel } from '../content/websites';

const linkClass =
  'inline-flex items-center gap-1 rounded text-sm font-medium underline-offset-4 hover:underline ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent';

export function clientLine(site) {
  return site.client?.confidential ? `${site.type} · Confidential client` : site.type;
}

// One website in the gallery. `featured` renders a wide, image-led layout;
// the default is the compact grid card.
export default function WebsiteCard({ site, featured = false }) {
  const { title, category, year, contributions = [], platform, image, url, showLink, caseStudy, draft } = site;
  const canLink = showLink && url && !site.client?.confidential;
  const shownContributions = featured ? contributions : contributions.slice(0, 3);

  return (
    <article
      className={`group flex w-full overflow-hidden rounded-lg border border-line bg-surface ${
        featured ? 'flex-col lg:grid lg:grid-cols-[1.35fr_1fr]' : 'flex-col'
      }`}
    >
      <div className={`overflow-hidden bg-bg ${featured ? 'border-b border-line lg:flex lg:items-center lg:border-b-0 lg:border-r' : 'border-b border-line'}`}>
        {image ? (
          <Picture
            image={image}
            alt={`Screenshot of the ${title} website`}
            sizes={featured ? '(min-width: 1024px) 640px, 100vw' : '(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw'}
            className="aspect-[16/10] w-full object-cover object-left-top transition-transform duration-500 ease-out group-hover:scale-[1.015]"
          />
        ) : (
          <div className="flex aspect-[16/10] w-full items-center justify-center text-sm text-muted">
            Screenshot pending
          </div>
        )}
      </div>

      <div className={`flex flex-1 flex-col ${featured ? 'p-6 sm:p-8' : 'p-5'}`}>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted">
          <span>{categoryLabel(category)}</span>
          {year && (
            <>
              <span aria-hidden="true">·</span>
              <span>{year}</span>
            </>
          )}
          {draft && <DraftBadge className="ml-auto" />}
        </div>

        <h3 className={`mt-2 font-semibold tracking-tight text-heading ${featured ? 'text-xl sm:text-2xl' : 'text-base'}`}>
          {title}
        </h3>
        <p className="mt-1 text-sm text-muted">{clientLine(site)}</p>

        {shownContributions.length > 0 && (
          <div className="mt-4">
            <p className="text-xs font-medium uppercase tracking-wide text-muted">My contribution</p>
            <ul className="mt-2 space-y-1.5 text-sm text-ink">
              {shownContributions.map((c) => (
                <li key={c} className="flex gap-2">
                  <span aria-hidden="true" className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        )}

        <TagList items={platform} label="Platform and tools" className="mt-4" />

        {(canLink || caseStudy) && (
          <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-5">
            {caseStudy && (
              <a href={`#/websites/${site.slug}`} className={`${linkClass} text-accent`}>
                Case study <ArrowRight size={15} aria-hidden="true" />
              </a>
            )}
            {canLink && (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${title} (opens in a new tab)`}
                className={`${linkClass} text-ink hover:text-accent`}
              >
                Visit site <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
