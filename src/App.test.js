import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the hero headline', () => {
  render(<App />);
  expect(
    screen.getByRole('heading', { level: 1, name: /building web applications that solve real problems/i })
  ).toBeInTheDocument();
});

test('renders primary navigation with the main sections', () => {
  render(<App />);
  const nav = screen.getByRole('navigation', { name: /primary/i });
  expect(nav).toBeInTheDocument();
  expect(screen.getAllByRole('link', { name: 'Projects' })[0]).toHaveAttribute('href', '#projects');
  expect(screen.getAllByRole('link', { name: 'Contact' })[0]).toHaveAttribute('href', '#contact');
});

test('hero links to projects and contact', () => {
  render(<App />);
  expect(screen.getByRole('link', { name: /view projects/i })).toHaveAttribute('href', '#projects');
  expect(screen.getByRole('link', { name: /contact me/i })).toHaveAttribute('href', '#contact');
});

test('renders the HTTA case study for its hash route', () => {
  window.location.hash = '#/projects/htta';
  render(<App />);
  expect(screen.getByRole('heading', { level: 1, name: /htta enrollment management system/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 2, name: /database design/i })).toBeInTheDocument();
  window.location.hash = '';
});
