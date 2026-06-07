import { motion } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import { fadeUp, inView } from '../lib/motion';

// One project, as a full-width alternating row (media + content).
export default function ProjectRow({ project, reversed = false }) {
  const { category, title, blurb, role, tech, repo, demo, image } = project;

  return (
    <motion.article
      variants={fadeUp}
      {...inView}
      className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
    >
      {/* Media */}
      <div className={reversed ? 'lg:order-2' : ''}>
        <div className="overflow-hidden rounded-xl border border-line bg-surface">
          {/* Faux browser chrome for a polished, intentional frame */}
          <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
          </div>
          {image ? (
            <img
              src={image}
              alt={`Screenshot of ${title}`}
              loading="lazy"
              decoding="async"
              className="aspect-video w-full object-cover"
            />
          ) : (
            <div className="flex aspect-video w-full items-center justify-center">
              <span className="font-mono text-sm text-muted">screenshot coming soon</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className={reversed ? 'lg:order-1' : ''}>
        {category && <p className="mb-2 font-mono text-xs text-accent">{category}</p>}
        <h3 className="text-xl font-semibold tracking-tight text-heading">{title}</h3>
        <p className="mt-3 leading-relaxed text-muted">{blurb}</p>

        {role && (
          <p className="mt-4 text-sm text-muted">
            <span className="font-mono text-accent">built</span> &nbsp;{role}
          </p>
        )}

        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tech used">
          {tech.map((t) => (
            <li
              key={t}
              className="rounded border border-line px-2 py-1 font-mono text-xs text-muted"
            >
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-5">
          {demo && (
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Live demo of ${title} (opens in a new tab)`}
              className="inline-flex items-center gap-1.5 rounded text-sm font-medium text-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Live demo <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          )}
          {repo && (
            <a
              href={repo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Source code for ${title} on GitHub (opens in a new tab)`}
              className="inline-flex items-center gap-1.5 rounded text-sm font-medium text-ink underline-offset-4 hover:text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Github size={16} aria-hidden="true" /> Code
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
