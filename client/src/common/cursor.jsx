import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import './cursor.css';

/**
 * Two-part cursor: a small solid dot that tracks exactly, and a
 * lagging ring that swells over interactive elements.
 * Never mounts on touch devices or under reduced-motion.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hot, setHot] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 180, damping: 20, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 180, damping: 20, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || still) return;

    setEnabled(true);
    document.body.classList.add('has-cursor');

    const HOT = 'a, button, [data-cursor="hot"], input, textarea';

    function move(e) {
      x.set(e.clientX);
      y.set(e.clientY);
      setHot(Boolean(e.target.closest?.(HOT)));
    }

    window.addEventListener('mousemove', move, { passive: true });
    return () => {
      window.removeEventListener('mousemove', move);
      document.body.classList.remove('has-cursor');
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="cursor__dot"
        style={{ x, y }}
        aria-hidden="true"
      />
      <motion.div
        className={`cursor__ring ${hot ? 'cursor__ring--hot' : ''}`}
        style={{ x: ringX, y: ringY }}
        aria-hidden="true"
      />
    </>
  );
}
