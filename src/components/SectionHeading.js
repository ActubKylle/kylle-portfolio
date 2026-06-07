import { motion } from 'framer-motion';
import { fadeUp, inView } from '../lib/motion';

// Monospace section number + title, in the Direction C "documentation" style.
export default function SectionHeading({ number, children }) {
  return (
    <motion.div variants={fadeUp} {...inView} className="mb-10 sm:mb-14">
      <p className="mb-3 font-mono text-sm text-accent">{number} —</p>
      <h2 className="text-2xl font-semibold tracking-tight text-heading sm:text-3xl">
        {children}
      </h2>
    </motion.div>
  );
}
