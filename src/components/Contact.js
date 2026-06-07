import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Send } from 'lucide-react';
import Container from './Container';
import SectionHeading from './SectionHeading';
import Button from './Button';
import { siteConfig, isFormConfigured } from '../content/siteConfig';
import { fadeUp, inView } from '../lib/motion';

const fieldClass =
  'w-full rounded-lg border border-line bg-surface px-3.5 py-2.5 text-ink placeholder:text-muted/70 ' +
  'transition-colors focus:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent';

export default function Contact() {
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  async function handleSubmit(e) {
    e.preventDefault();

    // Without a Web3Forms key, fall back to the user's mail client so the form
    // is never a dead end.
    if (!isFormConfigured) {
      window.location.href = `mailto:${siteConfig.email}`;
      return;
    }

    setStatus('submitting');
    const data = Object.fromEntries(new FormData(e.target));
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: siteConfig.web3formsKey,
          subject: `Portfolio message from ${data.name}`,
          ...data,
        }),
      });
      if (res.ok) {
        setStatus('success');
        e.target.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="contact" className="scroll-mt-24 border-t border-line py-24 sm:py-32">
      <Container>
        <SectionHeading number="03">Let&apos;s work together</SectionHeading>

        <motion.p variants={fadeUp} {...inView} className="-mt-6 mb-12 max-w-xl text-lg text-muted">
          Looking for a full-stack developer? Tell me about the role or project — I
          usually reply within 24 hours.
        </motion.p>

        <motion.div
          variants={fadeUp}
          {...inView}
          className="grid gap-12 md:grid-cols-[1.4fr_1fr]"
        >
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5" noValidate={false}>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1.5 block font-mono text-sm text-muted">
                  Name
                </label>
                <input id="name" name="name" type="text" required autoComplete="name" className={fieldClass} />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block font-mono text-sm text-muted">
                  Email
                </label>
                <input id="email" name="email" type="email" required autoComplete="email" className={fieldClass} />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="mb-1.5 block font-mono text-sm text-muted">
                Message
              </label>
              <textarea id="message" name="message" rows={5} required className={`${fieldClass} resize-y`} />
            </div>

            <div className="flex items-center gap-4">
              <Button type="submit" disabled={status === 'submitting'}>
                <Send size={16} aria-hidden="true" />
                {status === 'submitting' ? 'Sending…' : 'Send message'}
              </Button>

              {/* Status, announced to screen readers */}
              <p
                role="status"
                aria-live="polite"
                className={`text-sm ${
                  status === 'success' ? 'text-accent' : status === 'error' ? 'text-red-500' : 'text-muted'
                }`}
              >
                {status === 'success' && 'Thanks — I’ll be in touch soon.'}
                {status === 'error' && (
                  <>
                    Something went wrong.{' '}
                    <a href={`mailto:${siteConfig.email}`} className="underline">
                      Email me directly
                    </a>
                    .
                  </>
                )}
              </p>
            </div>
          </form>

          {/* Direct channels */}
          <div>
            <p className="mb-4 font-mono text-sm text-muted">Or reach me directly:</p>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex items-center gap-3 rounded text-ink transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <Mail size={18} aria-hidden="true" /> {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile (opens in a new tab)"
                  className="inline-flex items-center gap-3 rounded text-ink transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <Linkedin size={18} aria-hidden="true" /> LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile (opens in a new tab)"
                  className="inline-flex items-center gap-3 rounded text-ink transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <Github size={18} aria-hidden="true" /> GitHub
                </a>
              </li>
            </ul>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
