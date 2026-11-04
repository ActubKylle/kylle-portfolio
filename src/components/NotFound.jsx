import Container from './Container';
import Button from './Button';

// Shown for any path that isn't a page (prerendered as build/404.html).
export default function NotFound() {
  return (
    <section className="pb-24 pt-32 sm:pt-40">
      <Container>
        <p className="text-sm font-medium text-accent">404</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-heading sm:text-4xl">Page not found</h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
          That page doesn't exist or has moved.
        </p>
        <Button href="/" className="mt-8">
          Back to home
        </Button>
      </Container>
    </section>
  );
}
