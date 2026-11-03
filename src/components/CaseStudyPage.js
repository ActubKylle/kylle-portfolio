import { ArrowLeft, ArrowUpRight, Github } from 'lucide-react';
import Container from './Container';
import Picture from './Picture';
import ArchitectureDiagram from './ArchitectureDiagram';
import { DraftBadge, TagList } from './Tag';
import { clientLine } from './WebsiteCard';
import { categoryLabel } from '../content/websites';
import { SHOW_DRAFTS } from '../lib/drafts';

const DIAGRAMS = { htta: ArchitectureDiagram };

// ---------------------------------------------------------------------------
// Shared layout: header, meta, optional hero image, then titled sections with
// a sticky table of contents on large screens.
// ---------------------------------------------------------------------------
function CaseStudyLayout({ back, eyebrow, title, lead, meta, links = [], image, imageAlt, sections, draft }) {
  return (
    <article className="pb-24 pt-28 sm:pt-32">
      <Container>
        <a
          href={back.href}
          className="inline-flex items-center gap-1.5 rounded text-sm text-muted transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <ArrowLeft size={15} aria-hidden="true" /> {back.label}
        </a>

        <header className="mt-8 max-w-3xl">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-sm font-medium text-accent">{eyebrow}</p>
            {draft && <DraftBadge />}
          </div>
          <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-heading sm:text-4xl">{title}</h1>
          {lead && <p className="mt-4 text-lg leading-relaxed text-muted">{lead}</p>}
        </header>

        <dl className="mt-10 grid gap-6 border-y border-line py-6 sm:grid-cols-3">
          {meta.map((m) => (
            <div key={m.label}>
              <dt className="text-xs font-medium uppercase tracking-wide text-muted">{m.label}</dt>
              <dd className="mt-1.5 text-sm text-ink">{m.value}</dd>
            </div>
          ))}
        </dl>

        {links.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${link.label} (opens in a new tab)`}
                className="inline-flex items-center gap-1.5 rounded text-sm font-medium text-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {link.type === 'repo' ? <Github size={15} aria-hidden="true" /> : <ArrowUpRight size={15} aria-hidden="true" />}
                {link.label}
              </a>
            ))}
          </div>
        )}

        {image && (
          <div className="mt-10 overflow-hidden rounded-lg border border-line">
            <Picture image={image} alt={imageAlt} eager sizes="(min-width: 1152px) 1088px, 100vw" className="w-full" />
          </div>
        )}

        <div className="mt-14 grid gap-12 lg:grid-cols-[11rem_1fr] lg:gap-16">
          <nav aria-label="On this page" className="hidden lg:block">
            <ul className="sticky top-24 space-y-2 border-l border-line text-sm">
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} onClick={jumpTo(s.id)} className="-ml-px block border-l border-transparent pl-4 text-muted transition-colors hover:border-muted hover:text-ink">
                    {s.heading}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="min-w-0 max-w-3xl space-y-14">
            {sections.map((s) => (
              <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="scroll-mt-24">
                <h2 id={`${s.id}-title`} className="text-xl font-semibold tracking-tight text-heading">
                  {s.heading}
                </h2>
                <div className="mt-4 space-y-4 leading-relaxed text-ink">{s.content}</div>
              </section>
            ))}
          </div>
        </div>
      </Container>
    </article>
  );
}

// In-page TOC links must not change the hash, or the router would treat them
// as a navigation back to the home page.
function jumpTo(id) {
  return (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
}

function Bullets({ items }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden="true" className="mt-2.5 h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Steps({ items }) {
  return (
    <ol className="space-y-3">
      {items.map((item, i) => (
        <li key={item} className="flex gap-4">
          <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md border border-line text-xs text-muted">
            {i + 1}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}

function DataTable({ columns, rows, caption }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-line">
      <table className="w-full min-w-[36rem] text-left text-sm">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead className="bg-surface text-xs uppercase tracking-wide text-muted">
          <tr>
            {columns.map((c) => (
              <th key={c} scope="col" className="px-4 py-3 font-medium">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {rows.map((row) => (
            <tr key={row[0]}>
              {row.map((cell, i) => (
                <td key={i} className={`px-4 py-3 align-top ${i === 0 ? 'whitespace-nowrap font-mono text-xs text-heading' : 'text-muted'}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Todo({ children }) {
  return (
    <p className="rounded-md border border-dashed border-amber-500/60 bg-amber-500/5 px-4 py-3 text-sm text-amber-700 dark:text-amber-400">
      TODO: {children}
    </p>
  );
}

// ---------------------------------------------------------------------------
// Full-stack application case study (data: projects[].caseStudy.sections).
// ---------------------------------------------------------------------------
export function ProjectCaseStudy({ project }) {
  const sections = project.caseStudy.sections.map((s) => {
    const Diagram = s.diagram && DIAGRAMS[s.diagram];
    return {
      id: s.id,
      heading: s.heading,
      content: (
        <>
          {s.body?.map((p) => (
            <p key={p.slice(0, 32)}>{p}</p>
          ))}
          {Diagram && <Diagram />}
          {s.list && <Bullets items={s.list} />}
          {s.steps && <Steps items={s.steps} />}
          {s.table && <DataTable {...s.table} caption={`${s.heading} tables`} />}
        </>
      ),
    };
  });

  return (
    <CaseStudyLayout
      back={{ href: '#projects', label: 'All projects' }}
      eyebrow="Case study"
      title={project.title}
      lead={project.blurb}
      meta={[
        { label: 'My role', value: project.role },
        { label: 'Stack', value: <TagList items={project.tech} className="mt-1" /> },
        { label: 'Type', value: project.category },
      ]}
      links={project.links}
      image={project.image}
      imageAlt={`Screenshot of ${project.title}`}
      sections={sections}
      draft={project.draft}
    />
  );
}

// ---------------------------------------------------------------------------
// Website case study (data: websites[].caseStudy). Empty fields render as
// TODO prompts during development and are omitted from production builds.
// ---------------------------------------------------------------------------
const WEBSITE_SECTIONS = [
  { id: 'overview', heading: 'Project overview', key: 'overview', todo: 'describe the site and the brief.' },
  { id: 'role', heading: 'My role', key: 'role', todo: 'state your role and what you were responsible for.' },
  { id: 'builder', heading: 'Page builder implementation', key: 'builder', todo: 'list the Elementor / WPBakery work you did.' },
  { id: 'responsive', heading: 'Responsive design', key: 'responsive', todo: 'list the responsive layouts or fixes you implemented.' },
  { id: 'seo', heading: 'Technical SEO', key: 'seo', todo: 'list the technical SEO tasks you performed.' },
  { id: 'performance', heading: 'Performance optimization', key: 'performance', todo: 'list the optimizations you made.' },
  { id: 'screenshots', heading: 'Before & after', key: 'screenshots', todo: 'add before/after screenshots, if you have them.' },
  { id: 'pagespeed', heading: 'Measured PageSpeed results', key: 'pagespeed', todo: 'add real measurements (tool, device, date) or leave empty.' },
];

function isEmpty(value) {
  return value == null || value === '' || (Array.isArray(value) && value.length === 0);
}

function renderWebsiteField(key, value, title) {
  if (key === 'overview' || key === 'role') return <p>{value}</p>;
  if (key === 'screenshots') {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        {value.map((shot) => (
          <figure key={shot.label}>
            <div className="overflow-hidden rounded-lg border border-line">
              <Picture image={shot} alt={`${title}: ${shot.label}`} sizes="(min-width: 640px) 50vw, 100vw" className="w-full" />
            </div>
            <figcaption className="mt-2 text-sm text-muted">{shot.label}</figcaption>
          </figure>
        ))}
      </div>
    );
  }
  if (key === 'pagespeed') {
    return (
      <DataTable
        columns={['Metric', 'Before', 'After', 'Tool', 'Measured']}
        rows={value.map((r) => [r.label, r.before ?? '—', r.after ?? '—', r.tool, r.date])}
        caption="PageSpeed measurements"
      />
    );
  }
  return <Bullets items={value} />;
}

export function WebsiteCaseStudy({ site }) {
  const study = site.caseStudy;
  const sections = WEBSITE_SECTIONS.filter((s) => SHOW_DRAFTS || !isEmpty(study[s.key])).map((s) => ({
    id: s.id,
    heading: s.heading,
    content: isEmpty(study[s.key]) ? <Todo>{s.todo}</Todo> : renderWebsiteField(s.key, study[s.key], site.title),
  }));

  const canLink = site.showLink && site.url && !site.client?.confidential;

  return (
    <CaseStudyLayout
      back={{ href: '#websites', label: 'All websites' }}
      eyebrow={`Case study · ${categoryLabel(site.category)}`}
      title={site.title}
      lead={clientLine(site)}
      meta={[
        { label: 'My role', value: study.role },
        { label: 'Platform', value: <TagList items={site.platform} className="mt-1" /> },
        { label: 'Year', value: site.year },
      ].filter((m) => m.value)}
      links={canLink ? [{ type: 'demo', label: 'Visit live site', href: site.url }] : []}
      image={site.image}
      imageAlt={`Screenshot of the ${site.title} website`}
      sections={sections}
      draft={site.draft}
    />
  );
}
