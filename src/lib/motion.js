// Shared Framer Motion variants. Entrance-only, short, and subtle — no infinite
// loops. Global `prefers-reduced-motion` handling lives in <MotionConfig
// reducedMotion="user"> (App.js), so these are automatically muted for users
// who ask for reduced motion.

const EASE = [0.16, 1, 0.3, 1]; // gentle "ease-out-expo"

export const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.45, ease: EASE } },
};

export const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

// Standard whileInView config so every section reveals consistently and once.
export const inView = {
  initial: 'hidden',
  whileInView: 'visible',
  viewport: { once: true, margin: '-60px' },
};
