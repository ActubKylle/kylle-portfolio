import { categoryLabel } from '../content/websites';

// Text a site can be found by: title, client, type, category, stack, contributions.
function searchableText(site) {
  return [
    site.title,
    site.client?.confidential ? '' : site.client?.name,
    site.type,
    categoryLabel(site.category),
    ...(site.platform ?? []),
    ...(site.contributions ?? []),
  ]
    .join(' ')
    .toLowerCase();
}

// Every whitespace-separated term must match somewhere (AND search).
export function filterWebsites(sites, { category = 'all', query = '' } = {}) {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  return sites.filter(
    (site) =>
      (category === 'all' || site.category === category) &&
      terms.every((term) => searchableText(site).includes(term))
  );
}

export function countByCategory(sites) {
  return sites.reduce((counts, site) => {
    counts[site.category] = (counts[site.category] ?? 0) + 1;
    return counts;
  }, {});
}
