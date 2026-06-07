import { motion } from 'framer-motion';
import Container from './Container';
import SectionHeading from './SectionHeading';
import FeaturedProject from './FeaturedProject';
import ProjectRow from './ProjectRow';
import { projects } from '../content/projects';
import { stagger } from '../lib/motion';

export default function Work() {
  const featured = projects.filter((p) => p.featured);
  const supporting = projects.filter((p) => !p.featured);

  return (
    <section id="work" className="scroll-mt-24 py-24 sm:py-32">
      <Container>
        <SectionHeading number="01">Selected Work</SectionHeading>

        {/* Flagship case study */}
        {featured.map((project) => (
          <FeaturedProject key={project.title} project={project} />
        ))}

        {/* Supporting projects */}
        <motion.div
          variants={stagger}
          className="mt-20 flex flex-col gap-20 sm:mt-28 sm:gap-28"
        >
          {supporting.map((project, i) => (
            <ProjectRow key={project.title} project={project} reversed={i % 2 === 1} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
