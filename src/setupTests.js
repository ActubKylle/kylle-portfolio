// jest-dom adds custom matchers like .toBeInTheDocument().
import '@testing-library/jest-dom/vitest';

// jsdom doesn't implement these browser APIs that the app relies on.
beforeAll(() => {
  if (!window.matchMedia) {
    window.matchMedia = (query) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    });
  }

  if (!window.IntersectionObserver) {
    class IO {
      observe() {}
      unobserve() {}
      disconnect() {}
      takeRecords() {
        return [];
      }
    }
    window.IntersectionObserver = IO;
    global.IntersectionObserver = IO;
  }

  if (!window.scrollTo) window.scrollTo = () => {};
});

// jsdom does not implement scrolling; the app calls these on route changes.
window.scrollTo = () => {};
Element.prototype.scrollIntoView = () => {};
