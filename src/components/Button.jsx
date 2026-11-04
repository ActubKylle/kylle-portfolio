// Polymorphic button: renders an <a> when `href` is provided, otherwise a
// <button>. Centralizes focus styles and variants so every CTA is consistent
// and accessible.

const base =
  'inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 ' +
  'text-sm font-medium transition-[color,background-color,border-color,opacity] ' +
  'duration-200 focus-visible:outline-none focus-visible:ring-2 ' +
  'focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-60';

const variants = {
  primary: 'bg-heading text-bg hover:opacity-90',
  ghost: 'border border-line text-ink hover:border-muted hover:text-heading',
};

export default function Button({
  variant = 'primary',
  href,
  external = false,
  download,
  className = '',
  children,
  ...props
}) {
  const cls = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        download={download}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={cls}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}
