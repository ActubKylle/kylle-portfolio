import { Moon, Sun } from 'lucide-react';

// Accessible light/dark toggle. Icon and label switch with the `dark` class on
// <html> (CSS only), so the prerendered markup is the same for every visitor.
export default function ThemeToggle({ onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="rounded-lg p-2 text-muted transition-colors hover:bg-surface hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <span className="sr-only dark:hidden">Switch to dark theme</span>
      <span className="sr-only hidden dark:inline">Switch to light theme</span>
      <Sun size={20} aria-hidden="true" className="hidden dark:block" />
      <Moon size={20} aria-hidden="true" className="dark:hidden" />
    </button>
  );
}
