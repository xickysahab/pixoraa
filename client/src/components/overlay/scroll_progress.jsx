import { motion, useScroll, useSpring } from 'motion/react';
import './overlay.css';

/** Hairline read-through of page progress, pinned to the top edge. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 34,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="progress"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
