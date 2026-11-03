import { motion } from 'framer-motion';
import Picture from './Picture';
import { DraftBadge, TagList } from './Tag';
import { ProjectLinks } from './FeaturedProject';
import { fadeUp, inView } from '../lib/motion';

// Supporting application card: screenshot, summary, features, role, links.
export default function ProjectRow({ project }) {
  const { category, title, blurb, role, features = [], tech, image, draft } = project;

  return (
    <motion.article variants={fadeUp} {...inView} className="flex w-full flex-col overflow-hidden rounded-lg border border-line bg-surface">
      <div className="border-b border-line bg-bg">
        {image ? (
          <Picture
            image={image}
            alt={`Screenshot of ${title}`}
            sizes="(min-width: 768px) 560px, 100vw"
            className="aspect-[16/9] w-full object-cover object-top"
          />
        ) : (
          <div className="flex aspect-[16/9] w-full items-center justify-center text-sm text-muted">Screenshot pending</div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
          <span>{category}</span>
          {draft && <DraftBadge className="ml-auto" />}
        </div>
        <h3 className="mt-2 text-lg font-semibold tracking-tight text-heading">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{blurb}</p>

        {features.length > 0 && (
          <ul className="mt-4 space-y-1.5 text-sm text-ink" aria-label="Key features">
            {features.map((f) => (
              <li key={f} className="flex gap-2.5">
                <span aria-hidden="true" className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                {f}
              </li>
            ))}
          </ul>
        )}

        {role && (
          <p className="mt-4 text-sm text-muted">
            <span className="font-medium text-ink">Role:</span> {role}
          </p>
        )}

        <TagList items={tech} className="mt-4" />
        <div className="mt-auto pt-6">
          <ProjectLinks project={project} />
        </div>
      </div>
    </motion.article>
  );
}
