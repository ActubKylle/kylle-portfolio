import { useState } from 'react';
import { X } from 'lucide-react';
import { projects } from '../content/projects';
import { websites } from '../content/websites';
import { experience, education } from '../content/about';
import { SHOW_DRAFTS, countDrafts } from '../lib/drafts';

// Development-only reminder of how much content is still marked `draft`.
// Never rendered in production builds.
export default function DraftNotice() {
  const [open, setOpen] = useState(true);
  const count = countDrafts(projects, websites, experience, education);
  if (!SHOW_DRAFTS || !open || count === 0) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40 flex max-w-xs items-start gap-3 rounded-lg border border-dashed border-amber-500/60 bg-bg/95 px-4 py-3 text-xs text-ink shadow-lg backdrop-blur">
      <p>
        <span className="font-medium text-amber-600 dark:text-amber-400">Dev only:</span> {count} draft{' '}
        {count === 1 ? 'entry is' : 'entries are'} visible here and hidden in production. Fill them in under{' '}
        <code className="font-mono">src/content/</code>.
      </p>
      <button
        type="button"
        onClick={() => setOpen(false)}
        aria-label="Dismiss draft notice"
        className="rounded p-0.5 text-muted hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <X size={14} aria-hidden="true" />
      </button>
    </div>
  );
}
