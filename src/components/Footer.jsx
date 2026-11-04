import { Github, Linkedin, Mail } from 'lucide-react';
import Container from './Container';
import { siteConfig } from '../content/siteConfig';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line py-10">
      <Container className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="text-sm text-muted">
            © {year} {siteConfig.name}. Built with React &amp; Tailwind CSS.
          </p>
          {siteConfig.now && (
            <p className="mt-1 text-xs text-muted">{siteConfig.now}</p>
          )}
        </div>

        <ul className="flex items-center gap-2">
          <li>
            <a
              href={`mailto:${siteConfig.email}`}
              aria-label="Email"
              className="rounded-md p-2 text-muted transition-colors hover:bg-surface hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Mail size={18} aria-hidden="true" />
            </a>
          </li>
          <li>
            <a
              href={siteConfig.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn (opens in a new tab)"
              className="rounded-md p-2 text-muted transition-colors hover:bg-surface hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Linkedin size={18} aria-hidden="true" />
            </a>
          </li>
          <li>
            <a
              href={siteConfig.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub (opens in a new tab)"
              className="rounded-md p-2 text-muted transition-colors hover:bg-surface hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Github size={18} aria-hidden="true" />
            </a>
          </li>
        </ul>
      </Container>
    </footer>
  );
}
