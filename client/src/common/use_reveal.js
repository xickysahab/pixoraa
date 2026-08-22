import { useEffect, useState } from 'react';
import { STATIC_MOTION } from './motion_env';

/**
 * "Has this scrolled into view yet?" — latching, and safe.
 *
 * Motion's `whileInView` with `once: true` is not safe for content that
 * is invisible until it fires. An anchor jump scrolls fast enough that
 * the IntersectionObserver can miss the section entirely; the one-shot
 * observer is then spent, and the content stays parked at its hidden
 * initial state forever. Scrolling back does not recover it.
 *
 * So an observer is paired with a geometry fallback that cannot miss.
 * That fallback is deliberately shared rather than per-element: one
 * listener, one rAF, one batched pass over everything still pending.
 * A listener per element meant thirty-odd forced layout reads on every
 * scroll tick, which made the whole page feel sticky.
 */

const pending = new Set();
let scheduled = false;
let listening = false;

function flush() {
  scheduled = false;
  const h = window.innerHeight;

  // Read every rect first, then act. Interleaving reads and writes here
  // is what turns one layout pass into dozens.
  const ready = [];
  pending.forEach((entry) => {
    const b = entry.el.getBoundingClientRect();
    if (b.top < h && b.bottom > 0) ready.push(entry);
  });

  ready.forEach((entry) => entry.show());
}

function schedule() {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(flush);
}

function watch(entry) {
  pending.add(entry);
  if (!listening) {
    listening = true;
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
  }
  schedule();
}

function unwatch(entry) {
  pending.delete(entry);
  if (pending.size === 0 && listening) {
    listening = false;
    window.removeEventListener('scroll', schedule);
    window.removeEventListener('resize', schedule);
  }
}

export default function useReveal(ref, { amount = 0.15 } = {}) {
  const [shown, setShown] = useState(STATIC_MOTION);

  useEffect(() => {
    if (STATIC_MOTION) return;

    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true);
      return;
    }

    let done = false;
    let io;
    const entry = { el, show: finish };

    function finish() {
      if (done) return;
      done = true;
      setShown(true);
      io?.disconnect();
      unwatch(entry);
    }

    io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && finish()),
      { threshold: amount }
    );
    io.observe(el);
    watch(entry);

    return () => {
      io?.disconnect();
      unwatch(entry);
    };
  }, [ref, amount]);

  return shown;
}
