// Responsive WebP screenshot. `image.base` expands to <base>-640.webp and
// <base>-1280.webp (see scripts/make-thumbnail.py); width/height reserve the
// layout box so lazy-loaded images never shift the page.
export default function Picture({ image, alt, sizes = '(min-width: 1024px) 50vw, 100vw', eager = false, className = '' }) {
  const src = (w) => `${image.base}-${w}.webp`;

  return (
    <img
      src={src(1280)}
      srcSet={`${src(640)} 640w, ${src(1280)} 1280w`}
      sizes={sizes}
      width={image.width}
      height={image.height}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={className}
    />
  );
}
