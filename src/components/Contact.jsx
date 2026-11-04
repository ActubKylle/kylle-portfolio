import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Linkedin, Mail, Send } from 'lucide-react';
import Section from './Section';
import SectionHeading from './SectionHeading';
import Button from './Button';
import { siteConfig, isFormConfigured } from '../content/siteConfig';
import { fadeUp, inView } from '../lib/motion';

const fieldClass =
  'w-full rounded-md border border-line bg-surface px-3.5 py-2.5 text-ink placeholder:text-muted/70 ' +
  'transition-colors focus:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent';

const channels = [
  { label: 'Email', value: siteConfig.email, href: `mailto:${siteConfig.email}`, Icon: Mail },
  { label: 'LinkedIn', value: 'Kylle Nichole Actub', href: siteConfig.socials.linkedin, Icon: Linkedin, external: true },
  { label: 'GitHub', value: 'ActubKylle', href: siteConfig.socials.github, Icon: Github, external: true },
];

// Only rendered when a Web3Forms key is configured in siteConfig.
function ContactForm() {
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  async function handleSubmit(e) {
    e.preventDefault();
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
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm text-muted">
            Name
          </label>
          <input id="name" name="name" type="text" required autoComplete="name" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm text-muted">
            Email
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" className={fieldClass} />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm text-muted">
          Message
        </label>
        <textarea id="message" name="message" rows={5} required className={`${fieldClass} resize-y`} />
      </div>

      <div className="flex items-center gap-4">
        <Button type="submit" disabled={status === 'submitting'}>
          <Send size={16} aria-hidden="true" />
          {status === 'submitting' ? 'Sending…' : 'Send message'}
        </Button>
        <p
          role="status"
          aria-live="polite"
          className={`text-sm ${status === 'success' ? 'text-accent' : status === 'error' ? 'text-red-500' : 'text-muted'}`}
        >
          {status === 'success' && 'Thanks, your message was sent.'}
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
  );
}

export default function Contact() {
  return (
    <Section id="contact">
      <SectionHeading
        eyebrow="Contact"
        title="Let's work together"
        description="Hiring for a full-stack or WordPress role, or need help with a web project? Send me a message."
      />

      <motion.div
        variants={fadeUp}
        {...inView}
        className={isFormConfigured ? 'grid gap-12 md:grid-cols-[1.4fr_1fr]' : ''}
      >
        {isFormConfigured && <ContactForm />}

        <ul className={`grid gap-3 ${isFormConfigured ? '' : 'sm:grid-cols-3'}`}>
          {channels.map(({ label, value, href, Icon, external }) => (
            <li key={label}>
              <a
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                aria-label={external ? `${label}: ${value} (opens in a new tab)` : `${label}: ${value}`}
                className="group flex items-center gap-4 rounded-lg border border-line bg-surface p-4 transition-colors hover:border-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <Icon size={18} aria-hidden="true" className="flex-shrink-0 text-muted group-hover:text-ink" />
                <span className="min-w-0">
                  <span className="block text-xs text-muted">{label}</span>
                  <span className="block truncate text-sm font-medium text-heading">{value}</span>
                </span>
                <ArrowUpRight size={15} aria-hidden="true" className="ml-auto flex-shrink-0 text-muted opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
            </li>
          ))}
        </ul>
      </motion.div>
    </Section>
  );
}
