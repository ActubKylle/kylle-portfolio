import { motion } from 'framer-motion';
import Section from './Section';
import SectionHeading from './SectionHeading';
import { TagList } from './Tag';
import { alsoUsed, skillGroups } from '../content/skills';
import { fadeUp, inView } from '../lib/motion';

export default function Skills() {
  return (
    <Section id="skills">
      <SectionHeading eyebrow="Skills" title="Technologies I work with" />

      <motion.ul variants={fadeUp} {...inView} className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => (
          <li key={group.title} className="border-t border-line pt-5">
            <h3 className="text-sm font-semibold text-heading">{group.title}</h3>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-ink">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {group.usedIn && <p className="mt-3 text-xs text-muted">Used in: {group.usedIn}</p>}
          </li>
        ))}
      </motion.ul>

      <motion.div variants={fadeUp} {...inView} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
        <p className="text-sm text-muted">Also used in projects:</p>
        <TagList items={alsoUsed} label="Also used in projects" />
      </motion.div>
    </Section>
  );
}
