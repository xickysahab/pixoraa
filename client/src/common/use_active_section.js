import { useEffect, useState } from 'react';

/**
 * Which section is the reader currently in?
 *
 * Deliberately geometry-based rather than IntersectionObserver: the
 * "active" section is whichever one covers a line a third of the way
 * down the viewport. With observers, tall and short sections fight over
 * who is intersecting and the highlight flickers between two items.
 * One probe line can only ever be inside one section.
 */
export default function useActiveSection(ids = []) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (!ids.length) return;

    let frame = null;

    function measure() {
      frame = null;
      const probe = window.innerHeight * 0.33;
      let current = null;

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const b = el.getBoundingClientRect();
        if (b.top <= probe && b.bottom > probe) current = id;
      }

      // Past the last section (deep in the footer) the probe can fall
      // through every one — keep the final entry lit rather than
      // dropping the highlight entirely.
      if (!current) {
        const last = document.getElementById(ids[ids.length - 1]);
        if (last && last.getBoundingClientRect().top <= probe) {
          current = ids[ids.length - 1];
        }
      }

      setActive(current);
    }

    function onScroll() {
      if (frame === null) frame = requestAnimationFrame(measure);
    }

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ids]);

  return active;
}
