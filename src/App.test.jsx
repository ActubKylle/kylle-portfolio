import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { listPages, resolvePage } from './lib/pages';

afterEach(() => window.history.replaceState(null, '', '/'));

test('renders the hero headline', () => {
  render(<App path="/" />);
  expect(
    screen.getByRole('heading', { level: 1, name: /building web applications that solve real problems/i })
  ).toBeInTheDocument();
});

test('renders primary navigation with the main sections', () => {
  render(<App path="/" />);
  const nav = screen.getByRole('navigation', { name: /primary/i });
  expect(nav).toBeInTheDocument();
  expect(screen.getAllByRole('link', { name: 'Projects' })[0]).toHaveAttribute('href', '/#projects');
  expect(screen.getAllByRole('link', { name: 'Contact' })[0]).toHaveAttribute('href', '/#contact');
});

test('hero links to projects and contact', () => {
  render(<App path="/" />);
  expect(screen.getByRole('link', { name: /view projects/i })).toHaveAttribute('href', '#projects');
  expect(screen.getByRole('link', { name: /contact me/i })).toHaveAttribute('href', '#contact');
});

test('renders the HTTA case study at its own path', () => {
  render(<App path="/projects/htta" />);
  expect(screen.getByRole('heading', { level: 1, name: /htta enrollment management system/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 2, name: /database design/i })).toBeInTheDocument();
});

test('opens a case study from the home page without a full reload', () => {
  render(<App />);
  fireEvent.click(screen.getAllByRole('link', { name: /case study/i })[0]);
  expect(window.location.pathname).toBe('/projects/htta');
  expect(screen.getByRole('heading', { level: 1, name: /htta enrollment management system/i })).toBeInTheDocument();
});

test('shows a not-found page for unknown paths', () => {
  render(<App path="/projects/does-not-exist" />);
  expect(screen.getByRole('heading', { level: 1, name: /page not found/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /back to home/i })).toHaveAttribute('href', '/');
});

test('every listed page resolves to itself with a title and description', () => {
  const pages = listPages();
  expect(pages.map((p) => p.path)).toContain('/projects/htta');
  for (const page of pages) {
    expect(resolvePage(page.path)).toMatchObject({ path: page.path, kind: page.kind });
    expect(page.title).toBeTruthy();
    expect(page.description).toBeTruthy();
  }
});
