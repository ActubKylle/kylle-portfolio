import { useState } from 'react';
import { siteConfig } from '../content/siteConfig';

const PORTRAIT = `${process.env.PUBLIC_URL || ''}/images/kylle-portrait.webp`;

// Hero portrait in a plain frame. Falls back to initials if the image fails.
export default function HeroShowcase() {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="mx-auto w-full max-w-[18rem] sm:max-w-[20rem] lg:ml-auto lg:mr-0">
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-line bg-surface">
        {!imgError ? (
          <img
            src={PORTRAIT}
            alt={`Portrait of ${siteConfig.name}`}
            width="469"
            height="532"
            loading="eager"
            fetchpriority="high"
            onError={() => setImgError(true)}
            className="absolute inset-x-0 bottom-0 mx-auto h-[94%] w-auto object-contain object-bottom"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl font-semibold text-muted/50">{siteConfig.shortName}</span>
          </div>
        )}
      </div>
    </div>
  );
}
