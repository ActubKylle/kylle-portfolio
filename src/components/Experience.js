import { motion } from 'framer-motion';
import Section from './Section';
import SectionHeading from './SectionHeading';
import { DraftBadge } from './Tag';
import { education, experience } from '../content/about';
import { published } from '../lib/drafts';
import { fadeUp, inView } from '../lib/motion';

function Entry({ as: Heading = 'h3', title, org, period, summary, highlights = [], draft }) {
  return (
    <li className="grid gap-2 border-t border-line py-6 sm:grid-cols-[12rem_1fr] sm:gap-8">
      <p className="text-sm text-muted">{period}</p>
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <Heading className="font-semibold text-heading">{title}</Heading>
          {draft && <DraftBadge />}
        </div>
        <p className="text-sm text-muted">{org}</p>
        {summary && <p className="mt-2 text-sm leading-relaxed text-ink">{summary}</p>}
        {highlights.length > 0 && (
          <ul className="mt-3 space-y-1.5 text-sm text-ink">
            {highlights.map((h) => (
              <li key={h} className="flex gap-2.5">
                <span aria-hidden="true" className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                {h}
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
}

export default function Experience() {
  const jobs = published(experience);
  const schools = published(education);

  return (
    <Section id="experience">
      <SectionHeading eyebrow="Experience" title="Where I've worked" />

      {jobs.length > 0 && (
        <motion.ul variants={fadeUp} {...inView} aria-label="Work experience">
          {jobs.map((job) => (
            <Entry key={`${job.role}-${job.org}`} title={job.role} {...job} />
          ))}
        </motion.ul>
      )}

      {schools.length > 0 && (
        <motion.div variants={fadeUp} {...inView} className="mt-12">
          <h3 className="mb-2 text-sm font-semibold text-heading">Education</h3>
          <ul aria-label="Education">
            {schools.map((s) => (
              <Entry key={s.degree} as="h4" title={s.degree} org={s.school} period={s.period} draft={s.draft} />
            ))}
          </ul>
        </motion.div>
      )}
    </Section>
  );
}
