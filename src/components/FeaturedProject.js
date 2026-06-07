import { motion } from 'framer-motion';
import { ArrowUpRight, Check, Github } from 'lucide-react';
import HeroVisual from './HeroVisual';
import { fadeUp, inView } from '../lib/motion';

// Flagship case study: a larger, story-driven layout (Overview → Problem →
// What I built → highlights). Falls back to the system-diagram visual when no
// screenshot is set.
export default function FeaturedProject({ project }) {
  const { category, title, blurb, problem, solution, highlights, tech, links, image } = project;

  return (
    <motion.article
      variants={fadeUp}
      {...inView}
      className="relative overflow-hidden rounded-3xl border border-line bg-gradient-to-b from-surface to-bg p-6 shadow-2xl sm:p-10"
    >
      {/* soft accent glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
      />

      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Narrative */}
        <div className="order-2 lg:order-1">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-xs text-accent">
              ★ Flagship
            </span>
            {category && <span className="font-mono text-xs text-muted">{category}</span>}
          </div>

          <h3 className="mt-4 text-2xl font-semibold tracking-tight text-heading sm:text-3xl">
            {title}
          </h3>
          <p className="mt-3 leading-relaxed text-muted">{blurb}</p>

          {problem && (
            <div className="mt-6">
              <p className="font-mono text-xs text-accent">the problem</p>
              <p className="mt-1.5 leading-relaxed text-ink">{problem}</p>
            </div>
          )}
          {solution && (
            <div className="mt-4">
              <p className="font-mono text-xs text-accent">what i built</p>
              <p className="mt-1.5 leading-relaxed text-ink">{solution}</p>
            </div>
          )}

          {highlights?.length > 0 && (
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-sm text-muted">
                  <Check size={16} className="mt-0.5 flex-shrink-0 text-accent" aria-hidden="true" />
                  {h}
                </li>
              ))}
            </ul>
          )}

          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tech used">
            {tech.map((t) => (
              <li key={t} className="rounded border border-line px-2 py-1 font-mono text-xs text-muted">
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap gap-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${link.label} for ${title} (opens in a new tab)`}
                className="inline-flex items-center gap-1.5 rounded text-sm font-medium text-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {link.type === 'demo' ? (
                  <ArrowUpRight size={16} aria-hidden="true" />
                ) : (
                  <Github size={16} aria-hidden="true" />
                )}
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Visual */}
        <div className="order-1 flex justify-center text-accent lg:order-2">
          {image ? (
            <div className="w-full overflow-hidden rounded-xl border border-line">
              <img
                src={image}
                alt={`Screenshot of ${title}`}
                loading="lazy"
                decoding="async"
                className="w-full object-cover"
              />
            </div>
          ) : (
            <HeroVisual />
          )}
        </div>
      </div>
    </motion.article>
  );
}
