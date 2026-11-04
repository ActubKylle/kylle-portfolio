import { motion } from 'framer-motion';
import { fadeUp, inView } from '../lib/motion';

// Section eyebrow + title + optional supporting line.
export default function SectionHeading({ eyebrow, title, description, children }) {
  return (
    <motion.header variants={fadeUp} {...inView} className="mb-10 max-w-2xl sm:mb-12">
      {eyebrow && <p className="mb-3 text-sm font-medium text-accent">{eyebrow}</p>}
      <h2 className="text-balance text-2xl font-semibold tracking-tight text-heading sm:text-3xl">{title}</h2>
      {description && <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">{description}</p>}
      {children}
    </motion.header>
  );
}
