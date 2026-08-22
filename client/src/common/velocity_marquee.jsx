import { useRef } from 'react';
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useMotionValue,
  useAnimationFrame,
} from 'motion/react';
import './velocity_marquee.css';

/**
 * A marquee that answers to the scroll wheel: it drifts on its own, but
 * scroll speed adds to its velocity and scroll direction flips its
 * travel. That coupling is what makes a marquee feel physical instead
 * of decorative — the page and the strip share momentum.
 *
 * The offset is wrapped into a single repeat width, so the loop is
 * seamless however far it has travelled.
 */
export default function VelocityMarquee({
  children,
  baseSpeed = 1.4,
  reverse = false,
  className = '',
}) {
  const wrapRef = useRef(null);
  const baseX = useMotionValue(0);

  // Two separate directions, and keeping them separate is the point.
  // `baseDir` is this strip's fixed travel and never changes — it is what
  // makes one row run against the other. `scrollDir` is the shared flip
  // from scrolling backwards. Folding them into a single ref (as this
  // did) let the scroll sign overwrite `reverse` on the first frame, so
  // both rows ended up travelling the same way.
  const baseDir = reverse ? -1 : 1;
  const scrollDir = useRef(1);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  // Scroll adds up to ~1.5x the resting drift. Higher than this and a
  // quick flick throws the wordmarks across the panel unreadably.
  const velocityFactor = useTransform(
    smoothVelocity,
    [-2000, 2000],
    [-1.5, 1.5],
    { clamp: false }
  );

  useAnimationFrame((_t, delta) => {
    const v = velocityFactor.get();

    if (v < 0) scrollDir.current = -1;
    else if (v > 0) scrollDir.current = 1;

    const dir = baseDir * scrollDir.current;
    let move = dir * baseSpeed * (delta / 1000);
    move += dir * move * Math.abs(v);

    // One group is 25% of a four-group track; wrap within that to loop
    // cleanly in either direction.
    const next = baseX.get() + move;
    baseX.set(next <= -25 ? next + 25 : next >= 0 ? next - 25 : next);
  });

  const x = useTransform(baseX, (v) => `${v}%`);

  return (
    <div className={`vmarquee ${className}`} ref={wrapRef} aria-hidden="true">
      <motion.div className="vmarquee__track" style={{ x }}>
        <div className="vmarquee__group">{children}</div>
        <div className="vmarquee__group">{children}</div>
        <div className="vmarquee__group">{children}</div>
        <div className="vmarquee__group">{children}</div>
      </motion.div>
    </div>
  );
}
