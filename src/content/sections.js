// Page section order + nav labels. A section with no published content is
// dropped from both the page and the nav, so production never shows an empty
// shell (e.g. Websites before any entry is confirmed).
import { projects } from './projects';
import { websites } from './websites';
import { experience, education } from './about';
import { published } from '../lib/drafts';

export const sections = [
  { id: 'projects', label: 'Projects', visible: published(projects).length > 0 },
  { id: 'websites', label: 'Websites', visible: published(websites).length > 0 },
  { id: 'seo', label: 'SEO', visible: true },
  { id: 'skills', label: 'Skills', visible: true },
  {
    id: 'experience',
    label: 'Experience',
    visible: published(experience).length + published(education).length > 0,
  },
  { id: 'about', label: 'About', visible: true, nav: false },
  { id: 'contact', label: 'Contact', visible: true },
].filter((s) => s.visible);

export const navSections = sections.filter((s) => s.nav !== false);
