import { fireEvent, render, screen, within } from '@testing-library/react';
import WebsiteGallery from './WebsiteGallery';
import { filterWebsites } from '../lib/filterWebsites';

const site = (overrides) => ({
  slug: overrides.title.toLowerCase().replace(/\s+/g, '-'),
  client: { name: overrides.title, confidential: false },
  url: '',
  showLink: false,
  type: 'Website',
  platform: ['WordPress'],
  contributions: ['Page implementation'],
  featured: false,
  image: null,
  caseStudy: null,
  ...overrides,
});

const fixtures = [
  site({ title: 'Agency Site', category: 'business', featured: true, platform: ['WordPress', 'WPBakery'] }),
  site({ title: 'Shop One', category: 'ecommerce', platform: ['WordPress', 'WooCommerce'] }),
  site({ title: 'Launch Page', category: 'landing', platform: ['WordPress', 'Elementor'] }),
  site({ title: 'Secret Corp', category: 'business', client: { name: 'Secret Corp', confidential: true } }),
  ...Array.from({ length: 10 }, (_, i) => site({ title: `Blog ${i + 1}`, category: 'content' })),
];

describe('filterWebsites', () => {
  test('filters by category', () => {
    expect(filterWebsites(fixtures, { category: 'ecommerce' }).map((s) => s.title)).toEqual(['Shop One']);
  });

  test('matches every search term across title and platform', () => {
    expect(filterWebsites(fixtures, { query: 'launch elementor' }).map((s) => s.title)).toEqual(['Launch Page']);
    expect(filterWebsites(fixtures, { query: 'launch woocommerce' })).toHaveLength(0);
  });

  test('never matches on a confidential client name', () => {
    const secret = site({ title: 'Business Website', category: 'business', client: { name: 'Hidden Ltd', confidential: true } });
    expect(filterWebsites([secret], { query: 'hidden' })).toHaveLength(0);
  });
});

describe('WebsiteGallery', () => {
  test('shows featured sites, paginates the rest, and loads more', () => {
    render(<WebsiteGallery sites={fixtures} />);
    expect(within(screen.getByRole('list', { name: 'Featured websites' })).getByText('Agency Site')).toBeInTheDocument();

    const grid = screen.getByRole('list', { name: 'Websites' });
    expect(within(grid).getAllByRole('article')).toHaveLength(9);

    fireEvent.click(screen.getByRole('button', { name: /show more/i }));
    expect(within(screen.getByRole('list', { name: 'Websites' })).getAllByRole('article')).toHaveLength(13);
    expect(screen.queryByRole('button', { name: /show more/i })).not.toBeInTheDocument();
  });

  test('category filter narrows results and marks the active chip', () => {
    render(<WebsiteGallery sites={fixtures} />);
    const chip = screen.getByRole('button', { name: /e-commerce/i });
    fireEvent.click(chip);

    expect(chip).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('status')).toHaveTextContent('1 match');
    expect(screen.getByText('Shop One')).toBeInTheDocument();
    expect(screen.queryByText('Launch Page')).not.toBeInTheDocument();
  });

  test('search with no results offers a reset', () => {
    render(<WebsiteGallery sites={fixtures} />);
    fireEvent.change(screen.getByRole('searchbox', { name: /search websites/i }), { target: { value: 'zzz' } });
    expect(screen.getByText(/no websites match/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /clear filters/i }));
    expect(screen.getByRole('list', { name: 'Featured websites' })).toBeInTheDocument();
  });

  test('confidential sites hide the client name and live link', () => {
    render(<WebsiteGallery sites={fixtures} />);
    expect(screen.getByText(/Confidential client/)).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /visit secret corp/i })).not.toBeInTheDocument();
  });
});
