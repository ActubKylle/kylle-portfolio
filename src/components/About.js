import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Container from './Container';
import SectionHeading from './SectionHeading';
import { about } from '../content/about';
import { fadeUp, inView } from '../lib/motion';

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 border-t border-line py-24 sm:py-32">
      <Container narrow>
        <SectionHeading number="02">About</SectionHeading>

        {/* Lead + development philosophy (portrait now lives in the hero) */}
        <motion.div variants={fadeUp} {...inView}>
          <p className="text-xl font-medium leading-relaxed text-heading">{about.lead}</p>
          <div className="mt-6 space-y-5">
            {about.philosophy.map((p) => (
              <p key={p.slice(0, 24)} className="leading-relaxed text-muted">
                {p}
              </p>
            ))}
          </div>
        </motion.div>

        {/* Experience + Education */}
        <motion.div
          variants={fadeUp}
          {...inView}
          className="mt-12 grid gap-10 border-t border-line pt-10 sm:grid-cols-2"
        >
          <div>
            <p className="font-mono text-sm text-accent">experience</p>
            <ul className="mt-4 space-y-6">
              {about.experience.map((job) => (
                <li key={job.role}>
                  <p className="font-medium text-heading">{job.role}</p>
                  <p className="text-sm text-muted">{job.org}</p>
                  <p className="font-mono text-xs text-muted">{job.period}</p>
                  {job.note && <p className="mt-1.5 text-sm leading-relaxed text-muted">{job.note}</p>}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-sm text-accent">education</p>
            <div className="mt-4">
              <p className="font-medium text-heading">{about.education.degree}</p>
              <p className="text-sm text-muted">{about.education.school}</p>
              <p className="font-mono text-xs text-muted">{about.education.years}</p>
            </div>
          </div>
        </motion.div>

        {/* Technical strengths */}
        <motion.div variants={fadeUp} {...inView} className="mt-10 border-t border-line pt-10">
          <p className="font-mono text-sm text-accent">technical strengths</p>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {about.strengths.map((s) => (
              <li key={s} className="flex items-start gap-2 text-muted">
                <Check size={16} className="mt-1 flex-shrink-0 text-accent" aria-hidden="true" />
                {s}
              </li>
            ))}
          </ul>
        </motion.div>
      </Container>
    </section>
  );
}
