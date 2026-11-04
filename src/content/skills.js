// =============================================================================
// SKILLS — grouped by area. No proficiency bars or percentages: `usedIn` links
// each skill to the work that demonstrates it instead.
// =============================================================================

export const skillGroups = [
  {
    title: 'Frontend',
    items: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS'],
    usedIn: 'HTTA, LifeLog, Expense Tracker',
  },
  {
    title: 'Backend',
    items: ['PHP', 'Laravel 12', 'REST APIs'],
    usedIn: 'HTTA, LifeLog and Expense Tracker APIs',
  },
  {
    title: 'Database',
    items: ['MySQL', 'Schema design', 'Eloquent ORM'],
    usedIn: 'HTTA schema (normalized registration data)',
  },
  {
    title: 'CMS & WordPress',
    items: ['WordPress', 'Elementor', 'WPBakery', 'Sanity'],
    usedIn: 'Client and agency websites',
  },
  {
    title: 'SEO & Optimization',
    items: ['Technical SEO', 'On-page SEO', 'Website audits', 'Speed optimization'],
    usedIn: 'Client and agency websites',
  },
  {
    title: 'Tools',
    items: ['Git', 'GitHub', 'Vite', 'VS Code'],
  },
];

// Technologies used in specific projects but not presented as core skills.
export const alsoUsed = ['TypeScript', 'Inertia.js', 'React Native / Expo', 'Pusher', 'Material UI', 'Chart.js'];
