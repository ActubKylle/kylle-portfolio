import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin } from 'lucide-react';
import Container from './Container';
import Button from './Button';
import HeroShowcase from './HeroShowcase';
import { siteConfig } from '../content/siteConfig';
import { fadeIn, fadeUp, stagger } from '../lib/motion';

const iconLink =
  'inline-flex items-center gap-2 rounded text-sm text-muted transition-colors hover:text-ink ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent';

export default function Hero() {
  return (
    <section id="top" className="pb-20 pt-32 sm:pb-24 sm:pt-40">
      <Container className="grid items-center gap-14 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
        <motion.div variants={stagger} initial="hidden" animate="visible">
          <motion.p variants={fadeUp} className="text-sm font-medium text-muted">
            {siteConfig.name} · {siteConfig.role} · {siteConfig.location}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-5 text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-heading sm:text-5xl lg:text-[3.5rem]"
          >
            {siteConfig.headline}
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            {siteConfig.intro}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="#projects" className="w-full sm:w-auto">
              View projects
              <ArrowRight size={16} aria-hidden="true" />
            </Button>
            <Button href="#contact" variant="ghost" className="w-full sm:w-auto">
              Contact me
            </Button>
          </motion.div>

          <motion.ul variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <li>
              <a href={siteConfig.socials.github} target="_blank" rel="noopener noreferrer" className={iconLink} aria-label="GitHub profile (opens in a new tab)">
                <Github size={16} aria-hidden="true" /> GitHub
              </a>
            </li>
            <li>
              <a href={siteConfig.socials.linkedin} target="_blank" rel="noopener noreferrer" className={iconLink} aria-label="LinkedIn profile (opens in a new tab)">
                <Linkedin size={16} aria-hidden="true" /> LinkedIn
              </a>
            </li>
            {siteConfig.status && (
              <li className="flex items-center gap-2 text-sm text-muted">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {siteConfig.status}
              </li>
            )}
          </motion.ul>
        </motion.div>

        <motion.div variants={fadeIn} initial="hidden" animate="visible" transition={{ delay: 0.15 }}>
          <HeroShowcase />
        </motion.div>
      </Container>
    </section>
  );
}
