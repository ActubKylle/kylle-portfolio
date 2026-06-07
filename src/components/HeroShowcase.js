import { useState } from 'react';
import { MapPin } from 'lucide-react';
import { siteConfig } from '../content/siteConfig';

// Hero portrait — editorial treatment (Brian Lovin / Rauno / Linear feel):
// a framed portrait (trust) on a blueprint grid, with availability + location
// status overlays. Portrait is meaningful (alt); the rest is decorative.
const PORTRAIT = `${process.env.PUBLIC_URL || ''}/kylle-removebg-preview.png`;

function CornerTicks() {
  const base = 'absolute h-4 w-4 border-accent/50';
  return (
    <div aria-hidden="true">
      <span className={`${base} left-3 top-3 border-l border-t`} />
      <span className={`${base} right-3 top-3 border-r border-t`} />
      <span className={`${base} bottom-3 left-3 border-b border-l`} />
      <span className={`${base} bottom-3 right-3 border-b border-r`} />
    </div>
  );
}

export default function HeroShowcase() {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative mx-auto w-full max-w-[22rem] sm:max-w-[24rem]">
      {/* Blueprint grid behind the whole area (integrates the right side) */}
      <div
        aria-hidden="true"
        className="blueprint-grid pointer-events-none absolute -inset-x-16 -inset-y-12 -z-20"
      />
      {/* Ambient accent glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-4 -z-10 rounded-full bg-accent/15 blur-3xl"
      />

      {/* Editorial frame — solid panel so it reads on the dark page */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line bg-surface shadow-2xl ring-1 ring-inset ring-white/5">
        <div aria-hidden="true" className="dot-grid absolute inset-0 opacity-50" />
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-[6%] h-3/4 w-4/5 -translate-x-1/2 rounded-full bg-accent/15 blur-2xl"
        />

        {!imgError ? (
          <img
            src={PORTRAIT}
            alt={siteConfig.name}
            width="469"
            height="532"
            loading="eager"
            onError={() => setImgError(true)}
            className="absolute inset-x-0 bottom-0 mx-auto h-[94%] w-auto object-contain object-bottom"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-mono text-6xl font-bold text-muted/40">{siteConfig.shortName}</span>
          </div>
        )}

        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-surface via-surface/70 to-transparent"
        />

        <CornerTicks />

        {/* Availability (top-left) */}
        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-line bg-bg/70 px-2.5 py-1 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          <span className="font-mono text-[10px] text-muted">{siteConfig.status}</span>
        </div>

        {/* Location (top-right) */}
        <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full border border-line bg-bg/70 px-2.5 py-1 backdrop-blur-md">
          <MapPin size={11} className="text-accent" aria-hidden="true" />
          <span className="font-mono text-[10px] text-muted">{siteConfig.location}</span>
        </div>
      </div>
    </div>
  );
}
