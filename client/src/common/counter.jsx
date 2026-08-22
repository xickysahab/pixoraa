import { useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';
import { STATIC_MOTION } from './motion_env';

/**
 * Counts up to `value` once, when scrolled into view.
 * Eases out so the last few numbers slow — a linear count reads as a
 * loading spinner, an eased one reads as an arrival.
 */
export default function Counter({ value, duration = 1500, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [n, setN] = useState(STATIC_MOTION ? value : 0);

  useEffect(() => {
    if (!inView || STATIC_MOTION) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setN(value);
      return;
    }

    let frame;
    const start = performance.now();

    function tick(now) {
      const t = Math.min((now - start) / duration, 1);
      setN(Math.round((1 - Math.pow(1 - t, 3)) * value));
      if (t < 1) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {n}
    </span>
  );
}
