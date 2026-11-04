import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Github } from 'lucide-react';
import ArchitectureDiagram from './ArchitectureDiagram';
import Picture from './Picture';
import { DraftBadge, TagList } from './Tag';
import { fadeUp, inView } from '../lib/motion';

export const projectLinkClass =
  'inline-flex items-center gap-1.5 rounded text-sm font-medium underline-offset-4 hover:underline ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent';

export function ProjectLinks({ project }) {
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-2">
      {project.caseStudy && (
        <a href={`/projects/${project.slug}`} className={`${projectLinkClass} text-accent`}>
          Read the case study <ArrowRight size={15} aria-hidden="true" />
        </a>
      )}
      {project.links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${link.label} for ${project.title} (opens in a new tab)`}
          className={`${projectLinkClass} text-ink hover:text-accent`}
        >
          {link.type === 'demo' ? <ArrowUpRight size={15} aria-hidden="true" /> : <Github size={15} aria-hidden="true" />}
          {link.label}
        </a>
      ))}
    </div>
  );
}

// Flagship application: overview, key features, role, stack, and a visual
// (screenshot when available, otherwise the real system architecture).
export default function FeaturedProject({ project }) {
  const { category, title, blurb, role, features, tech, image, draft } = project;

  return (
    <motion.article variants={fadeUp} {...inView} className="rounded-lg border border-line bg-surface p-6 sm:p-8">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
        <div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
            <span className="font-medium text-accent">Featured</span>
            <span aria-hidden="true">·</span>
            <span>{category}</span>
            {draft && <DraftBadge />}
          </div>

          <h3 className="mt-3 text-2xl font-semibold tracking-tight text-heading sm:text-[1.75rem]">{title}</h3>
          <p className="mt-3 leading-relaxed text-muted">{blurb}</p>

          <dl className="mt-6 space-y-4 text-sm">
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-muted">My role</dt>
              <dd className="mt-1 text-ink">{role}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-muted">Key features</dt>
              <dd>
                <ul className="mt-2 space-y-1.5 text-ink">
                  {features.map((f) => (
                    <li key={f} className="flex gap-2.5">
                      <span aria-hidden="true" className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                      {f}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>

          <TagList items={tech} className="mt-6" />
          <div className="mt-7">
            <ProjectLinks project={project} />
          </div>
        </div>

        <div className="self-center">
          {image ? (
            <div className="overflow-hidden rounded-md border border-line">
              <Picture image={image} alt={`Screenshot of ${title}`} className="w-full" />
            </div>
          ) : (
            <ArchitectureDiagram />
          )}
        </div>
      </div>
    </motion.article>
  );
}
