// HTTA system architecture, drawn with HTML so it reflows on small screens and
// re-themes with the site tokens. Mirrors the repo: Inertia web client + Expo
// app → Laravel 12 → MySQL, queue, Pusher, mail, PDF/Excel.

function Node({ title, detail, accent = false }) {
  return (
    <div className={`rounded-md border px-3.5 py-3 ${accent ? 'border-accent/50 bg-accent/5' : 'border-line bg-bg'}`}>
      <p className="text-sm font-medium text-heading">{title}</p>
      {detail && <p className="mt-0.5 text-xs leading-relaxed text-muted">{detail}</p>}
    </div>
  );
}

function Connector({ label }) {
  return (
    <div className="flex items-center gap-3 py-2 pl-4" aria-hidden="true">
      <span className="h-6 w-px bg-line" />
      <span className="text-xs text-muted">{label}</span>
    </div>
  );
}

function Tier({ label, children }) {
  return (
    <div>
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted">{label}</p>
      <div className="grid grid-cols-2 gap-2.5">{children}</div>
    </div>
  );
}

export default function ArchitectureDiagram() {
  return (
    <figure className="rounded-lg border border-line bg-surface p-5 sm:p-6">
      <Tier label="Clients">
        <Node title="Web app" detail="React 19 + TypeScript pages rendered through Inertia.js" />
        <Node title="Mobile app" detail="Expo / React Native: camera, GPS, ML Kit face detection" />
      </Tier>

      <Connector label="Inertia page requests · POST /api/attendance" />

      <Tier label="Application">
        <div className="col-span-2">
          <Node accent title="Laravel 12" detail="Controllers, validation, staff / learner middleware" />
        </div>
        <Node title="Queue worker" detail="ImportStudentsJob (Laravel Excel)" />
        <Node title="Broadcasting" detail="learner.registered on a private staff channel" />
      </Tier>

      <Connector label="Eloquent · jobs · events · mail" />

      <Tier label="Data & services">
        <Node title="MySQL" detail="Learners, programs, enrollments, attendance" />
        <Node title="Pusher" detail="Echo pushes events to staff screens" />
        <Node title="SMTP mail" detail="Acceptance credentials" />
        <Node title="DomPDF" detail="Registration PDF export" />
      </Tier>

      <figcaption className="sr-only">
        Web and mobile clients send requests to a Laravel 12 application, which uses a queue worker for imports,
        broadcasts events through Pusher, stores data in MySQL, sends mail over SMTP, and exports PDFs with DomPDF.
      </figcaption>
    </figure>
  );
}
