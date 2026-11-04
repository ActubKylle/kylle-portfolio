import { motion } from 'framer-motion';
import Section from './Section';
import SectionHeading from './SectionHeading';
import { seoGroups, seoIntro } from '../content/seo';
import { fadeUp, inView } from '../lib/motion';

export default function TechnicalSeo() {
  return (
    <Section id="seo">
      <SectionHeading eyebrow="Technical SEO" title="Sites that search engines can crawl, index, and load fast" description={seoIntro} />

      <motion.div variants={fadeUp} {...inView} className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
        {seoGroups.map((group) => (
          <div key={group.title} className="bg-bg p-6">
            <h3 className="text-sm font-semibold text-heading">{group.title}</h3>
            <dl className="mt-4 space-y-4">
              {group.items.map((item) => (
                <div key={item.name}>
                  <dt className="text-sm font-medium text-ink">{item.name}</dt>
                  <dd className="mt-0.5 text-sm leading-relaxed text-muted">{item.detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </motion.div>
    </Section>
  );
}
