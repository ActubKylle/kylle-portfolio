import { motion } from 'framer-motion';
import Section from './Section';
import SectionHeading from './SectionHeading';
import { about } from '../content/about';
import { fadeUp, inView } from '../lib/motion';

export default function About() {
  return (
    <Section id="about" narrow>
      <SectionHeading eyebrow="About" title={about.lead} />
      <motion.div variants={fadeUp} {...inView} className="space-y-5 text-lg leading-relaxed text-muted">
        {about.paragraphs.map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
      </motion.div>
    </Section>
  );
}
