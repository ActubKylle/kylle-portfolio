// Small label chips used for tech stacks and categories.
export function TagList({ items, label = 'Technologies', className = '' }) {
  if (!items?.length) return null;
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`} aria-label={label}>
      {items.map((item) => (
        <li key={item} className="rounded-md border border-line px-2 py-0.5 text-xs text-muted">
          {item}
        </li>
      ))}
    </ul>
  );
}

// Visible only in development: marks content that is hidden from production.
export function DraftBadge({ className = '' }) {
  return (
    <span
      className={`inline-flex items-center rounded-md border border-dashed border-amber-500/60 bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-600 dark:text-amber-400 ${className}`}
      title="Draft: hidden in production until the details are filled in"
    >
      Draft
    </span>
  );
}
