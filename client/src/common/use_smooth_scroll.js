import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Inertial smooth scrolling. This is most of what separates a site that
 * feels expensive from one that doesn't. Skipped entirely for users who
 * ask for reduced motion — native scroll is respected there.
 */
export default function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    // Handy for debugging and automated checks; dev builds only.
    if (import.meta.env.DEV) window.__lenis = lenis;

    let frame;
    function raf(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }
    frame = requestAnimationFrame(raf);

    // Route in-page anchors through Lenis so jumps glide.
    function onAnchorClick(e) {
      const anchor = e.target.closest?.('a[href^="#"]');
      if (!anchor) return;

      const id = anchor.getAttribute('href');
      if (!id || id === '#') return;

      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();

      // Measure the fixed header rather than assuming its height — it
      // shrinks once scrolled, and a hardcoded offset parks section
      // headings underneath it at one size or the other.
      const header = document.querySelector('.header');
      const offset = header ? -(header.offsetHeight + 16) : -80;

      lenis.scrollTo(target, { offset });
    }

    document.addEventListener('click', onAnchorClick);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('click', onAnchorClick);
      lenis.destroy();
    };
  }, []);
}
