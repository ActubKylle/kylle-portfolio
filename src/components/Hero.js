import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import Container from './Container';
import Button from './Button';
import HeroShowcase from './HeroShowcase';
import { siteConfig } from '../content/siteConfig';
import { fadeIn, fadeUp, stagger } from '../lib/motion';

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-x-clip py-24 pt-28 lg:py-16 lg:pt-16"
    >
      {/* Premium backdrop: soft accent glow from the top (Direction A borrow) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[60vh] bg-[radial-gradient(60%_60%_at_70%_0%,rgb(var(--color-accent)/0.12),transparent_70%)]"
      />
      <Container className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          <motion.p variants={fadeUp} className="mb-5 font-mono text-sm text-accent">
            {/* `caret` adds a blinking cursor; CSS disables it under reduced motion. */}
            <span className="caret">// {siteConfig.role.toLowerCase()}</span>
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-heading sm:text-5xl lg:text-6xl"
          >
            {siteConfig.tagline}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-muted"
          >
            {siteConfig.intro}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="#work" className="w-full sm:w-auto">
              View my work
              <ArrowRight size={18} aria-hidden="true" />
            </Button>
            <Button
              href={siteConfig.resumeUrl}
              download
              variant="ghost"
              className="w-full sm:w-auto"
            >
              <Download size={18} aria-hidden="true" />
              Download résumé
            </Button>
          </motion.div>

          <motion.ul
            variants={fadeUp}
            className="mt-10 flex flex-wrap gap-x-3 gap-y-2 font-mono text-sm text-muted"
            aria-label="Core technologies"
          >
            {siteConfig.stack.map((tech, i) => (
              <li key={tech} className="flex items-center gap-3">
                {i > 0 && <span aria-hidden="true" className="text-line">·</span>}
                {tech}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Portrait showcase — appears below the text on mobile/tablet,
            beside it on desktop. */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
          className="w-full lg:justify-self-center"
        >
          <HeroShowcase />
        </motion.div>
      </Container>
    </section>
  );
}
