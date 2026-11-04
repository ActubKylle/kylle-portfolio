import Section from './Section';
import SectionHeading from './SectionHeading';
import FeaturedProject from './FeaturedProject';
import ProjectRow from './ProjectRow';
import { projects } from '../content/projects';
import { published } from '../lib/drafts';

// Full-stack applications (Laravel / React). WordPress sites live in the
// separate WebsiteGallery section.
export default function Work() {
  const list = published(projects);
  const featured = list.filter((p) => p.featured);
  const supporting = list.filter((p) => !p.featured);

  return (
    <Section id="projects" border={false}>
      <SectionHeading
        eyebrow="Full-stack applications"
        title="Projects"
        description="Web applications I designed and built across the database, backend, and frontend."
      />

      <div className="space-y-6">
        {featured.map((project) => (
          <FeaturedProject key={project.slug} project={project} />
        ))}
      </div>

      {supporting.length > 0 && (
        <ul className="mt-6 grid gap-6 md:grid-cols-2">
          {supporting.map((project) => (
            <li key={project.slug} className="flex">
              <ProjectRow project={project} />
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}
