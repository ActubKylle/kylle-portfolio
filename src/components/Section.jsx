import Container from './Container';

// Standard page section: anchor id, consistent vertical rhythm, top hairline.
export default function Section({ id, narrow = false, border = true, className = '', children }) {
  return (
    <section
      id={id}
      className={`scroll-mt-20 py-20 sm:py-28 ${border ? 'border-t border-line' : ''} ${className}`}
    >
      <Container narrow={narrow}>{children}</Container>
    </section>
  );
}
